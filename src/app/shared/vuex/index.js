const state = {
  notify: {
    visible: false,
    message: null,
  },
  loading: {
    visible: false,
    status: null,
  },
  link: {
    enable: false,
    prefix: null,
    suffix: null,
    idProp: null,
    pathFn: null,
  },
};

const getters = {
  visible: state => state.notify.visible,
  message: state => state.notify.message,

  loading: state => state.loading.visible,
  status: state => state.loading.status,

  enable: state => state.link.enable,
  prefix: state => state.link.prefix,
  suffix: state => state.link.suffix,
  idProp: state => state.link.idProp,
  pathFn: state => state.link.pathFn,
};

const actions = {
  notify({ commit }, message) {
    commit('notify', message);
  },

  enableLink({ commit }, { prefix, suffix, idProp }) {
    commit('enableLink', { prefix, suffix, idProp });
  },
  disableLink({ commit }) {
    commit('disableLink');
  },
  setPathFn({ commit }, pathFn) {
    commit('setPathFn', pathFn);
  },

  loadSpinner({ commit }, status) {
    commit('loadSpinner', status);
  },
};

const mutations = {
  notify(state, message) {
    state.notify.visible = !!message;
    state.notify.message = message;
  },

  enableLink(state, { prefix, suffix, idProp }) {
    state.link.enable = true;
    state.link.prefix = prefix;
    state.link.suffix = suffix;
    state.link.idProp = idProp;
  },
  disableLink(state) {
    state.link.enable = false;
  },
  setPathFn(state, pathFn) {
    state.link.pathFn = pathFn;
  },

  loadSpinner(state, status) {
    state.loading.visible = !!status;
    if (state.loading.visible) {
      state.loading.status = status;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
