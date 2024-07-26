<template>
  <navbar-header></navbar-header>

  <div id="voucher" class="container">
    <div class="container">
      <img :src="voucherKind.imageUrl" alt="">
    </div>

    <div class="container">
      <div class="container py-5">
        <h2 class="text-start">{{ voucherKind.title }}</h2>
      </div>

      <div class="container">
        <h4 class="text-start">{{ format(voucherKind.minPrice) }} 원</h4>
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
            <br>
            <div>
              {{ voucherKind.description }}
            </div>
          </div>
          <div class="tab-pane fade" id="caution-tab-pane" role="tabpanel" aria-labelledby="caution-tab" tabindex="0">
            <h4>유의사항</h4>
            <div>
              {{ voucherKind.caution }}
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid" id="purchase-btn">
        <div class="row row-cols-auto justify-content-center">
          <div class="col">
            <button class="btn btn-lg btn-outline-danger" @click="onLikeClick()">찜하기</button>
          </div>
          <div class="col">
            <button class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#vouchers"
                    @click="onPurchaseClick()">
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- voucher for sale modal -->
    <div class="modal fade" id="vouchers">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">구매하기</h1>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="list-group pb-5">
              <div class="d-flex">
                <h6 class="fw-semibold">상품 목록</h6>
              </div>
              
              <div class="list-group-item d-flex justify-content-between align-items-start"
                    v-for="voucher in voucherList" :key="voucher">
                <div class="form-check">
                  <input class="form-check-input" 
                         type="checkbox"
                         :value="voucher.id"
                         v-model="toPurchaseList"
                         @change="onVoucherCheck($event, voucher)">
                  <div class="ms-2 me-auto">
                    <span class="fw-semibold">{{ voucher.expDate }} 까지</span>
                  </div>
                </div>
                <span class="fw-semibold">{{ format(voucher.price) }} 원</span>
              </div>
            </div>
      
            <hr>

            <div class="pb-5 d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div>총 수량 <span class="text-danger">{{ this.totalQuantity }}개</span></div>
              </div>
              <span class="fw-semibold">총 금액 <span class="text-danger">{{ format(this.totalPrice) }}원</span></span>
            </div>

            <div class="container-fluid">
              <button @click="onFinalPurchaseClick()" class="btn btn-primary">
                <span class="fw-semibold">구매하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import * as voucherKindApi from '@/api/modules/voucher-kind';
import * as voucherApi from '@/api/modules/voucher';
import * as likedVoucherApi from '@/api/modules/liked-voucher';
import * as orderApi from '@/api/modules/order';

export default {
  name: 'VoucherKindView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      voucherKind: {},
      voucherStock: new Map(),
      voucherList: [],
      toPurchaseList: [],
      totalQuantity: 0,
      totalPrice: 0,
      modalReady: false
    }
  },

  methods: {
    onLoad() {
      const voucherKindId = this.$route.params.id;
      this.$store.commit('voucherRouteStore/setVoucherRoute', `/voucher-kinds/${voucherKindId}`);
      voucherKindApi.findById(voucherKindId, this.voucherKind);
    },

    onLikeClick() {
      if (!localStorage.getItem('accessToken')) {
        alert('로그인 후 이용해주세요.');
        return;
      }
      likedVoucherApi.addToLikedList(this.voucherKind.id, this.$router);
    },

    onPurchaseClick() {
       if (!localStorage.getItem('accessToken')) {
        alert('로그인 후 이용해주세요.');
        return;
      }

      this.voucherList = [];
      this.toPurchaseList = [];
      this.voucherStock = new Map();
      this.totalQuantity = 0;
      this.totalPrice = 0;
      
      const voucherKindId = this.$route.params.id;
      voucherApi.findAllForSaleByVoucherKindId(this.$router, voucherKindId, this.voucherList);
      this.modalReady = true;
    },

    onFinalPurchaseClick() {
      if (this.totalQuantity === 0) {
        alert('구매할 기프티콘을 선택해주세요.');
        return;
      }
      console.log(this.toPurchaseList);
      orderApi.placeOrder(this.$router, this.toPurchaseList);
    },

    onVoucherCheck(event, voucher) {
      if (event.target.checked) {
        this.totalQuantity++;
        this.totalPrice += voucher.price;
      } else {
        this.totalQuantity--;
        this.totalPrice -= voucher.price;
      }
    },

    format(price) {
      return Intl.NumberFormat('en-US').format(price);
    }
  },

  created() {
    this.onLoad();
  }
}

</script>

<style>
#voucher {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}

#purchase-btn {
  padding-top: 50vh;
  padding-bottom: 10vh;
}

#purchase-list-group #purchase-list-group-item {
  border-radius: 0.25rem;
}
</style>@/api/voucher@/api/liked-voucher