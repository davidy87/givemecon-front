<template>
  <div class="py-5">
    <h1>기브미콘</h1>
  </div>

  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-center">
      <div class="row">
        <div class="col-2 py-4 d-flex justify-content-center" v-for="category in categories" :key="category">
          <button class="card align-items-center" data-bs-toggle="modal" data-bs-target="#brands" style="width: 8rem;" 
                  @click="onCategoryClick(category.id, category.name)">
            <img class="card-img-top" src="../assets/logo.png">
            <p>{{ category.name }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="brands">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ modalHeader }}</h1>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="py-5 d-flex align-items-center justify-content-center">
            <div class="row">
              <div class="col-auto pb-4" v-for="brand in brands" :key="brand">                  
                <button @click="onBrandClick(brand.id)" class="card align-items-center" style="width: 8rem;">
                  <img class="card-img-top" src="../assets/logo.png">
                  <div class="card-body" style="width: inherit;">
                    <span class="card-text" >{{ brand.name }}</span>
                  </div>
                </button>
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

export default {
  name: 'HomeView',
  data() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      },
      categories : [],
      brands : [],
      modalHeader : "",
    };
  },
  methods: {
    onLoad() {
      axios
        .get("/api/categories", { headers: this.headers })
        .then((result) => {
          console.log(result);
          this.categories = result.data;
        });
    },
    onCategoryClick(categoryId, categoryName) {
      this.modalHeader = categoryName;
      axios
        .get("/api/brands?categoryId=" + categoryId)
        .then((result) => {
          this.brands = result.data;
        });
    },
    onBrandClick(brandId) {
      this.$router.push({ name: 'voucherList', query: { brandId: brandId} });
    },
  },
  created() {
    this.onLoad();
  }
}
</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>