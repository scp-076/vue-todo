<template>
  <div>
    <h1>List</h1>
    <div class="row">
      <div class="input-field col s6">
        <select ref="select" v-model="filter">
          <option value="" disabled selected>Choose tasks status</option>
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
        <label>Status filter</label>
      </div>
      <button v-if="filter" class="btn btn-small red" @click="filter = null">Clear filter</button>
    </div>
    <hr>

    <table v-if="tasks.length">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Date</th>
        <th>Description</th>
        <th>Status</th>
        <th>Open</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, i) of displayTasks" :key="task.id">
        <td>{{ i + 1 }}</td>
        <td>{{ task.title }}</td>
        <td>{{ new Date(task.date).toLocaleDateString() }}</td>
        <td>
          <div class="text-white-space">{{ task.description }}</div>
        </td>
        <td :class="task.status === 'active' ? 'text-green' : task.status === 'outdated' ? 'text-red' : 'text-grey'"
        >{{ task.status }}</td>
        <td>
          <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id" style="margin-right: 1rem;">Open
          </router-link>
          <button class="btn btn-small red" @click="() => deleteTask(task.id)">Delete task</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: null,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter(t => this.filter ? t.status === this.filter : true);
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
  methods: {
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id);
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.text-white-space {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

td {
  max-width: 400px;
}

.row {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}

.row .col.s6 {
  margin-left: 0;
}

.text-green {
  color: green;
  text-shadow: 2px 3px 5px green;
}

.text-red {
  color: red;
  text-shadow: 2px 3px 5px red;
}

.text-grey {
  color: grey;
  text-shadow: 2px 3px 5px grey;
}
</style>