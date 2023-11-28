<template>
  <navbar-header></navbar-header>

  <div id="voucher-image-upload">
    <h1>판매</h1>

    <div class="container py-5"> 
      <div class="d-flex align-items-center justify-content-center">
        <span class="px-3">기프티콘 등록</span>
        <div class="align-items-center px-3">
          <input class="form-control" type="file" id="formFile" @change="onImageUpload($event)" accept="image/*" capture>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <img id="preview" style="width: 500px; height: 500px;" />
    </div>

    <div class="container py-5">
      <button @click="onUploadClick" class="btn btn-primary">기프티콘 등록하기</button>
    </div>
  </div>

</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';

export default {
  name: 'VoucherImageUploadView',
  components: {
    NavbarHeader,
  },
  data() {
    return {
      voucherImage : ''
    }
  },
  methods: {
    onImageUpload(event) {
      const target = event.target;

      if (target !== undefined && target.files.length !== 0) {
        this.base64(target.files[0])
      } else {
        document.getElementById('preview').src = '';
      }
    },

    base64(file) {
      return new Promise(resolve => {
        let a = new FileReader()
        a.onload = e => {
          resolve(e.target.result)
          document.getElementById('preview').src = e.target.result
          this.voucherImage = e.target.result;
        }
        a.readAsDataURL(file)
      });
    },

    onUploadClick() {
      if (this.voucherImage === '') {
        alert("기프티콘 사진을 등록하세요.");
      } else {
        this.$router.push({ path: '/sell/details', query: { img: this.voucherImage }});
      }
    }
  },
  mounted() {
    this.voucherImage = ''
  }
}
</script>

<style>
#voucher-image-upload {
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>