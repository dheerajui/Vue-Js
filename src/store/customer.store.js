const state = {
  customerData: {},
};

const getters = {
  customerData(state) {
    return state.customerData;
  },
};

const mutations = {
  SET_CUSTOMER_DATA(state, data) {
    state.customerData = data;
  },
};

const actions = {
  setCustomerData({ commit, dispatch }, payload) {
    commit('SET_CUSTOMER_DATA', payload);
    dispatch('setRequestParams');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
