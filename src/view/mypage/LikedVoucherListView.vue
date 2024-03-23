<template>
  <navbar-header></navbar-header>

  <div id="liked-vouchers" class="container">
    <div class="pb-5">
      <h1>찜 리스트</h1>
    </div>

    <div v-if="this.deleted" class="container px-5">
      <div class="alert alert-success">
        <div class="row row-cols-auto align-items-center justify-content-center">
          <div class="col">
            {{ this.deleted.title }}가 찜 리스트에서 제거되었습니다.
          </div>
          <div class="col">
            <button @click="onRollBackClick" class="btn btn-outline-primary">되돌리기</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-4" v-for="[voucherId, voucher] in likedVouchers" :key="voucherId">
            <div class="row">
              <div class="col-sm-8">
                <button @click="onVoucherClick(voucherId)" class="card align-items-center mx-auto" style="width: 8rem;">
                  <img class="card-img-top p-3" :src=voucher.imageUrl>
                  <div class="card-body">
                    <p class="card-text">{{ voucher.title }}</p>
                    <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</p>
                  </div>
                </button>
              </div>
              <div class="col-sm-4 d-flex">
                <button @click="onDeleteClick(voucherId)" class="btn-close" aria-label="Delete"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import * as likedVoucherApi from '@/modules/api/liked-voucher';

export default {
  name: 'LikedVoucherListView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      likedVouchers : new Map(),
      deleted : null,
    }
  },

  methods: {
    onLoad() {
      likedVoucherApi.findAll(this.likedVouchers, this.$router);
    },

    onDeleteClick(voucherId) {
      this.deleted = {};
      likedVoucherApi.deleteByVoucherId(voucherId, this.likedVouchers, this.deleted, this.$router);
    },

    onRollBackClick() {
      likedVoucherApi.undoDelete(this.deleted, this.likedVouchers, this.$router);
      this.deleted = null;
    },

    onVoucherClick(id) {
      this.$router.push('/vouchers/' + id);
    },

    sleep(ms) {
      return new Promise((r) => setTimeout(r, ms));
    }
  },

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
#liked-vouchers {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>