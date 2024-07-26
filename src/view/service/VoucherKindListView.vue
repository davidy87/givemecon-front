<template>
  <navbar-header></navbar-header>

  <div id="voucher-list" class="container">
    <div class="pb-5">
      <h1>{{ this.$route.query.brand }} 기프티콘 목록</h1>
    </div>

    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-4" v-for="voucherKind in voucherKinds" :key="voucherKind">
            <button @click="onVoucherKindClick(voucherKind.id)" class="card align-items-center mx-auto" style="width: 11rem;">
              <img class="card-img-top p-3" :src="voucherKind.imageUrl">
              <div class="card-body">
                <p class="card-text">{{ voucherKind.title }}</p>
                <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucherKind.minPrice) }} 원</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import * as voucherKindApi from '@/api/modules/voucher-kind';

export default {
  name: 'VoucherKindListView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      voucherKinds : [],
    };
  },

  methods: {
    onLoad() {
      voucherKindApi.findAllByBrandId(this.$route.query.brandId, this.voucherKinds);
    },

    onVoucherKindClick(id) {
      this.$router.push('/voucher-kinds/' + id);
    }
  },

  created() {
    this.onLoad();
  }
}

</script>

<style>
#voucher-list {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>@/api/voucher