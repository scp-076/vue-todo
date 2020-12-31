<template>
  <nav class="purple darken-2">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Tasks</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/create" exact active-class="active">Create</router-link>
        <router-link tag="li" to="/" active-class="active">List</router-link>
      </ul>
    </div>
  </nav>
</template>

<script>

</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-flow: row nowrap;
}

nav {
  padding: 0 2rem;
}
</style>