<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{ task.title }}</h1>

      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>
        <input type="text" ref="datepicker" style="margin-bottom: 3rem;">
        <div v-if="task.status !== 'completed'">
          <button class="btn" type="submit">Update task</button>
          <button class="btn blue" type="button" @click="completeTask">Complete task</button>
          <button class="btn red" type="button" @click="deleteTask">Delete task</button>
        </div>
        <button v-else class="btn red" @click="deleteTask">Delete task</button>
      </form>
    </div>
    <h1 v-else>This task does not exist</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'create',
  data: () => ({
    description: '',
    chips: null,
    date: null,
  }),
  mounted() {
    this.description = this.task.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'task tags',
      data: this.task.tags,
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  computed: {
    task() {
      return this.$store.getters.getTask(+this.$route.params.id);
    },
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
      });
      this.$router.push('/');
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id);
      this.$router.push('/');
    },
    deleteTask() {
      this.$store.dispatch('deleteTask', this.task.id);
      this.$router.push('/');
    },
    destroyed() {
      if (this.date && this.date.destroy) {
        this.date.destroy();
      }
      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin-right: 20px;
}

.materialize-textarea {
  height: auto;
  min-height: 150px;
}
</style>