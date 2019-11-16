import Vue from 'vue';
import common from '~/plugins/common';
export const state = () => ({
});

export const mutations = {
  setUserAccount(state, data) {
    let i;
    for(i in data) {
      Vue.set(state, i, data[i]);
    }
  }
}

export const actions = {
  async getUserDetail (context, account) {
    let response = await common.request({
      url: `/api/show/${account}`
    });

    context.commit('setUserAccount', response.data.user);
  }
}