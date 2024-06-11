const uploadedImageInfoStore = {
  namespaced: true,
  state: {
    uploadedImageInfo: {},
  },
  getters: {
    getUploadedImageInfo: state => state.uploadedImageInfo,
  },
  mutations: {
    setUploadedImageInfo: (state, payload) => {
      state.uploadedImageInfo = payload;
    },
  },
};

export default uploadedImageInfoStore;