<template>
  <navbar-header></navbar-header>

  <div id="voucher-details">
    <h3>쿠폰 상세정보</h3>

    <div class="container py-5">
      <div class="d-flex justify-content-center">
        <div class="card" style="width: auto; height: auto;">
          <div class="container py-3">
            <img v-bind:src="voucherImage" class="card-img-top" style="width: 500px; height: 500px;" />
          </div>
          <div class="card-body">
            <ul id="details-list-group" class="list-group">
              <span class="d-flex">상품명</span>
              <li id="details-list-group-item" class="list-group-item d-flex">상품명입니다</li>
              <br>
              <span class="d-flex">유효기간</span>
              <li id="details-list-group-item" class="list-group-item d-flex">유효기간입니다</li>
              <br>
              <span class="d-flex">바코드</span>
              <li id="details-list-group-item" class="list-group-item d-flex">바코드입니다</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="container py-5">
        <div>
          <span class="fw-semibold">입력된 쿠폰 정보를 모두 확인했어요.</span>
        </div>
        <div>
          <span>상품명, 교환처, 유효기간, 바코드가 모두 사진과 일치하는지 확인하세요.</span>
        </div>
      </div>

      <div class="container">
        <div class="row row-cols-auto justify-content-center">
          <div class="col">
            <button @click="onCancelClick" class="btn btn-outline-danger">판매 취소</button>
          </div>
          <div class="col">
            <button @click="onContinueClick" class="btn btn-primary">판매 계속</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader.vue';

export default {
  name: 'VoucherDetailsEditView',
  components: {
    NavbarHeader,
  },
  data() {
    return {
      voucherImage : this.$route.query.img
    }
  },
  methods: {
    onCancelClick() {
      if (confirm('판매를 취소하시겠습니까?') === true) {
        this.$router.push('/sell');
      }
    },

    onContinueClick() {
      if (confirm('이 기프티콘을 판매하시겠습니까?') === true) {
        alert('판매 등록이 완료되었습니다.');
        this.$router.push('/');
      }
    }
  }
}
</script>

<style>
#voucher-details {
  margin-top: 60px;
  margin-bottom: 60px;
}

#details-list-group #details-list-group-item {
  border-radius: 0.25rem;
}
</style>