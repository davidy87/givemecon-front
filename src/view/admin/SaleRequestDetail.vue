<template>
  <div id="sale-request-detail">
    <div class="d-flex justify-content-center">
      <div class="card" style="width: auto; height: auto;">
        <div class="container py-3">
          <img :src="voucherImageUrl" class="card-img-top p-3" style="width: 500px; height: 500px;" />
        </div>
        <div class="card-body">
          <ul id="details-list-group" class="list-group">
            <span class="d-flex">상품명</span>
            <input v-model="requestedSale.title" class="list-group-item d-flex" disabled>
            <br>
            <span class="d-flex">가격</span>
            <input v-model="requestedSale.price" class="list-group-item d-flex" disabled>
            <br>
            <span class="d-flex">유효기간</span>
            <input v-model="requestedSale.expDate" class="list-group-item d-flex" disabled>
            <br>
            <span class="d-flex">바코드</span>
            <input v-model="requestedSale.barcode"  class="list-group-item d-flex" disabled>
          </ul>
        </div>
      </div>
    </div>

    <div class="container p-5">
      <div class="row row-cols-auto justify-content-center">
        <div class="col">
          <button @click="reject" class="btn btn-outline-danger">판매 거절</button>
        </div>
        <div class="col">
          <button @click="permit" class="btn btn-primary">판매 허가</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as voucherApi from '@/api/modules/voucher';

export default {
  name: 'SaleRequestDetail',

  data() {
    return {
      voucherImageUrl: '',
      requestedSale: this.$store.getters['requestedSaleStore/getRequestedSale'],
      Status: voucherApi.VoucherForSaleStatus
    }
  },

  created() {
    voucherApi
      .findVoucherImage(this.$router, this.requestedSale.id)
      .then(
        (result) => {
          this.voucherImageUrl = result;
        }
      );
  },

  methods: {
    reject() {
      if (confirm('이 기프티콘 판매를 거절하시겠습니까?')) {
        const rejectedReason = prompt('거절 사유');

        if (!rejectedReason) {
          return;
        }

        if (confirm('거절 사유: ' + rejectedReason + '\n' + '위와 같은 사유로 판매 요청을 거절하시겠습니까?')) {
          voucherApi.updateStatus(this.$router, this.requestedSale.id, this.Status.REJECTED);
        }
      }
    },

    permit() {
      if (confirm('이 기프티콘 판매를 허가하시겠습니까?')) {
        voucherApi.updateStatus(this.$router, this.requestedSale.id, this.Status.FOR_SALE);
      }
    }
  }
}
</script>

<style>
#sale-request-detail {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>@/api/voucher-for-sale