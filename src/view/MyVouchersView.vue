<template>
  <navbar-header></navbar-header>
  <div id="purchased-vouchers">
    <div class="pb-5">
      <h1>내 기프티콘</h1>
    </div>

    <div class="container">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-4" v-for="voucher in purchasedVouchers" :key="voucher">
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
import NavbarHeader from '@/components/NavbarHeader.vue';
import axios from 'axios';

export default {
  name: 'MyVouchersView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      },

      purchasedVouchers : {}
    }
  },

  methods: {
    onLoad() {
      axios
        .get('/api/purchased-vouchers', { headers : this.headers })
        .then((response) => {
          this.purchasedVouchers = response.data;
        });
    }
  }
}
</script>

<style>
#purchased-vouchers {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>