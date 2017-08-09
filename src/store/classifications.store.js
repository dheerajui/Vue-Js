const state = {
  recommendedClassifications: {
    CLASSIFICATIONS: [
      {
        affectedProduct: '135132',
        classificationIndex: 1,
        component: 'IT06',
        issue: 'asdjjasd',
        isSelected: false,
        affectedProductDescription: 'iCloud',
        affectedProductImageURL: 'https://en.wikipedia.org/wiki/Apple_Inc.#/media/File:Apple_logo_black.svg',
        componentDescription: 'iCloud Storage',
        issueDescription: 'Billing Issue',
      },
      {
        affectedProduct: '133929',
        classificationIndex: 2,
        component: 'IT06',
        issue: 'aikh',
        isSelected: false,
        affectedProductDescription: 'iTunes Storage',
        affectedProductImageURL: 'https://en.wikipedia.org/wiki/Apple_Inc.#/media/File:Apple_logo_black.svg',
        componentDescription: 'Billing & Buying',
        issueDescription: 'Storage Issue',
      },
      {
        affectedProduct: '133929',
        classificationIndex: 3,
        component: 'IT06',
        issue: 'aduud',
        isSelected: false,
        affectedProductDescription: 'iTunes Storage',
        affectedProductImageURL: 'https://en.wikipedia.org/wiki/Apple_Inc.#/media/File:Apple_logo_black.svg',
        componentDescription: 'Billing & Buying',
        issueDescription: 'Storage Issue',
      },
      {
        affectedProduct: '133929',
        classificationIndex: 4,
        component: 'IT06',
        issue: 'bduud',
        isSelected: false,
        affectedProductDescription: 'iMac',
        affectedProductImageURL: 'https://en.wikipedia.org/wiki/Apple_Inc.#/media/File:Apple_logo_black.svg',
        componentDescription: 'Sales',
        issueDescription: 'Mac Issue',
      },
      {
        affectedProduct: '133929',
        classificationIndex: 5,
        component: 'IT06',
        issue: 'bduud',
        isSelected: false,
        affectedProductDescription: 'iMac',
        affectedProductImageURL: 'https://en.wikipedia.org/wiki/Apple_Inc.#/media/File:Apple_logo_black.svg',
        componentDescription: 'Sales',
        issueDescription: 'Mac Issue',
      },
      {
        affectedProduct: '133929',
        classificationIndex: 6,
        component: 'IT06',
        issue: 'bduud',
        isSelected: false,
        affectedProductDescription: 'iMac',
        affectedProductImageURL: 'https://en.wikipedia.org/wiki/Apple_Inc.#/media/File:Apple_logo_black.svg',
        componentDescription: 'Component Desc',
        issueDescription: 'Mac Issue',
      },
      {
        affectedProduct: '133929',
        classificationIndex: 7,
        component: 'IT06',
        issue: 'bduud',
        isSelected: false,
        affectedProductDescription: 'iMac',
        affectedProductImageURL: 'https://en.wikipedia.org/wiki/Apple_Inc.#/media/File:Apple_logo_black.svg',
        componentDescription: 'Sales',
        issueDescription: 'Mac Issue',
      },
      {
        affectedProduct: '133929',
        classificationIndex: 8,
        component: 'IT06',
        issue: 'bduud',
        isSelected: false,
        affectedProductDescription: 'iMac',
        affectedProductImageURL: 'https://en.wikipedia.org/wiki/Apple_Inc.#/media/File:Apple_logo_black.svg',
        componentDescription: 'Component Desc',
        issueDescription: 'Mac Issue',
      },
    ],
  },
};

/* eslint-disable no-shadow */
const getters = {
  getClassifications(state) {
    return state.recommendedClassifications;
  },
  getSelectedClassification(state) {
    let selectedItem;
    state.recommendedClassifications.CLASSIFICATIONS.forEach((item) => {
      if (item.isSelected === true) {
        selectedItem = item;
      }
    });
    return selectedItem;
  },
};
/* eslint-enable no-shadow */

/* eslint-disable no-shadow */
const mutations = {
  SET_IS_SELECTED(state, index) {
    state.recommendedClassifications.CLASSIFICATIONS[index].isSelected = true;
  },
  RESET_CLASSIFICATION_STORE(state) {
    state.recommendedClassifications.CLASSIFICATIONS.forEach((item) => {
      item.isSelected = false;
    });
  },
};
/* eslint-enable no-shadow */

const actions = {
  setIsSelectedStore({ commit }, payload) {
    commit('SET_IS_SELECTED', payload);
  },
  resetClassificationStore({ commit }) {
    commit('RESET_CLASSIFICATION_STORE');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
