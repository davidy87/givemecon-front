import { createStore } from "vuex";

export default createStore({
  state: {
    toPurchaseList: new Map(),
    totalCount: 0,
    totalPrice: 0,
    imageFile: null,
    imagePreviewUrl: ""
  },

  mutations: {
    setToPurchaseList(state, value) {
      state.toPurchaseList = value;
      state.totalCount = 0;
      state.totalPrice = 0;

      state.toPurchaseList.forEach((value, key) => {
        state.totalCount += value;
        state.totalPrice += key.price * value;
      })
    },

    setImageInfo(state, value) {
      state.imageFile = value.imageFile;
      state.imagePreviewUrl = value.imagePreviewUrl;
    },

    remove(state, value) {
      state.totalCount -= state.toPurchaseList.get(value);
      state.totalPrice -= value.price * state.toPurchaseList.get(value);

      state.toPurchaseList.delete(value);
    },
  }
});