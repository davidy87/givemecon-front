<template>
  <navbar-header></navbar-header>

  <div id="purchase">
    <div class="pb-5">
      <h1>결제하기</h1>
    </div>

    <div class="container w-50">
      <ul id="purchase-list-group" class="list-group" v-for="[voucher, count] in toPurchaseList" :key="voucher">
        <li id="purchase-list-group-item" class="list-group-item border-dark">
          <div class="d-flex justify-content-between align-items-start py-2">
            <div class="ms-2 me-auto">
              {{ voucher.expDate }} 까지
            </div>
            <button class="btn btn-sm btn-close"></button>
          </div>
          <div class="d-flex align-items-center py-2">
            <div class="ms-2 me-auto">
              <div class="input-group">
                <span class="form-control border-dark">{{ count }}장</span>
              </div>
            </div>
            <span>{{ format(voucher.price * count) }}원</span>
          </div>
        </li>
        <br>
      </ul>

      <hr>

      <div class="pb-5 d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div>총 수량 <span class="text-danger">{{ totalCount }}개</span></div>
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
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: 'PurchaseView',
  components: {
    NavbarHeader
  },

  setup() {
    const store = useStore();
    const toPurchaseList = computed(() => store.state.toPurchaseList);
    const totalCount = computed(() => store.state.totalCount);
    const totalPrice = computed(() => store.state.totalPrice);

    return { toPurchaseList, totalCount, totalPrice };
  },

  methods: {
    format(price) {
      return Intl.NumberFormat('en-US').format(price);
    },

    onPayClick() {
      // TODO: 결제 방법 추가 필요
      alert('결제가 완료되었습니다.\n구매하신 기프티콘은 내콘함에서 확인하실 수 있습니다.');
      this.$router.replace('/');
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
</style>