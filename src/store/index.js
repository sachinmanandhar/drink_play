import Vue from "vue";
import Vuex from "vuex";
import rules from "./modules/rules";
import { createStore } from "vuex-extensions";
Vue.use(Vuex);


export default createStore(Vuex.Store, {
  modules: {
    rules
  },
});