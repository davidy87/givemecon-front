const purchaseListStore = {
  namespaced: true,
  state: {
    purchaseList: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  getters: {
    getPurchaseList: state => state.purchaseList,
    getTotalQuantity: state => state.totalQuantity,
    getTotalPrice: state => state.totalPrice,
  },
  mutations: {
    setPurchaseList: (state, payload) => {
      state.purchaseList = payload.purchaseList;
      state.totalQuantity = payload.totalQuantity;
      state.totalPrice = payload.totalPrice;
    },

    removePurchase(state, payload) {
      state.purchaseList.splice(payload, 1);
      state.totalQuantity--;
      state.totalPrice -= payload.price;
    },
  },
};

export default purchaseListStore;