<template>
  <navbar-header></navbar-header>

  <div id="purchase" class="container">
    <div class="pb-5">
      <h1>결제하기</h1>
    </div>

    <div class="container px-5">
      <ul id="purchase-list-group" class="list-group" v-for="voucher in purchaseList" :key="voucher">
        <li id="purchase-list-group-item" class="list-group-item border-dark">
          <div class="d-flex justify-content-between align-items-start py-2">
            <div class="ms-2 me-auto">
              {{ voucher.expDate }} 까지
            </div>
            <button @click="onDeleteClick(voucher)" class="btn btn-lg bi bi-trash"></button>
          </div>
          <div class="d-flex align-items-center py-2">
            <div class="ms-2 me-auto">

            </div>
            <span>{{ format(voucher.price) }}원</span>
          </div>
        </li>
        <br>
      </ul>

      <hr>

      <div class="pb-5 d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div>총 수량 <span class="text-danger">{{ totalQuantity }}개</span></div>
        </div>
        <span class="fw-semibold">총 금액 <span class="text-danger">{{ format(totalPrice) }}원</span></span>
      </div>
    </div>

    <div class="container pt-5">
      <button @click="onPayClick" class="btn btn-lg btn-primary">결제하기</button>
    </div>
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import * as purchasedVoucherApi from '@/api/modules/purchased-voucher';

export default {
  name: 'PurchaseView',

  components: {
    NavbarHeader
  },

  data() {
    return {
      prevRoute: null,
      purchaseList: this.$store.getters['purchaseListStore/getPurchaseList'],
      totalQuantity: this.$store.getters['purchaseListStore/getTotalQuantity'],
      totalPrice: this.$store.getters['purchaseListStore/getTotalPrice'],
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    });
  },

  created() {
    console.log(this.purchaseList);
  },

  methods: {
    format(price) {
      return Intl.NumberFormat('en-US').format(price);
    },

    onDeleteClick(voucher) {
      if (confirm('해당 제품을 제거하시겠습니까?')) {
        this.$store.commit('purchaseListStore/removePurchase', voucher);
        this.updateTotal();

        if (this.totalQuantity === 0) {
          this.sleep(100).then(() => {
            alert('구매할 기프티콘이 없습니다. 선택화면으로 돌아갑니다.');
            this.$router.replace(this.prevRoute);
          });
        }
      }
    },

    updateTotal() {
      this.totalQuantity = this.$store.getters['purchaseListStore/getTotalQuantity'];
      this.totalPrice = this.$store.getters['purchaseListStore/getTotalPrice'];
    },

    onPayClick() {
      this.purchaseList = this.$store.getters['purchaseListStore/getPurchaseList'],
      console.log(Array.from(this.purchaseList.keys()));

      // TODO: 결제 방법 추가 필요
      if (confirm('결제하시겠습니까?')) {
        purchasedVoucherApi.save(this.purchaseList, this.$router);
      }
    },

    sleep(ms) {
      return new Promise((r) => setTimeout(r, ms));
    }
  }
}
</script>

<style>
#purchase {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}

#purchase-list-group #purchase-list-group-item {
  border-radius: 0.25rem;
}
</style>@/api/purchased-voucher