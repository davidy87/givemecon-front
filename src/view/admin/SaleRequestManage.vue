<template>
  <div id="sale-request-manage">
    <div class="pb-5">
      <h1>판매 요청 관리</h1>
    </div>

    <div class="container">
      <table class="table table-secondary table-striped">
      <thead class="table-">
      <tr>
        <th>No</th>
        <th>상품명</th>
        <th>상태</th>
        <th>요청일자</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(requestedSale, idx) in saleRequests" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td><a @click="onTitleClick(idx)" class="link-primary">{{ requestedSale.title }}</a></td>
          <td>{{ requestedSale.status }}</td>
          <td>{{ requestedSale.saleRequestedDate }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import * as voucherApi from '@/api/modules/voucher';

export default {
  name: 'SaleRequestManage',

  data() {
    return {
      saleRequests: [],
      Status: voucherApi.VoucherForSaleStatus
    }
  },

  methods: {
    onLoad() {
      voucherApi.findAllByStatus(this.Status.SALE_REQUESTED, this.saleRequests, this.$router);
    },

    onTitleClick(idx) {
      this.$store.commit('requestedSaleStore/setRequestedSale', this.saleRequests[idx]);
      this.$router.push(`/admin/sale-requests/${idx + 1}`);
    },
  },

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
#sale-request-manage {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>@/api/voucher-for-sale