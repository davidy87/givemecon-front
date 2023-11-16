<template>
  <div id="voucher">
    <h1>This is Voucher List View</h1>
    <div class="d-flex align-items-center justify-content-center">
      <div class="row">
        <div class="col-2 p-4" v-for="voucher in vouchers" :key="voucher">
          <button class="card" style="width: 8rem;">
            <img class="card-img-top" src="../assets/logo.png">
            <div class="card-body">
              <p class="card-text">{{ voucher.title }}</p>
              <p class="card-text">{{ voucher.price }} 원</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'VoucherListView',
  data() {
    return {
      vouchers : [],
    };
  }, 
  methods: {
    onLoad() {
      axios
        .get("/vouchers" + "?brandId=" + this.$route.query.brandId)
        .then((result) => {
          console.log(result);
          this.vouchers = result.data;
        });
    },
  },
  created() {
    this.onLoad();
  }
}

</script>

<style>
#voucher {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>