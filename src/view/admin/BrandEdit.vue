<template>
  <div id="brand-edit" class="container overflow-scroll">
    <div class="pb-5">
      <h1>브랜드 관리</h1>
    </div>

    <div class="container">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-3" v-for="brand in pagedBrands" :key="brand">
            <button @click="onBrandClick(brand)"
                    class="card align-items-center mx-auto" data-bs-toggle="modal" data-bs-target="#edit-brand" style="width: 8rem;">
              <img class="card-img-top" src="../../assets/logo.png">
              <p>{{ brand.name }}</p>
            </button>
          </div>
        </div>
      </div>
      <hr>
      <div class="container pt-3">
        <vue-awesome-paginate
          :total-items="brands.length"
          :items-per-page="10"
          :max-pages-shown="3"
          v-model="currentPage"
          :on-click="onClickHandler"
        />
      </div>
      <div class="container pt-3">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-brand">브랜드 추가하기</button>
      </div>
    </div>

    <div class="modal fade" id="add-brand">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fw-bold">브랜드 추가</h1>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center justify-content-center">
              <div class="container">
                <div class="input-group mb-3">
                  <label class="input-group-text">브랜드 이름</label>
                  <input v-model="newBrand.name" type="text" class="form-control" required>
                </div>
                <div class="input-group mb-3 pb-3">
                  <label class="input-group-text">브랜드 이미지</label>
                  <input @click="onImageUpload" type="file" class="form-control">
                </div>
                <button @click="onAddBrandClick" class="btn btn-primary">추가하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="edit-brand">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fw-bold">브랜드 수정</h1>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center justify-content-center">
              <div class="container">
                <div class="input-group mb-3">
                  <label class="input-group-text">수정할 브랜드 이름</label>
                  <input v-model="brandToEdit.name" type="text" class="form-control" :placeholder="brandToEdit.name" required>
                </div>
                <div class="input-group mb-3 pb-3">
                  <label class="input-group-text">수정할 이미지</label>
                  <input @click="onImageUpload" type="file" class="form-control">
                </div>
                <button @click="onEditBrandClick" class="btn btn-primary">추가하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from "vue";
import { requestNewAccessToken } from '@/modules/utilities.js'

export default {
  name: 'BrandEdit',
  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      },
      brands : [],
      pagedBrands : [],
      currentPage : ref(1),
      brandToEdit : {
        id : 0,
        name : '',
        icon : ''
      },
      newBrand : {
        name : '',
        icon : ''
      }
    }
  },

  methods: {
    onLoad() {
      axios
        .get("/api/brands")
        .then((response) => {
          console.log(response);
          this.brands = response.data;
          this.pagedBrands = this.brands.slice(0, 10);
        });
    },

    onImageUpload(e) {
      const target = e.target;

      if (target.files.length == 1) {
        this.newBrand.icon = target.files[0];
      }
    },

    onBrandClick(brand) {
      this.brandToEdit = structuredClone(brand);
    },

    onAddBrandClick() {
      console.log(this.newBrand);

      if (this.newBrand.name === '') {
        alert('브랜드 이름을 입력해주세요.');
        return;
      }

      axios
        .post('/api/brands', this.newBrand, { headers : this.headers })
        .then((response) => {
          console.log(response);
          alert('브랜드가 추가되었습니다.');
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
          requestNewAccessToken(this.$router);
        });
    },

    onEditBrandClick() {
      console.log(this.brandToEdit);

      if (this.brandToEdit.name === '') {
        alert('브랜드 이름을 입력해주세요.');
        return;
      }

      const requestBody = {
        name: this.brandToEdit.name,
        icon: this.brandToEdit.icon
      }

      axios
        .put('/api/brands/' + this.brandToEdit.id, requestBody, { headers : this.headers })
        .then((response) => {
          console.log(response);
          alert('브랜드가 수정되었습니다.');
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
          requestNewAccessToken(this.$router);
        });
    },

    onClickHandler(page) {
      console.log(page);
      this.currentPage = ref(page);
      this.pagedBrands = this.brands.slice((page - 1) * 10, page * 10);
    }
  },

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
#brand-edit {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
.list-group, .list-group-item {
  border-width: thick;
}
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>