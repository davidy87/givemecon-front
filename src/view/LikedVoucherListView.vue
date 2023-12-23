<template>
  <navbar-header></navbar-header>

  <div id="liked-vouchers">
    <div class="pb-5">
      <h1>찜 리스트</h1>
    </div>

    <div v-if="this.deleted !== ''" class="container px-5">
      <div class="alert alert-success">
        {{ this.deleted }}가 찜 목록에서 제거되었습니다.
      </div>
    </div>

    <div class="container">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-4" v-for="[voucherId, voucher] in likedVouchers" :key="voucherId">
              <div class="container d-flex align-items-end justify-content-end">
                <button @click="onDeleteClick(voucherId)" class="btn-close" aria-label="Delete"></button>
              </div>
              <button @click="onVoucherClick(voucherId)" class="card align-items-center mx-auto" style="width: 8rem;">
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

      likedVouchers : new Map(),
      deleted : '',
    }
  },

  methods: {
    onLoad() {
      axios
        .get('/api/liked-vouchers', { headers: this.headers })
        .then((response) => {
          response.data.forEach((likedVoucher) => {
            this.likedVouchers.set(likedVoucher.id, likedVoucher)
          });
        })
        .catch((error) => {
          console.log(error);
          requestNewAccessToken(this.$router);
        });
    },

    onDeleteClick(voucherId) {
      axios
        .delete('/api/liked-vouchers/' + voucherId, { headers: this.headers })
        .then(() => {
          this.deleted = this.likedVouchers.get(voucherId).title;
          this.likedVouchers.delete(voucherId);
          
          this.sleep(5000).then(() => {
            this.deleted = '';
          });
        });
    },

    onVoucherClick(id) {
      this.$router.push('/vouchers/' + id);
    },

    sleep(ms) {
      return new Promise((r) => setTimeout(r, ms));
    },
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