import { createStore } from "vuex";
import user from "./modules/user";
import common from './modules/common';
import tags from './modules/tags';
import getters from "./getters";

const store = createStore({
  state: {
    isEarth: false,
    component: null,
    ifshowQuery: false,
    legendUrl:'',
    queryOptions: {
      queryType: "",
    },
    componentVal:null,
  },
  modules: {
    user,
    common,
    tags
  },
  getters,
  mutations: {
    SET_COMPONENT(state, value) {
      state.component = value;
    },
    SET_ISEARTH(state, value) {
      state.isEarth = value;
    },
    setQueryFlag(state, flag) {
      state.ifshowQuery = flag;
    },
    setQueryOptions(state, obj) {
      state.queryOptions = obj;
    },
    SET_COMPONENT_VAL(state, obj) {
      state.componentVal = obj;
    },
    setLegendUrl(state, val) {
      state.legendUrl = val;
    },
  }
});
export default store
