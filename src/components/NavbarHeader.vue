<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img alt="Vue logo" src="../assets/logo.png" style="height:25px;" />
      </router-link>

      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">홈</router-link>
        </li>
      </ul>

      <div class="d-flex align-items-center">
        <div v-if="!username">
          <router-link to="/login" class="btn btn-primary">
            로그인
          </router-link>
        </div>
        <div v-else class="dropdown">
          <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            {{ username }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <router-link to="/liked-vouchers" class="dropdown-item">찜 리스트</router-link>
            </li>
            <li>
              <router-link to="/my-vouchers" class="dropdown-item">내콘함</router-link>
            </li>
            <li>
              <!-- <form action="http://localhost:8080/logout" method="post"> -->
              <button @click="onLogoutClick" class="dropdown-item">로그아웃</button>
              <!-- </form> -->
            </li>
          </ul>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NavbarHeader',
  data() {
    return {
      username: localStorage.getItem('username')
    }
  },
  methods: {
    onLogoutClick() {
      axios
        .post('/logout')
        .then(() => {
          localStorage.clear();
          location.href = '/';
        });
    }
  },
}
</script>

<style>
nav .navbar-nav a.router-link-exact-active {
  color: #42b983 !important;
}

nav .navbar-nav a.nav-link {
  font-weight: bold;
}
</style>