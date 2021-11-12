import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { BIcon } from "bootstrap-vue";
import { IconsPlugin } from "bootstrap-vue";
import { FormDatepickerPlugin } from "bootstrap-vue";
import { BFormDatepicker } from "bootstrap-vue";
import Vuex from "vuex";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component("b-icon", BIcon);
Vue.use(IconsPlugin);
Vue.use(FormDatepickerPlugin);
Vue.component("b-form-datepicker", BFormDatepicker);
Vue.use(Vuex);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
