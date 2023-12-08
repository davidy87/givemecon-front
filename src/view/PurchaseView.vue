<template>
  <navbar-header></navbar-header>

  <div id="purchase">
    <div class="pb-5">
      <h1>결제하기</h1>
    </div>

    <div class="container px-5">
      <ul id="purchase-list-group" class="list-group" v-for="[voucher, count] in toPurchaseList" :key="voucher">
        <li id="purchase-list-group-item" class="list-group-item border-dark">
          <div class="d-flex justify-content-between align-items-start py-2">
            <div class="ms-2 me-auto">
              {{ voucher.expDate }} 까지
            </div>
            <button @click="onDeleteClick(voucher)" class="btn btn-sm btn-close"></button>
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
    const remove = (voucher) => store.commit('remove', voucher);

    return { toPurchaseList, totalCount, totalPrice, remove };
  },

  methods: {
    format(price) {
      return Intl.NumberFormat('en-US').format(price);
    },

    onDeleteClick(voucher) {
      if (confirm('해당 제품을 제거하시겠습니까?')) {
        this.remove(voucher);

        if (this.totalCount === 0) {
          this.sleep(100).then(() => {
            alert('구매할 기프티콘이 없습니다. 선택화면으로 돌아갑니다.');
            this.$router.go(-1);
          });
        }
      }
    },

    onPayClick() {
      // TODO: 결제 방법 추가 필요
      if (confirm('결제하시겠습니까?')) {
        alert('결제가 완료되었습니다.\n구매하신 기프티콘은 내콘함에서 확인하실 수 있습니다.');
        this.$router.replace('/');
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
</style>