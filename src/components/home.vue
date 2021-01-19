<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />subnav 1</span>
              <a-menu-item key="1">
                option1
              </a-menu-item>
              <a-menu-item key="2">
                option2
              </a-menu-item>
              <a-menu-item key="3">
                option3
              </a-menu-item>
              <a-menu-item key="4">
                option4
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="laptop" />subnav 2</span>
              <a-menu-item key="5">
                option5
              </a-menu-item>
              <a-menu-item key="6">
                option6
              </a-menu-item>
              <a-menu-item key="7">
                option7
              </a-menu-item>
              <a-menu-item key="8">
                option8
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="notification" />subnav 3</span>
              <a-menu-item key="9">
                option9
              </a-menu-item>
              <a-menu-item key="10">
                option10
              </a-menu-item>
              <a-menu-item key="11">
                option11
              </a-menu-item>
              <a-menu-item key="12">
                option12
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <h1>首页</h1>
        <p>我是首页内容，哈哈哈</p>
        <p>Random number from backend:{{randomNumber}}</p>
        <button @click="getRandom">New random number</button>
      </a-layout-content>
    </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

import axios from 'axios'
<script>
  const axios = require('axios');
    export default {
        name: "home",
        data () {
          return {
          randomNumber: 0
          }
        },
        methods:{
          getRandom(){
            this.randomNumber = this.getRandomFromBackend()
          },
          getRandomFromBackend(){
            const path = 'http://localhost:5000/api/random'
            //const path = 'http://182.92.127.144/api/random'
            axios.get(path)
            .then(response => {
              this.randomNumber = response.data.randomNumber
            })
            .catch(error => {
              console.log(error)
            })
          }
        }
    }

</script>

<style scoped>

</style>
