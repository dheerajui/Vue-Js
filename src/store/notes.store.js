const state = {
  notesData: '',
  isNotesVisible: true,
};

const getters = {
  isNotesVisible(state) {
    return state.isNotesVisible;
  },
  getNotesContent(state) {
    return state.notesData;
  },
};

const mutations = {
  SET_NOTES_DATA(state, data) {
    state.notesData = data;
  },
  SET_NOTES_VISIBLE(state, payload) {
    state.isNotesVisible = payload;
  },
};

const actions = {
  setIsNotesVisible({ commit }, payload) {
    commit('SET_NOTES_VISIBLE', payload);
  },
  setUpdatedNotes({ commit }, payload) {
    commit('SET_NOTES_DATA', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
