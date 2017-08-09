// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { VTooltip } from 'v-tooltip';
import App from './App';
import store from './store';
import cocoabirdConfig from './cocoa/cocoabird.config';
import Localizer from './global/localizer.plugin';
import { focus } from './global/focus.directive';

Vue.config.productionTip = false;
Vue.use(cocoabirdConfig);
Vue.use(Localizer);
Vue.directive('focus', focus);
Vue.directive('caseloggingTooltip', VTooltip);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
