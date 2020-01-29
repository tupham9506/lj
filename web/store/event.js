import Vue from 'vue';
import common from '~/plugins/common';
export const state = () => ({
  eventList: [],
  eventCounter: []
});

export const mutations = {
  setData(state, data) {
    let i;
    for(i in data) {
      Vue.set(state, i, data[i]);
    }
  }
}

export const actions = {
  async getEventList (context, params) {
    let res = await common.request({
      url: `/api/event/get-list?time=${params.time}&mode=${params.mode}`
    });

    context.commit('setData', res.data);
  },
  async save (context, params) {
    await common.request({
      url: '/api/event/save',
      method: 'post',
      data: params
    });
  }
}
