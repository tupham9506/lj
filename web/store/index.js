import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import Vue from "vue";
Vue.use(require('vue-moment'));

export const state = () => ({
  locales: ['vi', 'en'],
  locale: 'vi',
  dateFormat: 'DD/MM/YYYY',
  blockMode: 'months',
  blockSelected: Vue.moment().format('YYYY-MM-DD')
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  update(state, data) {
    let i;
    for(i in data) {
      Vue.set(state, i, data[i]);
    }
  }
}

export const plugins = [
  createPersistedState({
    key: 'lj',
    paths: ['auth', 'user'],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) =>
        Cookies.set(key, value, { path: '/' }),
      removeItem: key => Cookies.remove(key)
    }
  })
]