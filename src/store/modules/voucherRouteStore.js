const voucherRouteStore = {
  namespaced: true,
  state: {
    voucherRoute: null 
  },
  getters: {
    getVoucherRoute: state => state.voucherRoute,
  },
  mutations: {
    setVoucherRoute: (state, payload) => {
      state.voucherRoute = payload;
    },
  },
};

export default voucherRouteStore;