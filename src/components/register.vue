<template>
  <div>
     <img :src="imgSrc" class="background"/>
  <form class="front">
      <label for="account">账号:</label>
      <input type="text" v-model="account" id="account">
      <br>
      <label for="password">密码:</label>
      <input type="text" v-model="password" id="password">
      <br>
      <label for="name">昵称:</label>
      <input type="text" v-model="name" id="name">
      <br>
      <button @click.prevent="register">注册</button>
      <div :style="conTop">{{msg}}</div>
    </form>
  </div>
  </template>

import axios from 'axios'
<script>
  const axios = require('axios');
  export default {
        name: "register",
        data(){
          return {
            account:'',
            password:'',
            name:'',
            msg:'',
            imgSrc:require('../assets/logo.jpg'),
            conTop: {
              backgroundImage:'url(' + require('../assets/logo.jpg') + ')',
              backgroundRepeat:'no-repeat',
              backgroundSize: 'cover'
            }
          }
        },
        methods:{
          register(){
            const path = 'http://localhost:5000/usr/info'
            //const path = 'http://182.92.127.144/usr/info'
            axios.get(path,	{params: {
                account:this.account,
                password:this.password,
                name:this.name
            }})
              .then(response=>{
                console.log(response.data)
                console.log(this.name)
                this.msg = response.data.success
              })
              .catch(err=>{
                console.log(err)
              })
          }
        }
    }
</script>

<style scoped>
.background{
  width:100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.front{
    text-align: center;
  z-index: 1;
  position: absolute;
  }
</style>
