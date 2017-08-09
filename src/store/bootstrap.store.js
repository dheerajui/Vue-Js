import axios from 'axios';

const state = {
  isAppLoaded: false,
  bootstrapData: {},
  i18n: {},
};

const getters = {
  bootstrapData(state) {
    return state.bootstrapData;
  },
  isAppLoaded(state) {
    return state.isAppLoaded;
  },
  localizedText(state) {
    return key => (state.i18n[key] ? state.i18n[key] : key);
  },
  isCGEnabled(state) {
    return (state.bootstrapData && state.bootstrapData.config) ? state.bootstrapData.config.CG : false;
  },
};

const mutations = {
  SET_BOOTSTRAP_DATA(state, data) {
    state.bootstrapData = data;
    state.i18n = JSON.parse(data.i18n);
  },
  SET_IS_APP_LOADED_STATUS(state, data) {
    state.isAppLoaded = data;
  },
};

const actions = {
  setBootstrapData({ commit, dispatch }, payload) {
    commit('SET_BOOTSTRAP_DATA', payload);
    axios.defaults.baseURL = payload.config.base_url;
    dispatch('setRequestParams');
  },
  setIsAppLoadedStatus({ commit }, payload) {
    commit('SET_IS_APP_LOADED_STATUS', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
