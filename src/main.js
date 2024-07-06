import { createApp } from 'vue'
import store from './store/index'
import App from './App.vue'

import HomeView from '@/view/service/HomeView.vue'
import LoginView from '@/view/service/LoginView.vue'
import VoucherListView from '@/view/service/VoucherListView.vue'
import VoucherView from '@/view/service/VoucherView.vue'
import PurchaseView from '@/view/service/PurchaseView'
import PaymentSuccessView from '@/view/service/PaymentSuccessView'

import VoucherImageUploadView from '@/view/mypage/VoucherImageUploadView.vue'
import VoucherSubmitView from '@/view/mypage/VoucherSubmitView.vue'
import LikedVoucherListView from '@/view/mypage/LikedVoucherListView.vue'
import MyVouchersView from '@/view/mypage/MyVouchersView.vue'
import UsableVoucherView from '@/view/mypage/UsableVoucherView.vue'

import AdminView from '@/view/admin/AdminView.vue'
import AdminLoginView from '@/view/admin/AdminLoginView.vue'
import AdminHomeView from '@/view/admin/AdminHomeView.vue'
import SaleRequestManage from '@/view/admin/SaleRequestManage.vue'
import SaleRequestDetail from '@/view/admin/SaleRequestDetail.vue'
import CategoryEdit from "@/view/admin/CategoryEdit.vue"
import BrandEdit from "@/view/admin/BrandEdit.vue"
import VoucherEdit from "@/view/admin/VoucherEdit.vue"

import { createRouter, createWebHistory } from 'vue-router'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/vouchers', component: VoucherListView },
  { path: '/vouchers/:id', component: VoucherView },
  { path: '/sell', component: VoucherImageUploadView, meta: { requiresAuth: true } },
  { path: '/sell/details', component: VoucherSubmitView, meta: { requiresAuth: true } },
  { path: '/liked-vouchers', component: LikedVoucherListView, meta: { requiresAuth: true } },
  { path: '/purchase', component: PurchaseView, meta: { requiresAuth: true } },
  { path: '/payment/success', component: PaymentSuccessView, meta: { requiresAuth: true } },
  { path: '/my-vouchers', component: MyVouchersView, meta: { requiresAuth: true } },
  { path: '/my-vouchers/usable/:id', component: UsableVoucherView, meta: { requiresAuth: true } },
  { path: '/admin/login', component: AdminLoginView },
  { path: '/admin',
    component: AdminView, 
    meta: { requiresAuth: true },
    children: [
      {
        path: '/admin',
        component: AdminHomeView,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin/sale-requests',
        component: SaleRequestManage,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/sale-requests/:id',
        component: SaleRequestDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin/categories',
        component: CategoryEdit,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin/brands',
        component: BrandEdit,
        meta: { requiresAuth: true }
      },
      {
        path: "/admin/vouchers",
        component: VoucherEdit,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const adminPathList = [
    '/admin', 
    '/admin/sale-requests',
    '/admin/sale-requests/:id',
    '/admin/categories', 
    '/admin/brands',
    "/admin/vouchers"
  ];

  // 인증되지 않은 상태라면 인증이 필요한 페이지 접속 거부
  if (!localStorage.getItem('accessToken')) {

    if (adminPathList.includes(to.path)) {
      next('/admin/login');
      return;
    }

    if (to.meta.requiresAuth) {
      alert('로그인 후 이용해주세요.');
      return;
    }
  }

  if (localStorage.getItem('authority') !== 'ADMIN' && adminPathList.includes(to.path)) {
    next('/');
    return;
  }

  // 인증된 상태에서는 로그인 페이지로 접속 거부
  if (to.path === '/login' && localStorage.getItem('accessToken')) {
    next(from);
    return;
  }

  // 모달이 뜬 상태라면 닫기
  let modalBackground = document.querySelector('.modal-backdrop');
  if (modalBackground) {
    modalBackground.remove();
  }

  next();
})

createApp(App)
  .use(router)
  .use(store)
  .use(VueAwesomePaginate)
  .mount('#app')