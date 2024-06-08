const purchaseListStore = {
  namespaced: true,
  state: {
    purchaseList: new Map(),
    totalCount: 0,
    totalPrice: 0,
  },
  getters: {
    getPurchaseList: state => state.purchaseList,
    getTotalCount: state => state.totalCount,
    getTotalPrice: state => state.totalPrice,
  },
  mutations: {
    setPurchaseList: (state, payload) => {
      state.purchaseList = payload;
      state.totalCount = 0;
      state.totalPrice = 0;

      state.purchaseList.forEach((value, key) => {
        state.totalCount += value;
        state.totalPrice += key.price * value;
      })
    },

    removePurchase(state, payload) {
      state.totalCount -= state.purchaseList.get(payload);
      state.totalPrice -= payload.price * state.purchaseList.get(payload);
      state.purchaseList.delete(payload);
    },
  },
};

export default purchaseListStore;