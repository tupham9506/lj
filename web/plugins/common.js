import Vue from 'vue';
import axios from 'axios';
import * as Cookies from "js-cookie";
const config = {
  serverOrigin: 'http://localhost:9506'
};

const common = {
  async request(options) {
    let lj = Cookies.get('lj');
    let auth = {};
    try {
      auth = JSON.parse(lj)['auth'];
    } catch(e) {}
    let response = {};
    try {
      response = await axios({
        url: config.serverOrigin + options.url,
        data: options.data,
        withCredentials: true,
        method: options.method || 'get',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        }
      });
    } catch (e) {
      response = e.response;
    }
    if(response.status == 401) {
      Cookies.remove('lj');
      window.location.replace('/');
    }
    return response;
  },
  mergeObject: (oldObj, newObj) => {
    let i;
    for(i in newObj) {
      oldObj[i] = newObj[i];
    }
    return oldObj;
  }
}
Vue.mixin({
  methods: common
});

export default common;