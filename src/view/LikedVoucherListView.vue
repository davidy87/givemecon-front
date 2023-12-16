<template>
  <navbar-header></navbar-header>

  <div id="liked-vouchers">
    <div class="pb-5">
      <h1>찜 리스트</h1>
    </div>

    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-4" v-for="voucher in likedVouchers" :key="voucher">
            <button @click="onVoucherClick(voucher.id)" class="card align-items-center mx-auto" style="width: 8rem;">
              <img class="card-img-top" src="../assets/logo.png">
              <div class="card-body">
                <p class="card-text">{{ voucher.title }}</p>
                <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import NavbarHeader from '@/components/NavbarHeader.vue';
import { requestNewAccessToken } from '@/modules/utilities.js'

export default {
  name: 'LikedVoucherListView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      },

      likedVouchers : []
    }
  },

  methods: {
    onLoad() {
      axios
        .get('/api/liked-vouchers', { headers: this.headers })
        .then((response) => {
          this.likedVouchers = response.data;
        })
        .catch((error) => {
          console.log(error);
          requestNewAccessToken(this.$router);
        });
    },

    onVoucherClick(id) {
      this.$router.push('/vouchers/' + id);
    }
  },

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
#liked-vouchers {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>