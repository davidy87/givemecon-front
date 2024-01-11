<template>
  <div id="admin-signup" class="container">
    <div class="form-signin">
      <h1 class="h3 mb-3 fw-normal">관리자 회원가입</h1>
      <div class="form-floating mb-3">
        <input v-model="signupRequest.email" type="email" class="form-control" placeholder="name@example.com">
        <label for="floatingInput">이메일</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="signupRequest.username" type="username" class="form-control" placeholder="name@example.com">
        <label for="floatingInput">아이디</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="signupRequest.password" type="password" class="form-control" placeholder="Password">
        <label for="floatingPassword">비밀번호</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="signupRequest.passwordConfirm" type="password" class="form-control" placeholder="Password">
        <label for="floatingPassword">비밀번호 확인</label>
      </div>
      <div class="container pb-3">
        <router-link to="/admin/login">로그인</router-link>
      </div>
      <button @click="onSignupClick" class="w-100 btn btn-lg btn-primary" type="submit">회원가입</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminSignupView',

  data() {
    return {
      signupRequest : {
        email : '',
        username : '',
        password : '',
        passwordConfirm : ''
      }
    }
  },

  methods: {
    onSignupClick() {
      axios
        .post('/api/members/admin/signup', this.signupRequest)
        .then((response) => {
          console.log(response.data);
          alert('회원가입이 완료되었습니다.');
          this.$router.replace('/admin/login');
        });
    }
  }

}

</script>

<style>
</style>