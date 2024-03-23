<template>
  <navbar-header></navbar-header>

  <div id="home" class="container">
    <div class="pb-5">
      <h1>기브미콘</h1>
    </div>
  
    <div class="container">
      <div class="d-flex align-items-center justify-content-center">
        <div class="row row-cols-auto justify-content-center">
          <div class="col p-4" v-for="category in categories" :key="category">
            <button @click="onCategoryClick(category.id, category.name)" 
                    class="card align-items-center mx-auto" data-bs-toggle="modal" data-bs-target="#brands" style="width: 8rem;">
              <img class="card-img-top p-3" :src=category.iconUrl>
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
            <div class="d-flex align-items-center justify-content-center">
              <div class="row row-col-auto justify-content-center">
                <div class="col p-3" v-for="brand in brands" :key="brand">                  
                  <button @click="onBrandClick(brand.name)" class="card align-items-center mx-auto" style="width: 8rem;">
                    <img class="card-img-top p-3" :src=brand.iconUrl>
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
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import * as categoryApi from '@/modules/api/category';
import * as brandApi from '@/modules/api/brand';

export default {
  name: 'HomeView',
  components: {
    NavbarHeader
  },
  
  data() {
    return {
      categories : [],
      brands : [],
      modalHeader : '',
    };
  },

  methods: {
    onLoad() {
      categoryApi.findAll(this.categories, this.$router);
    },

    onCategoryClick(categoryId, categoryName) {
      this.modalHeader = categoryName;
      brandApi.findAllByCategoryId(categoryId, this.brands);
    },

    onBrandClick(brandName) {
      this.$router.push({ 
        path: '/vouchers', 
        query: { 
          brand: brandName
        } 
      });
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
  margin-top: 60px;
}
</style>