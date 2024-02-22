<template>
  <navbar-header></navbar-header>

  <div id="valid-voucher" class="container">
    <div class="container">
      <img :src="voucher.imageUrl" alt="">
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
          </div>
          <div class="tab-pane fade" id="caution-tab-pane" role="tabpanel" aria-labelledby="caution-tab" tabindex="0">
            <h4>유의사항</h4>
          </div>
        </div>
      </div>
      <div class="container">
        <button @click="onUsedClick" class="btn btn-lg btn-primary">사용 완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken } from '@/modules/utilities';
import * as purchasedVoucherApi from '@/modules/api/purchased-voucher';


export default {
  name: 'ValidVoucherView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      voucher : {}
    }
  },

  methods: {
    onLoad() {
      purchasedVoucherApi
        .findById(this.$route.params.id)
        .then(response => {
          this.voucher = response.data;
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === HttpStatusCode.Unauthorized) {
            requestNewAccessToken(this.$router);
          }
        });
    },

    onUsedClick() {
      if (confirm('사용완료 하시겠습니까?')) {
        purchasedVoucherApi
          .updateValidity(this.$route.params.id)
          .then(response => {
            console.log(response);
            this.$router.replace('/my-vouchers');
          })
          .catch(error => {
            console.log(error);
            if (error.response.status === HttpStatusCode.Unauthorized) {
              requestNewAccessToken(this.$router);
            }
          });
      }
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
</style>