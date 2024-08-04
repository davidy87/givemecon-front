<template>
  <div id="payment-processing" class="container">
    <h1> 결제 진행 중...</h1>
  </div>
</template>

<script>
import * as paymentApi from '@/api/modules/payment';

export default {
  name: 'PaymentProcessingView',

  created() {
    const paymentSuccessInfo = {
      paymentKey: this.$route.query.paymentKey,
      orderId: this.$route.query.orderId,
      amount: this.$route.query.amount,
    }

    paymentApi.confirmPayment(this.$router, paymentSuccessInfo);
  }
}
</script>