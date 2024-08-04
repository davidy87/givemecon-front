<template>
  <navbar-header></navbar-header>

  <div id="my-info">
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div class="d-flex flex-column sticky-top px-3 pt-2 text-white min-vh-100">
            <ul class="nav nav-pills flex-column align-items-start p-4" id="menu">
              <li>
                <a @click="myInfo" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-person-circle"></i> <span class="ms-1 d-none d-sm-inline">내 정보</span>
                </a>
              </li>
              <li>
                <a @click="myLikedVouchers" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-heart-fill"></i> <span class="ms-1 d-none d-sm-inline">찜 리스트</span>
                </a>
              </li>
              <li>
                <a @click="myPurchasedVouchers" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-receipt"></i> <span class="ms-1 d-none d-sm-inline">내 기프티콘</span>
                </a>
              </li>
              <li>
                <a @click="mySales" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">판매 목록</span>
                </a>
              </li>
            </ul>
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
import NavbarHeader from '@/components/NavbarHeader.vue';

export default {
  name: 'MyInfoView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      accessToken : localStorage.getItem('accessToken'),
      adminName : localStorage.getItem('username'),
    }
  },

  methods: {
    myInfo() {
      this.$router.push('/my-info');
    },

    myLikedVouchers() {
      this.$router.push('/liked-vouchers');
    },

    myPurchasedVouchers() {
      this.$router.push('/my-vouchers');
    },

    mySales() {
      this.$router.push('/my-sales');
    },
  }
}
</script>

<style>
#my-info {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#sidebar {
  position: sticky;
  top: 0;
}
</style>