import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '../components/home'
import UpLoad from '../components/upload'
import About from '../components/about'
import Register from '../components/register'
import LoginRegister from '../components/loginRegister'
import Player from '../components/player'
import Music from '../components/music'
import Recommend from '../components/recommend'

//1.通过Vue.use(插件),安装插件
Vue.use(VueRouter)

//2.创建VueRouter对象
const routes=[
  {
    path:'/',
    component:Home
  },
  {
    path:'/about',
    component:About
  },
  {
    path:'/upload',
    component:UpLoad
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/loginRegister',
    component:LoginRegister
  },
  {
    path:'/player',
    component:Player
  },
  {
    path:'/music',
    component:Music
  },
  {
    path:'/recommend',
    component:Recommend
  }
]
const router = new VueRouter({
  //配置路由和组件之间的应用关系
  routes:routes
})

//导出router
export default router
