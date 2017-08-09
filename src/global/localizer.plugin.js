import { mapGetters } from 'vuex';

const Localizer = {
  install(Vue) {
    Vue.mixin({
      computed: {
        ...mapGetters([
          'localizedText',
        ]),
      },
      methods: {
        localizer(key) {
          return this.localizedText(key);
        },
      },
    });
  },
};

export default Localizer;
