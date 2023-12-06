import { createApp } from 'vue'
import App from './App.vue'
import HomeView from './view/HomeView.vue'
import LoginView from './view/LoginView.vue'
import VoucherListView from './view/VoucherListView.vue'
import VoucherView from './view/VoucherView.vue'
import VoucherImageUploadView from './view/VoucherImageUploadView.vue'
import VoucherSubmitView from './view/VoucherSubmitView.vue'
import LikedVoucherListView from '@/view/LikedVoucherListView.vue' 

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/brands/:brandName/vouchers', component: VoucherListView },
  { path: '/vouchers/:id', component: VoucherView },
  { path: '/sell', component: VoucherImageUploadView },
  { path: '/sell/details', component: VoucherSubmitView},
  { path: '/liked-vouchers', component: LikedVoucherListView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // remove modal backdrop if one exists
  let modalBackground = document.querySelector('.modal-backdrop')
  if (modalBackground) {
    modalBackground.remove()
  }
  next()
})

createApp(App).use(router).mount('#app')