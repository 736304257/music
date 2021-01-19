<template>
  <div class="login-register">
    <img :src="imgSrc" class="background"/>
    <div class="contain">
      <div class="big-box" :class="{active:isLogin}">
        <div class="big-contain" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="email" placeholder="账号" v-model="form.account" id="account">
            <span class="errTips" v-if="accountError">* 账号不存在 *</span>
            <input type="password" placeholder="密码" v-model="form.password">
            <span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
        </div>
        <div class="big-contain" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="email" placeholder="账号" v-model="form.account" id="account">
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="email" placeholder="昵称" v-model="form.name" id="name">
            <input type="password" placeholder="密码" v-model="form.password" id="password">
          </div>
          <button class="bbutton" @click="aregister">注册</button>
          <div>{{msg}}</div>
        </div>
      </div>
      <div class="small-box" :class="{active:isLogin}">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

import axios from 'axios'
<script>
  const axios = require('axios');
	export default {
    name: 'login-register',
    data() {
      return {
        isLogin: false,
        accountError: false,
        passwordError: false,
        existed: false,
        imgSrc: require('../assets/register.jpg'),
        msg: 'false',
        form: {
          account: '',
          name: '',
          password: ''
        }
      }
    },
    methods: {
      changeType() {
        this.isLogin = !this.isLogin
        this.form.account = ''
        this.form.name = ''
        this.form.password = ''
      },

			login() {
        const path = 'http://localhost:5000/usr/login'
				const self = this;
				if (self.form.account != "" && self.form.password != "") {
          axios.get(path, {
            params: {
              account: this.form.account,
              password: this.form.password
            }
          })
					.then( res => {
						switch(res.data.state){
							case 0:
								alert("登陆成功！");
								break;
							case -1:
								this.accountError = true;
								break;
							case 1:
								this.passwordError = true;
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})
				} else{
					alert("填写不能为空！");
				}
			},
      /*
			register(){
				const self = this;
				if(self.form.username != "" && self.form.useremail != "" && self.form.userpwd != ""){
					self.$axios({
						method:'post',
						url: 'http://127.0.0.1:5000/usr/register',
						data: {
							username: self.form.username,
							email: self.form.useremail,
							password: self.form.userpwd
						}
					})
					.then( res => {
						switch(res.data){
							case 0:
								alert("注册成功！");
								this.login();
								break;
							case -1:
								this.existed = true;
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})
				} else {
					alert("填写不能为空！");
				}
			}
		},*/
      aregister() {
        const path = 'http://localhost:5000/usr/info'
        //const path = 'http://182.92.127.144/usr/info'
        const self = this;
        if (self.form.account != "" && self.form.name != "" && self.form.password != "") {
          axios.get(path, {
            params: {
              account: this.form.account,
              password: this.form.password,
              name: this.form.name
            }
          })
            .then(res => {
              //this.msg = res.data.success
              switch(res.data.state){
                case 0:
                  alert("注册成功！");
                  this.login();
                  break;
                case -1:
                  this.existed = true;
                  break;
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          alert("填写不能为空！");
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .background{
    width:100%;
    height: 110%;
    z-index: -1;
    position: absolute;
  }

  .front{
    text-align: center;
    z-index: 1;
    position: absolute;
  }

	.login-register{
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
    opacity: 0.95;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(57,167,176);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57,167,176);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
    opacity: 0.85;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}

	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
</style>
