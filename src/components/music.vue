<template>
<main>
    <div class="back" ref="back"></div>
    <div class="glass">
        <div class="dashboard">
            <player class='player' @loadSong='recieve'/>
            <div class="comment">
                <div class="footer_box">
                    <div class="por">
                        <img src="../assets/pro.jpg" width="40" height="40">
                    </div>
                    <div class="jiantou"></div>
                    <input class='talk-input' type='text'  ref="inputId" id="inputId" placeholder='留下你精彩的评论吧~'>
                    <button class='fabu-input' @click='fabu'>评论</button>
                    <p></p>
                    <!--
                    <p>{{this.input}}</p>
                    <p>{{this.time}}</p>-->
                </div>
                <div class="his">
                    <div class="link"></div>
                    <div v-if="commentList.length">
                    <div
                    class="comment_li"
                    v-for="(item,index) in commentList"
                    :key="item.comID"><!-- 在这里为每条评论绑定了点击事件-->
                        <div class="com" v-if="!item.fatherID">
                        <div class="h por">
                            <img :src=item.avatar width="40" height="40">
                        </div>
                        <p class="name">{{item.name}}</p>
                        <p class="time">{{item.time}}</p>
                            <p>{{item.com}}</p>
                            <p class='reply' @click="show(item,index)">回复</p>
                            <input v-show='reply' v-if='id==index' class='reptalk-input' type='text'  ref="repID" :placeholder="'@'+item.name+':'">
                            <button v-show='reply' v-if='id==index' class='reply-input' @click='rep(index)'>回复</button>
                            <!--
                            <button class='reply fabu-input' @click='reply'>回复</button>-->
                            <p class="link1"></p>    
                        </div>
                           <div
                            class="comment_li_son"
                            v-for="(item2,index2) in commentList"
                            :key="index2"><!-- 子评论-->
                                <div class="com_son" v-if="item2.fatherID==item.comID">
                                <div class="h1 por1">
                                    <img src="../assets/pro.jpg">
                                </div>
                                <p class="name">{{item2.name}}</p>
                                <p class="time">{{item2.time}}</p>
                                    <p>{{item2.com}}</p>
                                    <p class="link1"></p>    
                                </div>
                            </div>
                    </div>
                    </div>
                    <div class="no_message" v-if="!commentList.length">
                    <i class="iconfont iconfont_style icon-zanwupinglun"></i>
                    <div class="no_message_tips">暂无评论</div>
                    </div>
                </div>
           </div>
        </div>
        <div class="info">
            <p>音乐人信息</p>
            <p>悬赏信息</p>
            <p>是否可下载</p>
        </div>
    </div>
</main>
</template>

import axios from 'axios'
<script>
const axios = require('axios');

import player from "@/components/player.vue"
    export default {
        name: "music",
        components:{
            player
        },
        data: function(){
            return{
            input:'0',
            replyin:'',
            time:'0',
            musID:'',
            reply:'',
            id:'',
            commentList:[
                {
                    name:'飞浪无心',
                    time:'2021/02/01 17:28:50',
                    com:'这首音乐非常适合睡前放松,这首音乐非常适合睡前放松,这首音乐非常适合睡前放松。',
                    avatar:require("../assets/pro.jpg"),
                    comID:'1',
                    fatherID:''
                },
                {
                    name:'zwz',
                    time:'2021/02/01 21:54:50',
                    com:'回复1。',
                    avatar:require("../assets/pro.jpg"),
                    comID:'2',
                    fatherID:'1'
                },
                {
                    name:'张文昭',
                    time:'2021/02/01 21:54:50',
                    com:'这首音乐非常适合睡前放松,这首音乐非常适合睡前放松。',
                    avatar:require("../assets/pro.jpg"),
                    comID:'3',
                    fatherID:''
                },
                {
                    name:'张文昭',
                    time:'2021/02/01 21:54:50',
                    com:'回复222222222，这首音乐非常适合睡前放松,这首音乐非常适合睡前放松。',
                    avatar:require("../assets/pro.jpg"),
                    comID:'4',
                    fatherID:'1'
                }
            ]
            }
        },
        methods:{
            recieve(va1){
                console.log(va1)
                let back = this.$refs.back;
                back.style.backgroundImage = "url(" + va1 + ")";
            },
            //音乐评论发布
            fabu(){
            let inputId = this.$refs.inputId;
            this.input=inputId.value;
            console.log(this.input);
            const d = Date.now();
            var date = new Date(d);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds(); 
            this.time=Y+M+D+h+m+s;
            console.log(this.time);
            const path = 'http://localhost:5000/api/compublish'
            //const path = 'http://182.92.127.144/api/random'
            axios.get(path,{params: {
              usrID: '',
              comment: this.input,
              time:this.time,
              musID:'',
              fatherID:''
            }})
            .then(response => {
            })
            .catch(error => {
              console.log(error)
            })
            },
            //音乐评论获取
            get(){
            const path = 'http://localhost:5000/api/comget'
            //const path = 'http://182.92.127.144/api/comget'
            axios.get(path,{params: {
              musID:this.musID,
            }})
            .then(response => {
              this.commentList = response.data.commentList
            })
            .catch(error => {
              console.log(error)
            })
            },
            //显示评论
            show(item,index){
                const reply = this.reply;
                this.reply=!reply;
                this.id = index;
            },
            //回复
            rep(index){
                let repID = this.$refs.repID[0];
                console.log(repID);
                this.replyin=repID.value;
                console.log(this.replyin);
                repID.value = '';
                const reply = this.reply;
                this.reply=!reply;
                const d = Date.now();
                var date = new Date(d);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds(); 
                this.time=Y+M+D+h+m+s;
                console.log(this.time);
                const comID = this.commentList[index].comID;
                console.log(comID);
                const path = 'http://localhost:5000/api/reply'
                //const path = 'http://182.92.127.144/api/reply'
                axios.get(path,{params: {
                usrID: '',
                comment: this.reply,
                time:this.time,
                musID:'',
                fatherID:comID
                }})
                .then(response => {
                })
                .catch(error => {
                console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
main{
    min-height: 100vh;
    /*
    background: linear-gradient(
        to right top,
        #65dfc9,
        #6cdbeb
    );*/
    display: flex;
    /* 水平居中*/
    align-items: center;
    /*竖直居中*/
    justify-content: center;

}

.back{
    position: absolute;
    background: url('../assets/songs/你的名字.jpg') no-repeat center;
    background-size: 100%;
    /*
    -webkit-filter: blur(20px);
    filter: blur(20px);*/
    width:100%;
    height: 100%;
    background-repeat:no-repeat;
    z-index: -2;
    padding:1px;
    box-sizing:border-box;
}

.back:after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(25px);
    z-index: -1;
}

.glass{
    position: absolute;
    background: white;
    min-height: 100vh;
    width: 60%;
    background: linear-gradient(
        to right bottom,
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.1)
    );
    /*border-radius: 1rem;*/
    backdrop-filter: blur(2rem);
    display: flex;
}

.dashboard{
    flex:2;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1cm;
}

.dashboard .player{
    margin: 0;
}

.info{
    flex:1;
    background: linear-gradient(
    to right bottom,
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.1)
    );
    backdrop-filter: blur(2rem);
}

.comment{
    position:relative;
    background: linear-gradient(
    to right bottom,
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.1)
    );
    backdrop-filter: blur(2rem);
    border-radius: 10px 10px 0 0;
    display:flex;
    height:100%;
    width:90%;
}


/* 评论发布*/


.por{
    padding: 0 6px 0 20px;
    display:flex;
    justify-content:flex-start;
}
.por img{
    border-radius: 40%;
    width:40px;
    height:40px;
}

.por1{
    padding: 0 6px 0 20px;
    display:flex;
    justify-content:flex-start;
}
.por1 img{
    border-radius: 0;
    width:35px;
    height:35px;
}

.footer_box {
  top:2%;
  position: absolute;
  display: flex;
  align-items: center;
  height:8vh; 
  width: 95%;
  }

.jiantou{
  	display:inline-block;
	width:0;
	height:0;
	border-top: 8px solid transparent;
	border-right: 8px solid white;
	border-bottom: 8px solid transparent;
    opacity:0.8;
}

.talk-input {
  flex:4;
  border-radius: 5px 0 0 5px;
  font-size: 30rpx;
  color: black;
  outline-style: none ;
  height:4vh; 
  width:80%;
  border: 0px;
  opacity:0.8;

  }

  .reptalk-input {
  flex:4;
  border-radius: 5px 0 0 5px;
  font-size: 30rpx;
  color: black;
  outline-style: none ;
  height:4vh; 
  width:85.3%;
  border: 0px;
  opacity:0.8;

  }
   
   
.fabu-input {
  flex:1;
  font-size: 30rpx;
  color: black;
  border-radius: 0 2rem 2rem 0;
  background-color: linear-gradient(135deg, #a7b1c0 10%, #b7b8b9ea 100%);
    position:relative;
    outline-style: none ;
    border: 0px;
    height:4vh; 
    cursor: pointer;
    float:left;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
  }
.fabu-input:hover {
    background-color:rgba(214, 211, 211, 0.849);
}


.reply-input {
  flex:1;
  font-size: 30rpx;
  color: black;
  border-radius: 0 5px 5px 0;
  background-color: #eaebecde;
    position:relative;
    outline-style: none ;
    border: 0px;
    height:4vh; 
    cursor: pointer;
    float:right;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
  }
.reply-input:hover {
    background-color:rgba(214, 211, 211, 0.849);
}

.reply {
  flex:1;
  font-size: 40rpx;
  color: black;
  /*
  border-radius: 2rem;
  background-color: linear-gradient(135deg, #a7b1c0 10%, #b7b8b9ea 100%);*/
    position:relative;
    outline-style: none ;
    border: 0px;
    height:0vh; 
    cursor: pointer;
    float:left;
    /*
    -webkit-transition-duration: 0.4s; 
    transition-duration: 0.4s;*/
    top:-17px;
    left:363px;
    font-size:10px;
  }
  /*
.reply:hover {
    background-color:rgba(214, 211, 211, 0.849);
}*/

/*中间的过度的横线*/
.his{
    position: absolute;
    top:75px;
    height:80%;
    width:100%;
}

.link {
    position: absolute;
    width: 100%;
    height: 1px;
    border-top: solid rgba(134, 131, 131, 0.884) 1px;
    }

.h{
    position: absolute;
    top:-18px;
    left:-71px;
}

.h1{
    position: absolute;
    top:-12px;
    left:-55px;
}

.name{
    position: absolute;
    top:-17px;
    left:1px;
    color:rgba(114, 112, 112, 0.986);
}

.time{
    position: absolute;
    top:-17px;
    right:15px;
    color:rgba(114, 112, 112, 0.986);
}

.com{
    position: relative;
    top:36px;
    left:75px; 
    width:83%;
    text-align:justify;
}

.com_son{
    position: relative;
    top:36px;
    left:111px; 
    width:76%;
    text-align:justify;
}
.link1 {
width: 100%;
height: 1px;
border-top: solid rgba(134, 131, 131, 0.884) 1px;
}
.no_message_tips{
    text-align:center;
}
</style>
