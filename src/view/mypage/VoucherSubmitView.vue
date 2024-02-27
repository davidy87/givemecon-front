<template>
  <navbar-header></navbar-header>

  <div id="voucher-details" class="container">
    <h3>쿠폰 상세정보</h3>

    <div class="container py-5">
      <div class="d-flex justify-content-center">
        <div class="card" style="width: auto; height: auto;">
          <div class="container py-3">
            <img v-bind:src="imagePreviewUrl" class="card-img-top p-3" style="width: 500px; height: 500px;" />
          </div>
          <div class="card-body">
            <ul id="details-list-group" class="list-group">
              <span class="d-flex">상품명</span>
              <nav class="btn list-group-item">
                <a class="dropdown-item text-left" v-text="voucherToPost.title" data-bs-toggle="modal" data-bs-target="#confirmChange"></a>
              </nav>
              <br>
              <span class="d-flex">가격</span>
              <input v-model="voucherToPost.price" id="details-list-group-item" class="list-group-item d-flex" placeholder="가격을 입력해주세요.">
              <br>
              <span class="d-flex">유효기간</span>
              <input v-model="voucherToPost.expDate" id="details-list-group-item" class="list-group-item d-flex" placeholder="유효기간을 입력해주세요.">
              <br>
              <span class="d-flex">바코드</span>
              <input v-model="voucherToPost.barcode" id="details-list-group-item" class="list-group-item d-flex" placeholder="바코드를 입력해주세요.">
            </ul>
          </div>
        </div>
      </div>

      <div class="container py-5">
        <div>
          <span class="fw-semibold">입력된 쿠폰 정보를 모두 확인해주세요.</span>
        </div>
        <div>
          <span>상품명, 교환처, 유효기간, 바코드가 모두 사진과 일치하는지 확인하세요.</span>
        </div>
      </div>

      <div class="container">
        <div class="row row-cols-auto justify-content-center">
          <div class="col">
            <button @click="onCancelClick" class="btn btn-outline-danger">판매 취소</button>
          </div>
          <div class="col">
            <button @click="onContinueClick" class="btn btn-primary">판매 계속</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="confirmChange">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="container p-5 d-flex justify-content-center">
            <h5>상품명을 수정하시겠습니까?</h5>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#categories">수정하기</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal modal-xl fade" id="categories">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">기프티콘 상품명 선택</h1>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container mx-5 d-flex justify-content-center">
              <div class="container d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 250px;">
                <div class="flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                  <span class="fs-5 fw-semibold">카테고리</span>
                </div>
                <div v-for="category in categories" :key="category" class="list-group list-group-flush border-bottom scrollarea">
                  <a @click="onCategoryClick(category)" class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                    <div>
                      <span class="mb-1">{{ category.name }}</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="container p-5 d-flex align-items-center justify-content-center">
                <div class="d-flex align-items-center justify-content-center">
                  <div class="row row-cols-auto justify-content-center">
                    <div class="col p-3" v-for="brand in brands" :key="brand">
                      <button @click="onBrandClick(brand)"
                              class="card align-items-center mx-auto" data-bs-toggle="modal" data-bs-target="#vouchers" style="width: 8rem;">
                        <img class="card-img-top p-3" :src=brand.iconUrl>
                        <p>{{ brand.name }}</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="vouchers">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">{{ selectedBrand.name }} 판매 리스트: {{ vouchers.length }}</h1>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center justify-content-center">
              <div class="row row-col-auto justify-content-center">
                <div class="col p-3" v-for="voucher in vouchers" :key="voucher">                  
                  <button @click="onVoucherClick(voucher)" class="card align-items-center mx-auto" data-bs-dismiss="modal" style="width: 8rem;">
                    <img class="card-img-top p-3" :src=voucher.imageUrl>
                    <div class="card-body" style="width: inherit;">
                      <span class="card-text" >{{ voucher.title }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div class="container pt-3">
              <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#categories">뒤로가기</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken } from '@/modules/utilities';
import * as caetgoryApi from '@/modules/api/category';
import * as brandApi from '@/modules/api/brand';
import * as voucherApi from '@/modules/api/voucher';
import * as voucherForSaleApi from '@/modules/api/voucher-for-sale';

export default {
  name: 'VoucherSubmitView',
  components: {
    NavbarHeader,
  },

  setup() {
    const store = useStore();
    const imageFile = computed(() => store.state.imageFile);
    const imagePreviewUrl = computed(() => store.state.imagePreviewUrl);

    return {imageFile, imagePreviewUrl}
  },

  data() {
    return {
      categories : [],
      brands : [],
      vouchers : [],
      selectedCategory : {},
      selectedBrand : {},
      voucherToPost : {
        voucherId : null,
        imageFile : this.imageFile,
        title : '상품명을 선택해주세요.',
        price : null,
        expDate : '',
        barcode : '',
      }
    }
  },
  
  methods: {
    onLoad() {
      caetgoryApi
        .findAll()
        .then(response => {
          console.log(response.data);
          this.categories = response.data;
        });
    },

    onCancelClick() {
      if (confirm('판매를 취소하시겠습니까?')) {
        this.$router.replace('/sell');
      }
    },

    onContinueClick() {
      console.log(this.voucherToPost);

      if (!this.voucherToPost.imageFile) {
        alert('기프티콘 이미지를 확인해주세요.');
        return;
      }

      if (!this.voucherToPost.voucherId || !this.voucherToPost.title) {
        alert('상품명을 다시 선택해주세요.');
        return;
      }

      if (!this.voucherToPost.price) {
        alert('가격을 확인해주세요.');
        return;
      }

      if (!this.voucherToPost.expDate) {
        alert('유효기간을 확인해주세요.');
        return;
      }

      if (!this.voucherToPost.barcode) {
        alert('바코드를 확인해주세요.');
        return;
      }

      if (confirm('이 기프티콘을 판매하시겠습니까?')) {
        voucherForSaleApi
          .save(this.voucherToPost)
          .then(response => {
            console.log(response.data);
            alert('판매 등록이 완료되었습니다.');
            this.$router.replace('/');
          })
          .catch(error => {
            console.log(error);
            if (error.response.status === HttpStatusCode.Unauthorized) {
              requestNewAccessToken(this.$router, this.onContinueClick);
            }
          });
      }
    },

    onCategoryClick(category) {
      this.selectedCategory = category;
      brandApi
        .findAllByCategoryId(category.id)
        .then(response => {
          console.log(response.data);
          this.brands = response.data;
        });
    },

    onBrandClick(brand) {
      this.selectedBrand = brand;
      voucherApi
        .findAllByBrandName(brand.name)
        .then(response => {
          console.log(response.data);
          this.vouchers = response.data;
        });
    },

    onVoucherClick(voucher) {
      this.voucherToPost.voucherId = voucher.id;
      this.voucherToPost.title = voucher.title;
    }
  },

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
#voucher-details {
  margin-top: 60px;
  margin-bottom: 60px;
}

#details-list-group #details-list-group-item {
  border-radius: 0.25rem;
}
</style>