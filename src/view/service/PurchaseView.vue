<template>
  <navbar-header></navbar-header>

  <div id="purchase" class="container">
    <div class="container pb-5">
      <h1>결제하기</h1>
    </div>

    <div class="container">
      <ul id="purchase-list-group" class="list-group" v-for="voucher in orderSummary.orderItems" :key="voucher">
        <li id="purchase-list-group-item" class="list-group-item border-dark">
          <div class="d-flex py-2">
            <div class="me-4">
              <img :src="voucher.voucherImageUrl" alt="" style="width: 8rem;">
            </div>
            <div class="d-flex align-items-start justify-content-center flex-column me-auto">
              <div class="p-2">{{ voucher.brandName }}</div>
              <div class="p-2">{{ voucher.title }}</div>
              <div class="p-2">
                <span class="fw-semibold">{{ voucher.expDate }} 까지</span>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-center">
              <span class="fw-semibold">{{ format(voucher.price) }}원</span>
            </div>
          </div>
        </li>
        <br>
      </ul>

      <hr>

      <div class="pb-5 d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div>총 수량 <span class="text-danger">{{ orderSummary.quantity }}개</span></div>
        </div>
        <span class="fw-semibold">총 금액 <span class="text-danger">{{ format(orderSummary.totalPrice) }}원</span></span>
      </div>
    </div>

    <div class="container pt-5">
      <div class="row row-cols-auto justify-content-center">
        <div class="col">
          <button class="btn btn-lg btn-outline-danger" @click="onCancelClick()">취소하기</button>
        </div>
        <div class="col">
          <button @click="onCheckOutClick" class="btn btn-lg btn-primary">결제하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import * as orderApi from '@/api/modules/order';
import * as paymentApi from '@/api/modules/payment';

export default {
  name: 'PurchaseView',

  components: {
    NavbarHeader
  },

  data() {
    return {
      orderNumber: 0,
      orderSummary: {
        quantity: 0,
        totalPrice: 0,
        orderItems: []
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    const answer = confirm('이전으로 돌아가시겠습니까?\n진행 중인 주문은 취소됩니다.');
    if (answer) {
      orderApi.cancelOrder(this.$router, this.orderNumber);
      next();
    } else {
      next(false);
    }
  },

  created() {
    this.orderNumber = this.$route.query.orderNumber;
    orderApi.findOrder(this.$router, this.orderNumber, this.orderSummary);
  },

  methods: {
    format(price) {
      return Intl.NumberFormat('en-US').format(price);
    },

    onCheckOutClick() {
      // TODO: 결제 방법 추가 필요
      if (confirm('결제하시겠습니까?')) {
        paymentApi.requestTossPayment(this.getPaymentInfo());
      }
    },

    onCancelClick() {
      const prevRoute = this.$store.getters['voucherRouteStore/getVoucherRoute'];
      this.$router.replace(prevRoute);
    },

    getPaymentInfo() {
      const orderItems = this.orderSummary.orderItems;
      let orderName = orderItems[0].title;

      if (orderItems.length > 1) {
        orderName += ` 외 ${orderItems.length - 1}건`;
      }

      const paymentInfo = {
        amount: this.orderSummary.totalPrice,
        orderId: this.orderNumber,
        orderName: orderName,
        customerName: localStorage.getItem('username'),
        successUrl: `${location.origin}/payment/success`,
        failUrl: `${location.origin}${this.$route.fullPath}`,
      };

      return paymentInfo;
    },
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

@media (min-width: 768px) {
  #purchase {
    width: 750px;
  }
}

@media (min-width: 992px) {
  #purchase {
    width: 940px;
  }
}
</style>@/api/purchased-voucher