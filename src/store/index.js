import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { vuex } from '../app';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const options = {
  paths: ['shared.link'],
  filter: mutation => (mutation.type === 'enableLink'
    || mutation.type === 'disableLink'),
};

export default new Vuex.Store({
  modules: vuex,
  strict: debug,
  plugins: [createPersistedState(options)],
});
