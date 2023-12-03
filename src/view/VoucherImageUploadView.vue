<template>
  <navbar-header></navbar-header>

  <div id="voucher-image-upload">
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
      <img id="preview" />
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
      imageFile : '',
    }
  },

  methods: {
    onImageUpload(e) {
      const target = e.target;

      if (target.files.length == 1) {
        this.imageFile = URL.createObjectURL(target.files[0]);
        document.getElementById('preview').src = URL.createObjectURL(target.files[0]);
      } else {
        document.getElementById('preview').src = '';
      }
    },

    showPreview(file) {
      return new Promise(resolve => {
        let a = new FileReader()
        a.onload = e => {
          resolve(e.target.result)
          document.getElementById('preview').src = e.target.result;
        }
        a.readAsDataURL(file)
      });
    },

    onUploadClick() {
      if (this.imageFile === '') {
        alert("기프티콘 사진을 등록하세요.");
      } else {
        this.$router.push({ path: '/sell/details', query: { img: this.imageFile }});
      }
    }
  },

  mounted() {
    this.imageFile = '';
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