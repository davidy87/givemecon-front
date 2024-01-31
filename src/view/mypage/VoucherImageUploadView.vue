<template>
  <navbar-header></navbar-header>

  <div id="voucher-image-upload" class="container">
    <h1>판매</h1>

    <div class="container py-5"> 
      <div class="d-flex align-items-center justify-content-center">
        <span class="px-3">기프티콘 등록</span>
        <div class="align-items-center px-3">
          <input class="form-control" type="file" id="formFile" @change="onImageUpload" accept="image/*" capture>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <img id="preview" class="p-3"/>
    </div>

    <div class="container py-5">
      <button @click="onUploadClick" class="btn btn-primary">기프티콘 등록하기</button>
    </div>
  </div>

</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import { useStore } from "vuex";

export default {
  name: 'VoucherImageUploadView',
  components: {
    NavbarHeader,
  },

  setup() {
    const store = useStore();
    const imageSetter = (imageInfo) => store.commit('setImageInfo', imageInfo);

    return {imageSetter};
  },

  data() {
    return {
      imagePreviewUrl : "",
      imageFile : null,
    }
  },

  methods: {
    onImageUpload(e) {
      const target = e.target;

      if (target.files.length == 1) {
        this.imageFile = target.files[0];
        this.imagePreviewUrl = URL.createObjectURL(this.imageFile);

        this.imageSetter({
          imageFile : this.imageFile, 
          imagePreviewUrl: this.imagePreviewUrl
        });
        
        document.getElementById("preview").src = this.imagePreviewUrl;
      } else {
        this.imagePreviewUrl = "";
      }
    },

    onUploadClick() {
      if (!this.imageFile) {
        alert("기프티콘 사진을 등록하세요.");
      } else {
        this.$router.push('/sell/details');
      }
    }
  },

  mounted() {
    this.imageFile = "";
  }
}
</script>

<style>
#voucher-image-upload {
  margin-top: 60px;
  margin-bottom: 60px;
}

#preview {
  width: 400px;
  height: 400px;
}
</style>