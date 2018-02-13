const state = {
  notify: {
    visible: false,
    message: null,
  },
  link: {
    enable: false,
    prefix: null,
    suffix: null,
    idProp: null,
  },
};

const getters = {
  visible: state => state.notify.visible,
  message: state => state.notify.message,

  enable: state => state.link.enable,
  prefix: state => state.link.prefix,
  suffix: state => state.link.suffix,
  idProp: state => state.link.idProp,
};

const actions = {
  notify({ commit }, message) {
    commit('notify', { message });
  },

  enableLink({ commit }, { prefix, suffix, idProp }) {
    commit('enableLink', { prefix, suffix, idProp });
  },
  disableLink({ commit }) {
    commit('disableLink');
  },
};

const mutations = {
  notify(state, { message }) {
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
