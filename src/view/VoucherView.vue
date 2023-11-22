<template>
  <div id="voucher">
    <div class="container">
      <img src="../assets/logo.png" alt="">
    </div>

    <div class="container">
      <div class="container py-5">
        <h2 class="text-start">{{ voucher.title }}</h2>
      </div>

      <div class="container">
        <h4 class="text-start">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</h4>
      </div>

      <div class="container py-4">
        <ul class="nav nav-tabs">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description-tab-pane" type="button" role="tab" aria-controls="description-tab-pane" aria-selected="true">
              <b>상품설명</b>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="caution-tab" data-bs-toggle="tab" data-bs-target="#caution-tab-pane" type="button" role="tab" aria-controls="caution-tab-pane" aria-selected="false">
              <b>유의사항</b>
            </button>
          </li>
        </ul>
        <div class="tab-content text-start py-5">
          <div class="tab-pane fade show active" id="description-tab-pane" role="tabpanel" aria-labelledby="description-tab" tabindex="0">
            <h4>상품설명</h4>
          </div>
          <div class="tab-pane fade" id="caution-tab-pane" role="tabpanel" aria-labelledby="caution-tab" tabindex="0">
            <h4>유의사항</h4>
          </div>
        </div>
      </div>

      <div class="container" id="purchase-btn">
        <div class="row">
          <div class="col-2 d-grid">
            <button class="btn btn-lg btn-outline-danger">찜하기</button>
          </div>
          <div class="col d-grid">
            <button class="btn btn-lg btn-primary">구매하기</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VoucherView',
  data() {
    return {
      voucher: {}
    }
  },
  methods: {
    onLoad() {
      axios
        .get("/api/vouchers/" + this.$route.params.id)
        .then((result) => {
          this.voucher = result.data
        })
    }
  },
  created() {
    this.onLoad();
  }
}

</script>

<style>
html {
  overflow-y: auto;
}

#voucher {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#purchase-btn {
  margin-top: 50vh;
  margin-bottom: 10vh;
}
</style>