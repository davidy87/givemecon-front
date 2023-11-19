import { createApp } from 'vue'
import App from './App.vue'
import HomeView from './view/HomeView.vue'
import VoucherListView from './view/VoucherListView.vue'
import VoucherView from './view/VoucherView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView},
  { path: '/vouchers', name: 'voucherList', component: VoucherListView},
  { path: '/vouchers/:id', name: "voucher", component: VoucherView}
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