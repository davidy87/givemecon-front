<template>
  <navbar-header></navbar-header>

  <div id="voucher-list" class="container">
    <div class="pb-5">
      <h1>{{ this.$route.query.brand }} 기프티콘 목록</h1>
    </div>

    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-4" v-for="voucher in vouchers" :key="voucher">
            <button @click="onVoucherClick(voucher.id)" class="card align-items-center mx-auto" style="width: 11rem;">
              <img class="card-img-top p-3" :src="voucher.imageUrl">
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
import * as voucherApi from '@/modules/api/voucher';

export default {
  name: 'VoucherListView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      vouchers : [],
    };
  },

  methods: {
    onLoad() {
      voucherApi
        .findAllByBrandName(this.$route.query.brand)
        .then(response => {
          console.log(response);
          this.vouchers = response.data;
        });
    },

    onVoucherClick(id) {
      this.$router.push('/vouchers/' + id);
    }
  },

  created() {
    this.onLoad();
  }
}

</script>

<style>
#voucher-list {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>