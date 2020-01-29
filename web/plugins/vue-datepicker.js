import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import {en, vi} from 'vuejs-datepicker/dist/locale'
Vue.prototype.$datepicker = {
    en: en,
    vi: vi
}
Vue.component('datepicker', Datepicker)