const requestedSaleStore = {
  namespaced: true,
  state: {
    requestedSale: {},
  },
  getters: {
    getRequestedSale: state => state.requestedSale,
  },
  mutations: {
    setRequestedSale: (state, payload) => {
      state.requestedSale = payload;
    },
  },

};
  
export default requestedSaleStore;