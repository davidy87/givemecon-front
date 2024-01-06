<template>
  <div id="category-edit" class="container overflow-scroll">
    <div class="pb-5">
      <h1>카테고리 관리</h1>
    </div>

    <div class="container">
      <ul class="list-group">
        <li v-for="category in categories" :key="category" class="list-group-item d-flex">
          <img class="card-img-top" style="width: 8rem;" src="../../assets/logo.png">
          <div class="container d-flex align-items-center">
            {{ category.name }}
          </div>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CategoryEdit',
  data() {
    return {
      categories : [],
    }
  },

  methods: {
    onLoad() {
      axios
        .get("/api/categories")
        .then((result) => {
          console.log(result);
          this.categories = result.data;
        });
    },
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