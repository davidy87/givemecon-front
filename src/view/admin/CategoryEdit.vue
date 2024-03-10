<template>
  <div id="category-edit" class="container overflow-scroll">
    <div class="pb-5">
      <h1>카테고리 관리</h1>
    </div>

    <div class="container">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-3" v-for="category in categories" :key="category">
            <button @click="onCategoryClick(category)"
                    data-bs-toggle="modal" data-bs-target="#edit-category"
                    class="card align-items-center mx-auto" style="width: 8rem;">
              <img class="card-img-top p-3" :src=category.iconUrl>
              <p>{{ category.name }}</p>
            </button>
          </div>
        </div>
      </div>
      <hr>
      <div class="container pt-3">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-category">카테고리 추가하기</button>
      </div>
    </div>

    <!-- 카테고리 추가 모달 -->
    <div class="modal fade" id="add-category">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fw-bold">카테고리 추가</h1>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center justify-content-center">
              <div class="container">
                <div class="input-group mb-3">
                  <label class="input-group-text">카테고리 이름</label>
                  <input v-model="newCategory.name" type="text" class="form-control" required>
                </div>
                <div class="input-group mb-3 pb-3">
                  <label class="input-group-text">이미지</label>
                  <input @change="onImageUpload($event, newCategory)" type="file" class="form-control">
                </div>
                <button @click="onAddCategoryClick" class="btn btn-primary">추가하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 카테고리 수정 모달 -->
    <div class="modal fade" id="edit-category">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fw-bold">카테고리 수정</h1>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center justify-content-center">
              <div class="container">
                <div class="input-group mb-3">
                  <label class="input-group-text">카테고리 이름</label>
                  <input v-model="categoryToEdit.name" type="text" class="form-control" required>
                </div>
                <div class="input-group mb-3 pb-3">
                  <label class="input-group-text">이미지</label>
                  <input @change="onImageUpload($event, categoryToEdit)" type="file" class="form-control">
                </div>
                <button @click="onEditCategoryClick" class="btn btn-primary">수정하기</button>
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

export default {
  name: 'CategoryEdit',
  data() {
    return {
      categories : [],
      newCategory : {
        name : '',
        iconFile : null
      },
      categoryToEdit : {
        id : 0,
        name : '',
        iconFile : null
      }
    }
  },

  methods: {
    onLoad() {
      categoryApi
        .findAll()
        .then(response => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch(async error => {
          console.log(error);
          if (error.response.status === HttpStatusCode.Unauthorized) {
            await requestNewAccessToken(this.$router);
            this.onLoad();
          }
        });
    },

    onImageUpload(e, category) {
      const target = e.target;

      if (target.files.length == 1) {
        category.iconFile = target.files[0];
      }
    },

    onAddCategoryClick() {
      if (!this.newCategory.name) {
        alert('카테고리 이름을 입력해주세요.');
        return;
      }

      if (!this.newCategory.iconFile) {
        alert('카테고리 사진을 첨부해주세요.');
        return;
      }

      let formData = new FormData();
      formData.append('name', this.newCategory.name);
      formData.append('iconFile', this.newCategory.iconFile);
      
      categoryApi
        .save(formData)
        .then(response => {
          console.log(response);
          alert('카테고리가 추가되었습니다.');
          this.$router.go(0);
        })
        .catch(async error => {
          console.log(error);
          if (error.response.status === HttpStatusCode.Unauthorized) {
            await requestNewAccessToken(this.$router);
            this.onAddCategoryClic();
          }
        });
    },

    onCategoryClick(category) {
      this.categoryToEdit = structuredClone(category);
    },

    onEditCategoryClick() {
      if (!this.categoryToEdit.name) {
        alert('카테고리 이름을 입력해주세요.');
        return;
      }

      let formData = new FormData();
      formData.append('name', this.categoryToEdit.name);
      formData.append('iconFile', this.categoryToEdit.iconFile);

      categoryApi
        .update(this.categoryToEdit.id, formData)
        .then(response => {
          console.log(response);
          alert('카테고리가 수정되었습니다.');
          this.$router.go(0);
        })
        .catch(async error => {
          console.log(error);
          if (error.response.status === HttpStatusCode.Unauthorized) {
            await requestNewAccessToken(this.$router);
            this.onEditCategoryClick();
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
#category-edit {
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
</style>