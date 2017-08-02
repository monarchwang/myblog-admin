import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Routers from './routers'

Vue.use(iView);
Vue.use(VueRouter);
let router = new VueRouter({
  mode: 'history',
  routes: Routers
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
