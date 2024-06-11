import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';
import requestedSaleStore from './modules/requestedSaleStore';
import uploadedImageInfoStore from './modules/uploadedImageInfoStore';
import purchaseListStore from './modules/purchaseListStore';

const store = createStore({
  modules: {
    requestedSaleStore,
    uploadedImageInfoStore,
    purchaseListStore,
  },
  plugins: [
    createPersistedState({
      paths: ['requestedSaleStore']
    })
  ],
});

export default store;