<template>
  <navbar-header></navbar-header>
  <div id="purchased-vouchers">
    <div class="pb-5">
      <h1>내 기프티콘</h1>
    </div>

  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';

export default {
  name: 'PurchasedVoucherListView',
  components: {
    NavbarHeader
  }
}
</script>

<style>
#purchased-vouchers {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>