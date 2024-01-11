<template>
  <div id="admin-login" class="container">
    <div class="form-signin">
      <h1 class="h3 mb-3 fw-normal">관리자 로그인</h1>
      <div class="form-floating mb-3">
        <input v-model="loginRequest.username" class="form-control" placeholder="name@example.com">
        <label for="floatingInput">아이디</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="loginRequest.password" type="password" class="form-control" placeholder="Password">
        <label for="floatingPassword">비밀번호</label>
      </div>
      <div class="container pb-3">
        <router-link to="/admin/signup">회원가입</router-link>
      </div>
      <button @click="onLoginClick" class="w-100 btn btn-lg btn-primary" type="submit">로그인</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminLoginView',

  data() {
    return {
      loginRequest : {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    onLoginClick() {
      axios
        .post('/api/members/admin/login', this.loginRequest)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('grantType', response.data.grantType);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('role', response.data.role);
          this.$router.replace('/admin');
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.data.error.code === '001') {
            alert('아이디 혹은 비밀번호가 올바르지 않습니다.');
          }
        })
    }
  }
}
</script>

<style>
#admin-login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding-top: 20%;
  padding-bottom: auto;
  margin: auto;
}

.form-signin {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  border-bottom-right-radius: 1;
  border-bottom-left-radius: 1;
}

.form-signin input[type="password"] {
  border-top-left-radius: 1;
  border-top-right-radius: 1;
}
</style>