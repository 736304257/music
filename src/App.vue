<template>
  <div id="app">
      <a-menu v-model="current" mode="horizontal" class="navi">
          <a-menu-item key="mail" class="c-topbar">
            <router-link to="/">
              <img src="./assets/logo.jpg" width="35" height="35">
            首页
            </router-link>
          </a-menu-item>
          <a-menu-item key="app" class="c-topbar" >
            <router-link to="/upload">
              <a-icon type="appstore" />
            音乐发布
            </router-link>
          </a-menu-item>
          <a-sub-menu class="c-topbar">
        <span slot="title" class="submenu-title-wrapper "><a-icon type="setting" />悬赏社区</span>
            <a-menu-item-group title="作品展示">
              <a-menu-item key="setting:1">
                作品
              </a-menu-item>
              <a-menu-item key="setting:2">
                待作曲
              </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="悬赏">
              <a-menu-item key="setting:3">
                悬赏发布
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item key="alipay" class="c-topbar">
            <router-link to="/about">
            <a target="_blank" rel="noopener noreferrer">
                项目简介
            </a>
            </router-link>
          </a-menu-item>
        <a-menu-item class="c-topbar">
          <router-link to="/loginRegister">
            注册/登陆
          </router-link>
        </a-menu-item>
        </a-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ['mail'],
      collapsed: false,
    };
  },
  methods:{
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
}
.navi {
  text-align: center;
}
.c-topbar {
  margin-right: 80px;
}
.ant-layout{
  height:665px;
}
#components-layout-demo-top-side-2 .logo {
   width: 120px;
   height: 31px;
   background: rgba(255, 255, 255, 0.2);
   margin: 16px 28px 16px 0;
   float: left;
 }
</style>
