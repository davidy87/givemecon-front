<template>
  <div v-if="paymentResult.orderId">
    <navbar-header></navbar-header>

    <div id="purchase-success" class="container">
      <div class="container pb-5">
        <h1>결제 성공</h1>
      </div>

      <div class="container">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th class="w-25" scope="row">주문번호</th>
              <td class="w-50">{{ paymentResult.orderId }}</td>
            </tr>
            <tr>
              <th scope="row">상품명</th>
              <td>{{ paymentResult.orderName }}</td>
            </tr>
            <tr>
              <th scope="row">주문금액</th>
              <td>{{ formatPrice(paymentResult.amount) }} 원</td>
            </tr>
            <tr>
              <th scope="row">영수증</th>
              <td><a :href="paymentResult.receiptUrl">영수증 확인하기</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import * as paymentApi from '@/api/modules/payment';

export default {
  name: 'PaymentSuccessView',

  components: {
    NavbarHeader
  },

  data() {
    return {
      paymentResult: {
        orderId: "",
        orderName: "",
        amount: 0,
        receiptUrl: "",
      },
    }
  },

  created() {
    paymentApi.findPaymentHistory(this.$router, this.$route.query.paymentKey, this.paymentResult);
  },

  methods: {
    formatPrice(price) {
      return Intl.NumberFormat('en-US').format(price);
    }
  }
}
</script>

<style>
#purchase-success {
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
  #purchase-success {
    width: 750px;
  }
}

@media (min-width: 992px) {
  #purchase-success {
    width: 940px;
  }
}
</style>