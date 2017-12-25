import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Raven.config('https://16709c822446413383f1ec0de9dd803f@sentry.io/263631')
  .addPlugin(RavenVue, Vue)
  .install();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
