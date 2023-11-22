<template>
  <nav class="navbar navbar-dark bg-dark" aria-label="First navbar example">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">기브미콘 로고</a>
      <div class="d-flex align-items-center">
        <button v-if="!username" class="btn btn-primary" @click="onLoginClick">
          <span>로그인</span>
        </button>
        <button v-else class="btn btn-primary">
          <span>{{ username }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'NavbarHeader',
  data() {
    return {
      username: localStorage.getItem('username')
    }
  }
}

</script>

<style>
</style>