import Vue from 'vue';
import Vuex from 'vuex';


import bootstrap from './bootstrap.store';
import customer from './customer.store';
import product from './product.store';
import caseLogging from './caseLogging.store';
import classifications from './classifications.store';
import sessionId from './sessionId.store'; // Uday:remove once cocoa is integrated
import compIssue from './compIssue.store';
import triggers from './triggers.store';
import notes from './notes.store';

Vue.use(Vuex);

export const state = {
  isHeaderVisible: true,
  isSupportSectionCollapsed: false,
  isSupportSectionDisabled: false,
  isClassificationVisible: false,
  isChooseOtherLinkClicked: false,
};

export const getters = {
  isHeaderVisible(state) {
    return state.isHeaderVisible;
  },
  isSupportSectionCollapsed(state) {
    return state.isSupportSectionCollapsed;
  },
  isSupportSectionDisabled(state) {
    return state.isSupportSectionDisabled;
  },
  isClassificationVisible(state) {
    return state.isClassificationVisible;
  },
  isChooseOtherLinkClicked(state) {
    return state.isChooseOtherLinkClicked;
  },
};

export const actions = {
  setIsHeaderVisible({ commit }, payload) {
    commit('IS_HEADER_VISIBLE', payload);
  },
  setIsSupportSectionCollapsed({ commit }, payload) {
    commit('IS_SUPPORT_SECTION_COLLAPSED', payload);
  },
  setIsSupportSectionDisabled({ commit }, payload) {
    commit('IS_SUPPORT_SECTION_DISABLED', payload);
  },
  setIsClassificationVisible({ commit }, payload) {
    commit('IS_CLASSIFICATION_VISIBLE', payload);
  },
  setIsChooseOtherLinkClicked({ commit }, payload) {
    commit('IS_CHOOSE_OTHER_LINK_CLICKED', payload);
  },
};

export const mutations = {
  IS_HEADER_VISIBLE(state, data) {
    state.isHeaderVisible = data;
  },
  IS_SUPPORT_SECTION_COLLAPSED(state, data) {
    state.isSupportSectionCollapsed = data;
  },
  IS_SUPPORT_SECTION_DISABLED(state, data) {
    state.isSupportSectionDisabled = data;
  },
  IS_CLASSIFICATION_VISIBLE(state, data) {
    state.isClassificationVisible = data;
  },
  IS_CHOOSE_OTHER_LINK_CLICKED(state, data) {
    state.isChooseOtherLinkClicked = data;
  },
};

export default new Vuex.Store({
  modules: {
    bootstrap,
    customer,
    product,
    caseLogging,
    classifications,
    sessionId,
    compIssue,
    triggers,
    notes,
    base: {
      state,
      mutations,
      actions,
      getters,
    },
  },
});
