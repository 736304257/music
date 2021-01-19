
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Button from 'ant-design-vue/lib/button'
import Menu from 'ant-design-vue/lib/menu'
import Icon from 'ant-design-vue/lib/icon'
import Avatar from 'ant-design-vue/lib/avatar'
import Layout from 'ant-design-vue/lib/layout'
import Breadcrumb from 'ant-design-vue/lib/breadcrumb'
import 'ant-design-vue/dist/antd.css'
import App from './App'
import axios from 'axios'
import router from './router/index'

Vue.component(Button.name, Button)
Vue.component(Avatar.name, Avatar)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.config.productionTip = false

/* eslint-disable no-new */
/*
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})*/
new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
}).$mount('#app');

//axios.defaults.baseURL = 'http://182.92.127.144'
axios({
  url:'http://localhost:5000/'
  //url:'http://182.92.127.144/'
}).then(res => {
  console.log(res);
})
