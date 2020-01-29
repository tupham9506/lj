import Vue from 'vue';
import errorMessage from '@components/error-message';
import * as mdbvue from 'mdbvue';

for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}
Vue.component('error-message', errorMessage)
