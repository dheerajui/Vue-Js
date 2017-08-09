const state = {
  productData: {},
};

const getters = {
  productData(state) {
    return state.productData;
  },
};

const mutations = {
  SET_PRODUCT_DATA(state, data) {
    state.productData = data;
  },
};

const actions = {
  setProductData({ commit, dispatch }, payload) {
    commit('SET_PRODUCT_DATA', payload);
    dispatch('setRequestParams');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
