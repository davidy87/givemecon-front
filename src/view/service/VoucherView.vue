<template>
  <navbar-header></navbar-header>

  <div id="voucher" class="container">
    <div class="container">
      <img :src="voucher.imageUrl" alt="">
    </div>

    <div class="container">
      <div class="container py-5">
        <h2 class="text-start">{{ voucher.title }}</h2>
      </div>

      <div class="container">
        <h4 class="text-start">{{ format(voucher.minPrice) }} 원</h4>
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
              {{ voucher.description }}
            </div>
          </div>
          <div class="tab-pane fade" id="caution-tab-pane" role="tabpanel" aria-labelledby="caution-tab" tabindex="0">
            <h4>유의사항</h4>
            <div>
              {{ voucher.caution }}
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid" id="purchase-btn">
        <div class="row row-cols-auto justify-content-center">
          <div class="col">
            <button class="btn btn-lg btn-outline-danger" @click="onLikeClick">찜하기</button>
          </div>
          <div class="col">
            <button class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#vouchers-for-sale"
                    @click="onPurchaseClick">
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- voucher for sale modal -->
    <div class="modal fade" id="vouchers-for-sale">
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
              <button v-bind:disabled="getStock(voucherForSale) == 0" class="list-group-item list-group-item-action d-flex justify-content-between align-items-start" v-for="voucherForSale in voucherForSaleList" :key="voucherForSale"
                      @click="onVoucherForSaleClick(voucherForSale)">
                <div class="ms-2 me-auto">
                  <div>{{ voucherForSale.expDate }} 까지</div>
                  <small v-if="getStock(voucherForSale) <= 10" class="text-danger">
                    남은 수량 {{ getStock(voucherForSale) }}개
                  </small>
                </div>
                <span class="fw-semibold">{{ format(voucherForSale.price) }} 원</span>
              </button>
            </div>
            
            <ul id="purchase-list-group" class="list-group" v-for="[voucher, count] in toPurchaseList" :key="voucher">
              <li id="purchase-list-group-item" class="list-group-item">
                <div class="d-flex justify-content-between align-items-start py-2">
                  <div class="ms-2 me-auto">
                    {{ voucher.expDate }} 까지
                  </div>
                  <button @click="onDeleteClick(voucher)" class="btn btn-sm btn-close"></button>
                </div>
                <div class="d-flex align-items-center py-2">
                  <div class="ms-3 me-auto">
                    <div class="input-group">
                      <button v-bind:disabled="count == 1" @click="onMinusClick(voucher)" class="btn btn-sm btn-outline-secondary" type="button">-</button>
                      <span class="form-control">{{ count }}</span>
                      <button v-bind:disabled="getStock(voucher) == 0" @click="onPlusClick(voucher)" class="btn btn-sm btn-outline-secondary" type="button">+</button>
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
                <div>총 수량 <span class="text-danger">{{ this.totalCount }}개</span></div>
              </div>
              <span class="fw-semibold">총 금액 <span class="text-danger">{{ format(this.totalPrice) }}원</span></span>
            </div>

            <div class="container-fluid">
              <button @click="onFinalPurchaseClick" class="btn btn-primary">
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
import * as voucherApi from '@/api/modules/voucher';
import * as likedVoucherApi from '@/api/modules/liked-voucher';

export default {
  name: 'VoucherView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      voucher: {},
      voucherForSaleList: [],
      voucherForSaleStock: new Map(),
      toPurchaseList: new Map(),
      totalCount: 0,
      totalPrice: 0,
    }
  },

  methods: {
    onLoad() {
      voucherApi.findById(this.$route.params.id, this.voucher);
    },

    onLikeClick() {
      if (!localStorage.getItem('accessToken')) {
        alert('로그인 후 이용해주세요.');
        return;
      }
      likedVoucherApi.addToLikedList(this.voucher.id, this.$router);
    },

    onPurchaseClick() {
      this.toPurchaseList = new Map();
      this.voucherForSaleStock = new Map();
      this.totalCount = 0;
      this.totalPrice = 0;

      voucherApi
        .findSellingList(this.voucher.id)
        .then((response) => {
          console.log(response);
          this.voucherForSaleList = response.data;
          
          this.voucherForSaleList.forEach(voucherForSale => {
            if (this.voucherForSaleStock.has(voucherForSale.expDate)) {
              this.setStock(voucherForSale, this.getStock(voucherForSale) + 1);
            } else {
              this.setStock(voucherForSale, 1);
            }
          })
        });
    },

    onFinalPurchaseClick() {
      if (this.totalCount == 0) {
        alert('구매할 기프티콘을 선택해주세요.');
        return;
      }

      this.$store.commit('purchaseListStore/setPurchaseList', this.toPurchaseList);
      this.$router.push('/purchase');
    },

    onVoucherForSaleClick(voucherForSale) {
      if (this.toPurchaseList.has(voucherForSale)) {
        const count = this.toPurchaseList.get(voucherForSale);
        this.toPurchaseList.set(voucherForSale, count + 1);
      } else {
        this.toPurchaseList.set(voucherForSale, 1);
      }
      this.updateTotalResult(voucherForSale, 1);
    },

    onMinusClick(voucherForSale) {
      const count = this.toPurchaseList.get(voucherForSale);

      if (count > 1) {
        this.toPurchaseList.set(voucherForSale, count - 1);
        this.updateTotalResult(voucherForSale, -1);
      }
    },

    onPlusClick(voucherForSale) {
      const stock = this.getStock(voucherForSale);
      const count = this.toPurchaseList.get(voucherForSale);

      if (count < stock) {
        this.toPurchaseList.set(voucherForSale, count + 1);
        this.updateTotalResult(voucherForSale, 1);
      }
    },

    onDeleteClick(voucherForSale) {
      const count = this.toPurchaseList.get(voucherForSale);
      this.updateTotalResult(voucherForSale, -count);
      this.toPurchaseList.delete(voucherForSale);
    },

    updateTotalResult(voucherForSale, count) {
      const stock = this.getStock(voucherForSale);

      if (stock - count >= 0) {
        this.totalCount += count;
        this.totalPrice += voucherForSale.price * count;
        this.setStock(voucherForSale, stock - count);
      }
    },

    getStock(voucherForSale) {
      return this.voucherForSaleStock.get(voucherForSale.expDate);
    },

    setStock(voucherForSale, stock) {
      this.voucherForSaleStock.set(voucherForSale.expDate, stock);
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