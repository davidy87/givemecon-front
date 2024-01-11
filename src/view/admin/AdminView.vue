<template>
  <div id="admin">
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div class="d-flex flex-column sticky-top px-3 pt-2 text-white min-vh-100">
            <a href="/admin" class="d-flex align-items-center p-2 text-white text-decoration-none">
              <span class="fs-5">기브미콘 관리자 페이지</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li>
                <a @click="onAdminHomeClick" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">홈</span>
                </a>
              </li>
              <li>
                <a @click="onCategoryEditClick" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">카테고리 관리</span>
                </a>
              </li>
              <li>
                <a @click="onBrandEditClick" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">브랜드 관리</span>
                </a>
              </li>
            </ul>
            <hr>
            <div v-if="accessToken" class="dropdown pb-4">
              <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="../../assets/logo.png" width="30" height="30" class="rounded-circle">
                <span class="d-none d-sm-inline mx-1">Admin</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a @click="onLogoutClick" class="dropdown-item">로그아웃</a>
                </li>
              </ul>
            </div>
            <div v-else class="container pb-4">
              <div class="d-flex align-items-center text-white text-decoration-none">
                <img src="../../assets/logo.png" width="30" height="30" class="rounded-circle">
                <span class="d-none d-sm-inline mx-1">로그인해주세요.</span>
              </div>
            </div>

          </div>
        </div>
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'AdminView',

  data() {
    return {
      accessToken : localStorage.getItem('accessToken')
    }
  },

  methods: {
    onAdminHomeClick() {
      this.$router.push('/admin');
    },

    onCategoryEditClick() {
      this.$router.push('/admin/categories');
    },
    
    onBrandEditClick() {
      this.$router.push('/admin/brands');
    },

    onLogoutClick() {
      localStorage.clear();
      this.$router.replace("/admin/login");
    }
  }
}
</script>

<style>
#admin {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#sidebar {
  position: sticky;
  top: 0
}
</style>