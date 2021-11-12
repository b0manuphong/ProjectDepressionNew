import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resultquestion2: 0,
  },
  modules: {
    auth



  }
});