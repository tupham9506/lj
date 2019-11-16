import Vue from 'vue';
export const state = () => ({

});

export const mutations = {
  saveAuth (state, data) {
    let i;
    for(i in data) {
      Vue.set(state, i, data[i]);
    }
  },
  removeAuth (state) {
    let i;
    for(i in state) {
      Vue.delete(state, i);
    }
  }
}