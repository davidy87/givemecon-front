<template>
  <div id="voucher-edit">
    <div class="pb-5">
      <h1>기프티콘 관리</h1>
    </div>
    
    <div class="container d-flex justify-content-center">
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
                      class="card align-items-center mx-auto" data-bs-toggle="modal" data-bs-target="#voucher-list" style="width: 8rem;">
                <img class="card-img-top p-3" :src=brand.iconUrl>
                <p>{{ brand.name }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="voucher-list">
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
                    <button @click="onVoucherClick(voucher)"
                            data-bs-toggle="modal" data-bs-target="#edit-voucher" 
                            class="card align-items-center mx-auto" style="width: 8rem;">
                      <img class="card-img-top p-3" :src=voucher.imageUrl>
                      <div class="card-body" style="width: inherit;">
                        <span class="card-text" >{{ voucher.title }}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div class="container pt-3">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-voucher">추가하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 기프티콘 판매 목록 추가 모달 -->
      <div class="modal fade" id="add-voucher">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 fw-bold">{{ selectedBrand.name }} 기프티콘 판매 목록 추가</h1>
              <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="d-flex align-items-center justify-content-center">
                <div class="container">
                  <div class="input-group mb-3">
                    <label class="input-group-text">기프티콘 상품명</label>
                    <input v-model="newVoucher.title" type="text" class="form-control" required>
                  </div>
                  <div class="input-group mb-3 pb-3">
                    <label class="input-group-text">이미지</label>
                    <input @change="onImageUpload($event, newVoucher)" type="file" class="form-control">
                  </div>
                  <button @click="onAddVoucherClick" class="btn btn-primary">추가하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 기프티콘 판매 목록 수정 모달 -->
      <div class="modal fade" id="edit-voucher">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 fw-bold">{{ selectedBrand.name }} 기프티콘 판매 목록 수정</h1>
              <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="d-flex align-items-center justify-content-center">
                <div class="container">
                  <div class="input-group mb-3">
                    <label class="input-group-text">기프티콘 상품명</label>
                    <input v-model="voucherToEdit.newTitle" type="text" class="form-control" required>
                  </div>
                  <div class="input-group mb-3">
                    <label class="input-group-text">상품 설명</label>
                    <input v-model="voucherToEdit.newDescription" type="text" class="form-control" required>
                  </div>
                  <div class="input-group mb-3">
                    <label class="input-group-text">유의사항</label>
                    <input v-model="voucherToEdit.newCaution" type="text" class="form-control" required>
                  </div>
                  <div class="input-group mb-3 pb-3">
                    <label class="input-group-text">이미지</label>
                    <input @change="onImageUpload($event, voucherToEdit)" type="file" class="form-control">
                  </div>
                  <button @click="onEditVoucherClick" class="btn btn-primary">수정하기</button>
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
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken } from '@/modules/utilities';
import * as categoryApi from '@/modules/api/category';
import * as brandApi from '@/modules/api/brand';
import * as voucherApi from '@/modules/api/voucher';


export default {
  name: 'VoucherEdit',
  data() {
    return {
      categories : [],
      brands : [],
      vouchers : [],
      selectedCategory : {},
      selectedBrand : {},
      newVoucher : {
        title : null,
        imageFile : null
      },
      voucherToEdit : {
        id : 0,
        newTitle : null,
        newDescription : null,
        newCaution : null,
        imageFile : null
      }
    }
  },

  methods: {
    onLoad() {
      categoryApi.findAll(this.categories, this.$router);
    },

    onCategoryClick(category) {
      this.selectedCategory = category;
      brandApi.findAllByCategoryId(category.id, this.brands);
    },

    onBrandClick(brand) {
      this.selectedBrand = brand;
      voucherApi
        .findAllByBrandName(brand.name)
        .then(response => {
          this.vouchers = response.data;
        });
    },

    onImageUpload(e, voucher) {
      const target = e.target;

      if (target.files.length == 1) {
        voucher.imageFile = target.files[0];
      }
    },

    onVoucherClick(voucher) {
      this.voucherToEdit.id = voucher.id;
      this.voucherToEdit.newTitle = voucher.title;
    },

    onAddVoucherClick() {
      if(!this.selectedBrand) {
        alert("브랜드가 선택되지 않았습니다.");
        return;
      }

      if (!this.newVoucher.title) {
        alert("상품명을 입력해주세요.");
        return;
      }

      if (!this.newVoucher.imageFile) {
        alert("이미지를 첨부해주세요.");
        return;
      }

      let formData = new FormData();
      formData.append('brandId', this.selectedBrand.id)
      formData.append('price', 0);
      formData.append('title', this.newVoucher.title);
      formData.append('imageFile', this.newVoucher.imageFile);

      voucherApi
        .save(formData)
        .then(response => {
          console.log(response);
          alert(response.data.title + ' 기프티콘 판매 목록이 추가되었습니다.');
          this.$router.go(0);
        })
        .catch(async error => {
          console.log(error);
          if (error.response.status === HttpStatusCode.Unauthorized) {
            await requestNewAccessToken(this.$router);
            this.onAddVoucherClick();
          }
        });
    },

    onEditVoucherClick() {
      let formData = new FormData();
      formData.append('title', this.voucherToEdit.newTitle);
      formData.append('description', this.voucherToEdit.newDescription);
      formData.append('caution', this.voucherToEdit.newCaution);
      formData.append('imageFile', this.voucherToEdit.imageFile);
      
      voucherApi
        .update(this.voucherToEdit.id, formData)
        .then(response => {
          console.log(response);
          alert('기프티콘 판매 목록 수정이 완료되었습니다.');
          this.$router.go(0);
        })
        .catch(async error => {
          console.log(error);
          if (error.response.status === HttpStatusCode.Unauthorized) {
            await requestNewAccessToken(this.$router);
            this.onEditVoucherClick();
          }
        });
    }
  },

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
#voucher-edit {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>