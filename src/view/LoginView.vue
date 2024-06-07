<template>
  <navbar-header :key="componentKey"></navbar-header>

  <div id="login" class="container">
    <div class="container py-5">
      <h1>로그인</h1>
    </div>

    <div class="container px-5 py-5">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="row justify-content-center">
              <div class="col-12 d-flex align-items-center">
                <div class="d-flex gap-3 flex-column w-100">
                  <a @click="onLoginClick('google')" class="btn btn-lg btn-primary" role=button>
                    <span class="ms-2 fs-6">Google로 로그인</span>
                  </a>
                  <a @click="onLoginClick('naver')" class="btn btn-lg btn-success" role=button>
                    <span class="ms-2 fs-6">Naver로 로그인</span>
                  </a>
                  <a @click="onLoginClick('kakao')" class="btn btn-lg btn-warning" role=button>
                    <span class="ms-2 fs-6">Kakao로 로그인</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import axios, { HttpStatusCode } from 'axios';

export default {
  name: 'LoginVue',
  components: {
    NavbarHeader
  },

  data() {
    return {
      componentKey: 0
    }
  },
  
  methods: {
    onLoad() {
      const params = this.$route.query;

      if (Object.hasOwn(params, 'success') && Object.hasOwn(params, 'authorizationCode')) {
        this.onLoginSuccess(params.authorizationCode);
      } else if (Object.hasOwn(params, 'error')) {
        this.onLoginFailure(params.errorDescription);
      }
    },

    onLoginSuccess(authorizationCode) {
      axios
        .get("/api/auth/success", {params: {authorizationCode}})
        .then(
          (response) => {
            console.log(response);
            Object.entries(response.data).forEach(([key, value]) => {
              localStorage.setItem(key, value);
            });
            this.componentKey += 1;
            this.$router.push('/');
          },
          (error) => {
            console.log(error);
            if (error.response.status === HttpStatusCode.Unauthorized) {
              this.$router.replace('/login?error');
              this.onLoad();
            }
          }
        )
    },

    onLoginFailure(errorDescription) {
      switch (errorDescription) {
        case 'duplicate-email':
          alert('이미 해당 이메일로 가입된 계정이 존재합니다. 다른 방법으로 시도해주세요.');
          break;
        default:
          alert('로그인 시도 중 문제가 생겼습니다. 다시 시도해주세요.');
      }

      this.$router.replace('/login');
    },

    onLoginClick(provider) {
      location.href = 'http://localhost:8080/oauth2/authorization/' + provider;
    }
  },
  
  mounted() {
    this.onLoad();
  }
}

</script>

<style>
#login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>