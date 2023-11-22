<template>
  <div id="login">

    <div class="container py-5">
      <h1>로그인</h1>
    </div>

    <div class="container px-5 py-5">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">
            <div class="row justify-content-center">
              <div class="col-12 col-lg-5 d-flex align-items-center">
                <div class="d-flex gap-3 flex-column w-100">
                  <a href="http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:8081" class="btn btn-lg btn-primary" role=button>
                    <span class="ms-2 fs-6">Google로 로그인</span>
                  </a>
                  <a href="http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:8081" class="btn btn-lg btn-success" role=button>
                    <span class="ms-2 fs-6">Naver로 로그인</span>
                  </a>
                  <a href="/oauth2/authorization/kakao" class="btn btn-lg btn-warning" role=button>
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

export default {
  name: 'LoginVue',
  methods: {
    onLoad() {
      const params = this.$route.query;

      if (params.grantType !== undefined) {
        localStorage.setItem('grantType', params.grantType);
        localStorage.setItem('accessToken', params.accessToken);
        localStorage.setItem('refreshToken', params.refreshToken);
        localStorage.setItem('username', params.username);
        this.$router.push('/');
      }
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