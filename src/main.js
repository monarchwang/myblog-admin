import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Blog from './pages/Blog.vue'
import Tag from './pages/Tag.vue'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);
Vue.use(VueRouter);
let router = new VueRouter({
  mode: 'history',
  routes: [
	{
	  path: '/',
	  redirect: '/blog'
	}, {
	  path: '/blog',
	  component: Blog
	}, {
	  path: '/tag',
	  component: Tag
	}
  ]
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
