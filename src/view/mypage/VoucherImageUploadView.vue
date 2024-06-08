<template>
  <navbar-header></navbar-header>

  <div v-if="isLoading" class="loading-container">
    <div class="loading">
      <Fade-loader />
    </div>
  </div>

  <div id="voucher-image-upload" class="container">
    <h1>판매</h1>

    <div class="container py-5"> 
      <div class="d-flex align-items-center justify-content-center">
        <span class="px-3">기프티콘 등록</span>
        <div v-bind:disabled="isLoading" class="align-items-center px-3">
          <input class="form-control" type="file" id="formFile" @change="onImageUpload" accept="image/*" capture>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <img id="preview" class="p-3"/>
    </div>

    <div v-bind:disabled="isLoading" class="container py-5">
      <button @click="onUploadClick" class="btn btn-primary">기프티콘 등록하기</button>
    </div>
  </div>

</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import { HttpStatusCode } from 'axios';
import * as imageApi from '@/modules/api/image-text';
import { requestNewAccessToken } from '@/modules/utilities';


export default {
  name: 'VoucherImageUploadView',
  components: {
    NavbarHeader,
    FadeLoader
  },

  data() {
    return {
      imagePreviewUrl : "",
      imageFile : null,
      isLoading : false
    }
  },

  methods: {
    onImageUpload(e) {
      const target = e.target;

      if (target.files.length == 1) {
        this.imageFile = target.files[0];
        this.imagePreviewUrl = URL.createObjectURL(this.imageFile);    
        document.getElementById("preview").src = this.imagePreviewUrl;
      } else {
        this.imagePreviewUrl = "";
      }
    },

    onUploadClick() {
      if (!this.imageFile) {
        alert("기프티콘 사진을 등록하세요.");
      } else {
        this.isLoading = true;

        imageApi
          .requestImageTextExtraction(this.imageFile)
          .then(
            response => {
              console.log(response);

              const uploadedImageInfo = {
                imageFile: this.imageFile, 
                imagePreviewUrl: this.imagePreviewUrl,
                brandName: response.data.brandName,
                barcode: response.data.barcode,
                expDate: response.data.expDate
              };

              this.$store.commit('uploadedImageInfoStore/setUploadedImageInfo', uploadedImageInfo);
              this.isLoading = false;
              this.$router.push('/sell/details');
            },
            async (error) => {
              console.log(error);
              if (error.response.status === HttpStatusCode.Unauthorized) {
                await requestNewAccessToken(this.$router);
                this.onUploadClick;
              }
            }
          )
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

.loading {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.7) 0 0 0 9999px;
}
</style>