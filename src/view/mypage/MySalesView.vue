<template>
  <div id="my-sales" class="container">
    <div class="pb-5">
      <h1>판매 목록</h1>
    </div>

    <div class="container py-4">
      <div class="container">
        <ul class="nav nav-tabs align-items-center justify-content-center">
          <li class="nav-item" role="presentation">
            <button @click="getRequestedSales()" class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#requested-sales-tab-pane" type="button" role="tab" aria-controls="description-tab-pane" aria-selected="true">
              <b>판매 대기 중</b>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button @click="getRejectedSales()" class="nav-link" id="caution-tab" data-bs-toggle="tab" data-bs-target="#rejected-sales-tab-pane" type="button" role="tab" aria-controls="caution-tab-pane" aria-selected="false">
              <b>판매 거절</b>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button @click="getForSaleList()" class="nav-link" id="caution-tab" data-bs-toggle="tab" data-bs-target="#for-sale-tab-pane" type="button" role="tab" aria-controls="caution-tab-pane" aria-selected="false">
              <b>판매 중</b>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button @click="getSoldList()" class="nav-link" id="caution-tab" data-bs-toggle="tab" data-bs-target="#sold-tab-pane" type="button" role="tab" aria-controls="caution-tab-pane" aria-selected="false">
              <b>판매 완료</b>
            </button>
          </li>
        </ul>
      </div>
      <div class="tab-content text-start py-5">
        <div class="tab-pane fade show active" id="requested-sales-tab-pane" role="tabpanel" aria-labelledby="unsued-tab" tabindex="0">
          <div v-if="requestedSales.length === 0" class="container py-5">
            <div class="d-flex align-items-center justify-content-center">
              <h4>판매 대기 중인 기프티콘이 없습니다.</h4>
            </div>
          </div>
          <div class="container">
            <div class="d-flex align-items-center justify-content-center">
              <div class="row row-cols-auto justify-content-center">
                <div class="col p-4" v-for="voucher in requestedSales" :key="voucher">
                  <button @click="onUnusedVoucherClick(voucher.id)" class="card align-items-center mx-auto" style="width: 8rem;">
                    <img class="card-img-top" :src="voucher.voucherKindImageUrl">
                    <div class="card-body">
                      <p class="card-text">{{ voucher.title }}</p>
                      <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</p>
                      <!-- <p class="card-text text-danger">{{ voucher.status }}</p> -->
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="for-sale-tab-pane" role="tabpanel" aria-labelledby="used-tab" tabindex="1">
          <div v-if="rejectedSales.length === 0" class="container py-5">
            <div class="d-flex align-items-center justify-content-center">
              <h4>판매 거절된 기프티콘이 없습니다.</h4>
            </div>
          </div>
          <div class="container">
            <div class="d-flex align-items-center justify-content-center">
              <div class="row row-cols-auto justify-content-center">
                <div class="col p-3" v-for="voucher in rejectedSales" :key="voucher">
                  <button class="card align-items-center mx-auto" style="width: 8rem;">
                    <img class="card-img-top p-3" :src="voucher.voucherKindImageUrl">
                    <div class="card-body" style="width: inherit;">
                      <p class="card-text">{{ voucher.title }}</p>
                      <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</p>
                      <p class="card-text text-danger">{{ voucher.status }}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="rejected-sales-tab-pane" role="tabpanel" aria-labelledby="used-tab" tabindex="2">
          <div v-if="forSaleList.length === 0" class="container py-5">
            <div class="d-flex align-items-center justify-content-center">
              <h4>판매 중인 기프티콘이 없습니다.</h4>
            </div>
          </div>
          <div class="container">
            <div class="d-flex align-items-center justify-content-center">
              <div class="row row-cols-auto justify-content-center">
                <div class="col p-3" v-for="voucher in forSaleList" :key="voucher">
                  <button class="card align-items-center mx-auto" style="width: 8rem;">
                    <img class="card-img-top p-3" :src="voucher.voucherKindImageUrl">
                    <div class="card-body" style="width: inherit;">
                      <p class="card-text">{{ voucher.title }}</p>
                      <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</p>
                      <p class="card-text text-danger">{{ voucher.status }}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="sold-tab-pane" role="tabpanel" aria-labelledby="used-tab" tabindex="3">
          <div v-if="soldList.length === 0" class="container py-5">
            <div class="d-flex align-items-center justify-content-center">
              <h4>판매 완료된 기프티콘이 없습니다.</h4>
            </div>
          </div>
          <div class="container">
            <div class="d-flex align-items-center justify-content-center">
              <div class="row row-cols-auto justify-content-center">
                <div class="col p-3" v-for="voucher in soldList" :key="voucher">
                  <button class="card align-items-center mx-auto" style="width: 8rem;">
                    <img class="card-img-top p-3" :src="voucher.voucherKindImageUrl">
                    <div class="card-body" style="width: inherit;">
                      <p class="card-text">{{ voucher.title }}</p>
                      <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</p>
                      <p class="card-text text-danger">{{ voucher.status }}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as voucherApi from '@/api/modules/voucher';

export default {
  name: 'MySalesView',

  data() {
    return {
      voucherStatus: voucherApi.VoucherStatus,
      StatusInfo: ['판매 대기 중', '판매 거절', ''],
      requestedSales: [],
      rejectedSales: [],
      forSaleList: [],
      soldList: [],
    }
  },

  created() {
    this.getRequestedSales();
  },

  methods: {
    getRequestedSales() {
      voucherApi.findAllByStatus(this.$router, this.voucherStatus.SALE_REQUESTED)
        .then(
          (result) => {
            this.requestedSales = result;
          }
        );
    },

    getRejectedSales() {
      voucherApi.findAllByStatus(this.$router, this.voucherStatus.SALE_REJECTED)
        .then(
          (result) => {
            this.rejectedSales = result;
          }
        );
    },

    getForSaleList() {
      voucherApi.findAllByStatus(this.$router, this.voucherStatus.FOR_SALE)
        .then(
          (result) => {
            this.forSaleList = result;
          }
        );
    },

    getSoldList() {
      voucherApi.findAllByStatus(this.$router, this.voucherStatus.SOLD)
        .then(
          (result) => {
            this.soldList = result;
          }
        );
    }
  }
}
</script>

<style>
#my-sales {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>