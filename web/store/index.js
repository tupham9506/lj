import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

export const state = () => ({
  locales: ['vi', 'en'],
  locale: 'vi',
  dateFormat: 'DD/MM/YYYY'
})
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
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