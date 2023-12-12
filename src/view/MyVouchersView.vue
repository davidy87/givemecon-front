<template>
  <navbar-header></navbar-header>

  <div id="my-vouchers">
    <div class="pb-5">
      <h1>내 기프티콘</h1>
    </div>
    <div class="container py-4">
      <div class="container">
        <ul class="nav nav-tabs align-items-center justify-content-center">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#unused-tab-pane" type="button" role="tab" aria-controls="description-tab-pane" aria-selected="true">
              <b>보유 중</b>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="caution-tab" data-bs-toggle="tab" data-bs-target="#used-tab-pane" type="button" role="tab" aria-controls="caution-tab-pane" aria-selected="false">
              <b>사용 완료 / 만료</b>
            </button>
          </li>
        </ul>
      </div>
      <div class="tab-content text-start py-5">
        <div class="tab-pane fade show active" id="unused-tab-pane" role="tabpanel" aria-labelledby="unsued-tab" tabindex="0">
          <div v-if="unusedVouchers.length === 0" class="container py-5">
            <div class="d-flex align-items-center justify-content-center">
              <h4>보유 중인 기프티콘이 없습니다.</h4>
            </div>
          </div>
          <div class="container">
            <div class="d-flex align-items-center justify-content-center">
              <div class="row row-cols-auto justify-content-center">
                <div class="col p-4" v-for="voucher in unusedVouchers" :key="voucher">
                  <button @click="onUnusedVoucherClick(voucher.id)" class="card align-items-center mx-auto" style="width: 8rem;">
                    <img class="card-img-top" src="../assets/logo.png">
                    <div class="card-body">
                      <p class="card-text">{{ voucher.title }}</p>
                      <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="used-tab-pane" role="tabpanel" aria-labelledby="used-tab" tabindex="0">
          <div v-if="usedVouchers.length === 0" class="container py-5">
            <div class="d-flex align-items-center justify-content-center">
              <h4>사용 완료 / 만료 된 기프티콘이 없습니다.</h4>
            </div>
          </div>
          <div class="container">
            <div class="d-flex align-items-center justify-content-center">
              <div class="row row-cols-auto justify-content-center">
                <div class="col p-4" v-for="voucher in usedVouchers" :key="voucher">
                  <button class="card align-items-center mx-auto" style="width: 8rem;">
                    <img class="card-img-top" src="../assets/logo.png">
                    <div class="card-body">
                      <p class="card-text">{{ voucher.title }}</p>
                      <p class="card-text">{{ Intl.NumberFormat('en-US').format(voucher.price) }} 원</p>
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
import axios from 'axios';

export default {
  name: 'MyVouchersView',
  components: {
    NavbarHeader
  },

  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },

      unusedVouchers : [],
      usedVouchers : []
    }
  },

  methods: {
    onLoad() {
      axios
        .get('/api/purchased-vouchers', { headers : this.headers })
        .then((response) => {
          response.data.forEach(voucher => {
            if (voucher.valid) {
              this.unusedVouchers.push(voucher);
            } else {
              this.usedVouchers.push(voucher);
            }
          })
        });
    },

    onUnusedVoucherClick(id) {
      this.$router.push('/my-vouchers/valid/' + id);
    }
  },

  mounted() {
    this.onLoad();
  }
}
</script>

<style>
#my-vouchers {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>