<template>
  <navbar-header></navbar-header>

  <div id="valid-voucher" class="container">
    <div class="container">
      <img id='voucher-kind-image' :src="voucher.voucherKindImageUrl" alt="" height="400" width="400">
    </div>
    <div class="container">
      <div class="container py-5">
        <h2 class="text-start">{{ voucher.title }}</h2>
      </div>
      <div class="container">
        <h4 class="text-start">{{ format(voucher.price) }} 원</h4>
      </div>
      <div class="container py-4">
        <ul class="nav nav-tabs">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description-tab-pane" type="button" role="tab" aria-controls="description-tab-pane" aria-selected="true">
              <b>상품설명</b>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="caution-tab" data-bs-toggle="tab" data-bs-target="#caution-tab-pane" type="button" role="tab" aria-controls="caution-tab-pane" aria-selected="false">
              <b>유의사항</b>
            </button>
          </li>
        </ul>
        <div class="tab-content text-start py-5">
          <div class="tab-pane fade show active" id="description-tab-pane" role="tabpanel" aria-labelledby="description-tab" tabindex="0">
            <h4>상품설명</h4>
            {{ voucher.description }}
          </div>
          <div class="tab-pane fade" id="caution-tab-pane" role="tabpanel" aria-labelledby="caution-tab" tabindex="0">
            <h4>유의사항</h4>
            {{ voucher.caution }}
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row row-cols-auto justify-content-center">
          <div class="col">
            <button @click="onUsedClick()" class="btn btn-lg btn-secondary">사용 완료</button>
          </div>
          <div class="col">
            <button @click="showVoucherImage(voucher.voucherId)" class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#voucher-image-modal">기프티콘 확인하기</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="voucher-image-modal">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <div class="container">
              <img id='voucher-image' :src="voucherImageUrl" alt="" width="400" height="600">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import * as purchasedVoucherApi from '@/api/modules/purchased-voucher';
import * as voucherForSaleApi from '@/api/modules/voucher-for-sale';
// import mediumZoom from 'medium-zoom';

export default {
  name: 'UsableVoucherView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      voucher : {},
      voucherImageUrl : ''
    }
  },

  methods: {
    onLoad() {
      // mediumZoom(document.querySelector("#voucher-image"));
      purchasedVoucherApi.findById(this.$route.params.id, this.voucher);
    },

    onUsedClick() {
      if (confirm('사용완료 하시겠습니까?')) {
        purchasedVoucherApi.updateValidity(this.$router, this.$route.params.id);
      }
    },

    showVoucherImage(voucherId) {
      voucherForSaleApi
        .findVoucherImage(this.$router, voucherId)
        .then(
          (result) => {
            this.voucherImageUrl = result;
          }
        );
    },

    format(price) {
      return Intl.NumberFormat('en-US').format(price);
    }
  },

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
#valid-voucher {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>@/api/purchased-voucher