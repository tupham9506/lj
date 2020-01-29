import Vue from 'vue';
import axios from 'axios';
import * as Cookies from "js-cookie";
import moment from "moment";
const config = {
  serverOrigin: 'http://localhost:9506',
};
Vue.prototype.$config = config;

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
    response = response ? response : {};
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
  },
  formatDateByType (date, type) {
    switch(type) {
      case 'years':
        return moment(date).format('YYYY-01-01');
      case 'months':
        return moment(date).format('YYYY-MM-01');
      case 'days':
        return moment(date).format('YYYY-MM-DD');
    }
  }
}
Vue.mixin({
  methods: common
});

export default common;