import { createApp } from 'vue'
import store from './store/store'
import App from './App.vue'

import HomeView from './view/HomeView.vue'
import LoginView from './view/LoginView.vue'
import VoucherListView from './view/VoucherListView.vue'
import VoucherView from './view/VoucherView.vue'
import PurchaseView from '@/view/PurchaseView'
import VoucherImageUploadView from './view/VoucherImageUploadView.vue'
import VoucherSubmitView from './view/VoucherSubmitView.vue'
import LikedVoucherListView from '@/view/LikedVoucherListView.vue'
import MyVouchersView from '@/view/MyVouchersView.vue'
import ValidVoucherView from '@/view/ValidVoucherView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/brands/:brandName/vouchers', component: VoucherListView },
  { path: '/vouchers/:id', component: VoucherView },
  { path: '/sell', component: VoucherImageUploadView, meta: { requiresAuth: true } },
  { path: '/sell/details', component: VoucherSubmitView, meta: { requiresAuth: true } },
  { path: '/liked-vouchers', component: LikedVoucherListView, meta: { requiresAuth: true } },
  { path: '/purchase', component: PurchaseView, meta: { requiresAuth: true } },
  { path: '/my-vouchers', component: MyVouchersView, meta: { requiresAuth: true } },
  { path: '/my-vouchers/valid/:id', component: ValidVoucherView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // remove modal backdrop if one exists
  let modalBackground = document.querySelector('.modal-backdrop');
  if (modalBackground) {
    modalBackground.remove();
  }

  if (to.meta.requiresAuth && !localStorage.getItem('accessToken')) {
    alert('로그인 후 이용해주세요.');
    next('/login');
  }

  next();
})

createApp(App).use(router).use(store).mount('#app')