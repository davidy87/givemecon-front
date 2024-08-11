<template>
  <div id="admin-login" class="container">
    <div class="form-signin">
      <h1 class="h3 mb-3 fw-normal">관리자 로그인</h1>
      <div class="form-floating mb-3">
        <input v-model="loginRequest.email" type="email" class="form-control" placeholder="name@example.com">
        <label for="floatingInput">이메일</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="loginRequest.password" type="password" class="form-control" placeholder="Password">
        <label for="floatingPassword">비밀번호</label>
      </div>
      <button @click="onLoginClick" class="w-100 btn btn-lg btn-primary" type="submit">로그인</button>
    </div>
  </div>
</template>

<script>
import * as adminMemberApi from '@/api/modules/admin/member';

export default {
  name: 'AdminLoginView',

  data() {
    return {
      loginRequest : {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    onLoginClick() {
      adminMemberApi.adminLogin(this.$router, this.loginRequest);
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