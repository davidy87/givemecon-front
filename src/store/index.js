import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';
import requestedSaleStore from './modules/requestedSaleStore';
import uploadedImageInfoStore from './modules/uploadedImageInfoStore';
import purchaseListStore from './modules/purchaseListStore';
import voucherRouteStore from "./modules/voucherRouteStore";

const store = createStore({
  modules: {
    requestedSaleStore,
    uploadedImageInfoStore,
    purchaseListStore,
    voucherRouteStore,
  },
  plugins: [
    createPersistedState({
      paths: ['requestedSaleStore', 'voucherRouteStore']
    })
  ],
});

export default store;