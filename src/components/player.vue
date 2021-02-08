<template>
  <div class="music-player">
    <!--
    <form action="http://localhost:5000/mus/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="music">
    </form>
    -->
    <input type="file" ref="fileInt" name="music" @change="changeHandle">
    <!-- audio标签 -->
    <audio class="music-player__audio" ></audio>
    <!-- 播放器主体 -->
    <div class="music-player__main">
      <!-- 模糊背景 -->
      <div class="music-player__blur" ref="musbackground"></div>
      <!-- 唱片 -->
      <div class="music-player__disc">
        <!-- 唱片图片 -->
        <div class="music-player__image pause" ref="dic">
          <!--
          <img width="100%" :src='musiclist[0].imageUrl' alt="" ref="imageUrl">
          -->
          <img width="100%" :src=this.musInfo.imageUrl alt="" ref="imageUrl">
        </div>
        <!-- 指针 -->
        <div class="music-player__pointer"><img width="100%" src="../assets/cd_tou.png" alt=""></div>
      </div>
      <!-- 控件主体 -->
      <div class="music-player__controls" ref="con">
        <!-- 歌曲信息 -->
        <div class="music__info light" ref="info">
          <!--
          <h3 class="music__info--title" v-text="musiclist[0].title" ref="title"></h3>
          <p class="music__info--singer" v-text="musiclist[0].singer" ref="singer"></p>
          -->
          <h3 class="music__info--title" v-text=this.musInfo.title ref="title"></h3>
          <p class="music__info--singer" v-text=this.musInfo.singer ref="singer"></p>
        </div>
        <audio ref="audio" @timeupdate="updateProgress" src="http://music.163.com/song/media/outer/url?id=27810022.mp3"></audio>
        <!-- 控件... -->
        <div class="player-control">
          <div class="player-control__content">
            <div class="player-control__btns light" ref="button">
              <div class="player-control__btn player-control__btn--prev" @click="prevSong"><i class="iconfont icon-1_music83"></i></div>
              <div class="player-control__btn player-control__btn--play" @click="playBtn"><i class="iconfont icon-play" ref="audioBtn"></i></div>
              <div class="player-control__btn player-control__btn--next" @click="nextSong"><i class="iconfont icon-1_music82"></i></div>
              <div class="player-control__btn player-control__btn--mode"><i class="iconfont icon-loop"></i></div>
            </div>
            <div class="player-control__volume">
              <div class="control__volume--icon player-control__btn"><i class="iconfont icon-music_volume_up"></i></div>
              <div class="control__volume--progress progress"></div>
            </div>
          </div>

          <!-- 歌曲播放进度 -->
          <div class="player-control__content">
            <div class="player__song--progress progress" ref="progresscontent" @click="setProgress">
              <div class="back" ref="progress"></div>
            </div>
            <div class="player__song--timeProgess nowTime" ref="procurrent">00:00</div>
            <div class="player__song--timeProgess totalTime" ref="protime">00:00</div>
          </div>

        </div>

      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="music-player__list">
      <ul class="music__list_content">
        <!-- <li class="music__list__item play">123</li>
        <li class="music__list__item">123</li>
        <li class="music__list__item">123</li> -->
      </ul>
    </div>
  </div>
</template>

import axios from 'axios'
<script>
  // 音乐信息
  const axios = require('axios');
  const songs = ["打上花火", "なんでもないや (movie edit) - RADWIMPS"];
  // 默认从第一首开始
  let songIndex = 0;
  export default {
    name: "player",
    data() {
      return {
        musiclist: [
          {
            id: 1,
            title: '白月光与朱砂痣 ',
            singer: '水源小樱',
            songUrl: 'http://music.163.com/song/media/outer/url?id=1811147916.mp3',
            imageUrl: require('../assets/songs/你的名字.jpg'),
            back:'../assets/songs/你的名字.jpg'
          },
          {
            id: 2,
            title: '萤火之森',
            singer: 'CMJ-萤火之森',
            songUrl: 'http://music.163.com/song/media/outer/url?id=1415706303.mp3',
            imageUrl: require('../assets/songs/天气之子.jpg'),
            back:'../assets/songs/天气之子.jpg'
          }],
          musID:'',
          musInfo:{
            usrID:'',
            title: '测试',
            intr:'',
            musicfile:'',
            singer: '飞浪无心',
            //songUrl: '',
            time:'',
            type:'',
            imageUrl: require('../assets/songs/天气之子.jpg'),
            back:'../assets/songs/天气之子.jpg'
          }
      }
    },
    mounted() {
      //this.RGDvalue();
    },
    updated() {
      //this.RGDvalue();
    },
    methods: {
      changeHandle() {
        const path = 'http://localhost:5000/mus/upload'
        const self = this;
        const file = this.$refs.fileInt.files[0];
        console.log(file);
        self.musInfo.musicfile = new FormData();
        //self.musInfo.musicfile.append('file', file);
        //console.log('data:',self.musInfo.musicfile.getAll('file'));
        let formdata = new FormData();
        formdata.append('file',file);
        console.log('data:',formdata.getAll('file'));
        var configs = { // 上传文件 请求头要设置成下面这样
          headers:{'Content-Type':'multipart/form-data'}
        };
        const instance=axios.create({
          withCredentials: true      // 如果发送请求的时候需要带上token 验证之类的也可以写在这个对象里
         }) 
        axios.post(path,
            formdata,
            configs
          ).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      },      
      getinfo(){
        const path = 'http://localhost:5000/api/play'
        //const path = 'http://182.92.127.144/api/play'
          axios.get(path, {
            params: {
              musID: this.musID
            }
          })
            .then(res => {
              //this.msg = res.data.success
              console.log(res.data)
              this.musInfo.title=res.data.musname;
              this.musInfo.usrID=res.data.usrID;
              this.musInfo.intr=res.data.musinfo;
              this.musInfo.time=res.data.time;
              this.musInfo.type=res.data.type;
              this.musInfo.musicfile=res.data.musicfile;
              this.musInfo.singer=res.data.singer;
              this.musInfo.back=res.data.pic;
            })
            .catch(err => {
              console.log(err)
            })
      },
      audioPlay() {
        let audio = this.$refs.audio;
        let audioBtn = this.$refs.audioBtn;
        let dic = this.$refs.dic;
        // 元素添加类名
        audio.classList.add("play");
        dic.classList.add("play");
        dic.classList.remove('pause');
        audioBtn.className = "iconfont icon-pause";
        audio.play();
      },
      audioPause() {
        let audio = this.$refs.audio;
        let audioBtn = this.$refs.audioBtn;
        let dic = this.$refs.dic;
        audio.classList.remove('play');
        dic.classList.add('pause');
        audioBtn.className = "iconfont icon-play";
        audio.pause();
      },
      playBtn() {
        let audio = this.$refs.audio;
        audio.classList.contains('play') ? this.audioPause() : this.audioPlay();
      },
      // 更新歌曲细节
      loadSong(id) {
        let title = this.$refs.title;
        let singer = this.$refs.singer;
        let audio = this.$refs.audio;
        let imageUrl = this.$refs.imageUrl;
        let musbackground = this.$refs.musbackground;
        title.innerHTML = this.musiclist[id].title;
        singer.innerHTML = this.musiclist[id].singer;
        audio.src = this.musiclist[id].songUrl;
        imageUrl.src = this.musiclist[id].imageUrl;
        musbackground.style.backgroundImage = "url(" + this.musiclist[id].imageUrl + ")";
        this.RGDvalue();
        this.$emit('loadSong',this.musiclist[id].imageUrl);
      },
      //修改字体按钮颜色
      
      RGDvalue(){
        let musbackground = this.$refs.musbackground;
        let info = this.$refs.info;
        let button = this.$refs.button;
        //var RgbValue = musbackground.style.backgroundColor.replace("rgb(","").replace(")","");
        var RgbValue = "f3 f3 f3";
        var RgbValueArry = RgbValue.split(",");
        var grayLevel = RgbValueArry[0]*0.299+RgbValueArry[1]*0.587+RgbValueArry[2]*0.114;
        console.log('原颜色'+RgbValue)
        console.log('颜色'+grayLevel);
        if (grayLevel>=192){
              info.classList.add('black');
              button.classList.add('black');
              info.classList.remove('light');
              button.classList.remove('light');
        }
        else{
              info.classList.add('light');
              button.classList.add('light');
              info.classList.remove('black');
              button.classList.remove('black');
        }
      },
      // 上一首
      prevSong() {
        songIndex--;
        if (songIndex < 0) {
          songIndex = this.musiclist.length - 1
        }
        ;
        // 加载歌曲信息并播放
        this.loadSong(songIndex);
        this.audioPlay();
      },
      // 下一首
      nextSong() {
        songIndex++;

        if (songIndex > this.musiclist.length - 1) {
          songIndex = 0;
        }
        ;

        this.loadSong(songIndex);

        this.audioPlay();
      },
      // 进度条更新
      updateProgress(res) {
        let audio = this.$refs.audio;
        let progress = this.$refs.progress;
        let procurrent = this.$refs.procurrent;
        let protime = this.$refs.protime;
        // 对象解构操作
        let duration=audio.duration;
        let currentTime=audio.currentTime;
        const progressPercent = (currentTime / duration) * 100;
        // 进度条
        progress.style.width = progressPercent+'%';
        //修改当前播放时间
        let m1 = Math.floor(currentTime/60);
        let s1 = Math.floor(currentTime-m1*60);
        if (m1<10){
          m1='0'+m1;
        };
        if(s1<10){
          s1='0'+s1;
        };
        let t1 = m1+':'+s1;
        //修改总时长
        let m2 = Math.floor(duration/60);
        let s2 = Math.floor(duration-m2*60);
        if (m2<10){
          m2='0'+m2;
        };
        if(s2<10){
          s2='0'+s2;
        };
        let t2 = m2+':'+s2;
        procurrent.innerHTML = t1;
        protime.innerHTML = t2;
      },
      // 设置进度条
      setProgress(e) {
        let audio = this.$refs.audio;
        let progresscontent = this.$refs.progresscontent;
         let con = this.$refs.con;
    // progressContainer代理视图宽度
    const width = progresscontent.clientWidth;
    // 鼠标点击时处于progressContainer里的水平偏移量
    const clickX = e.offsetX;
    console.log(clickX)
        console.log('宽度：', width)
    // audio.duration: 音频长度
    const duration = Math.floor(audio.duration);

    // audio.currentTime: 音频播放位置
    audio.currentTime = (clickX / width) * duration
  }
    }
  }
</script>

<style scoped>
  /* 播放器大小 */
  .music-player {
    width: 550px;
  }

  /* 播放器位置 */
  .music-player {
    position: relative;
    margin: 200px auto;
  }

  /* 播放器主体 */
  .music-player__main {
    height: 180px;
    padding: 25px;
    -webkit-box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }

  /* 播放器主体模糊背景 */
  .music-player__blur {
    
    width: 100%;
    height: 100%;
    position: absolute;
    background: url('../assets/songs/你的名字.jpg') no-repeat center;
    background-size: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    -webkit-filter: blur(20px);
    filter: blur(20px);
    opacity:0.6;
  }



  /* 播放器唱片效果 */
  .music-player__disc {
    float: left;
    width: 130px;
    height: 130px;
    background: url(../assets/cd.png) no-repeat center;
    background-size: 100%;
    position: relative;
  }

  /* 唱片指针 */
  .music-player__pointer {
    width: 25px;
    position: absolute;
    right: -10px;
    top: 0;
    -webkit-transform-origin: right top;
    -ms-transform-origin: right top;
    transform-origin: right top;
    -webkit-transform: rotate(-15deg);
    -ms-transform: rotate(-15deg);
    transform: rotate(-15deg);
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  /* 唱片指针播放状态 加play类名 */
  .music-player__pointer.play {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  /* 唱片歌曲图片 */
  .music-player__image {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }


  /* 播放器控件 */

  .music-player__controls {
    width: 330px;
    height: 130px;
    float: right;
  }

  /* 歌曲信息 */
  .music__info {
    width: 100%;
    height: 50px;
    margin-bottom: 15px;
  }

  .music__info .music__info--title,
  .music__info .music__info--singer {
    color:rgba(0, 0, 0)
  }

  .music__info .music__info--title {
    font-size: 16px;
  }

  .music__info .music__info--singer {
    color: rgba(0, 0, 0);
    font-size: 14px;
    margin-top: 10px;
  }

.music__info .light{
  color:rgba(0, 0, 0)
}

.music__info .black{
  color: rgb(22, 21, 21);
}

  /* 控件 */

  .player-control {
    width: 100%;
  }

  .player-control__content {
    margin-bottom: 5px;
    overflow: hidden;
  }

  /* 播放暂停按钮 */
  .player-control__btns {
    float: left;
    overflow: hidden;
  }

  .player-control__btn {
    float: left;
    margin: 0 5px;
    font-weight: bolder;
    color: rgba(0, 0, 0);
    cursor: pointer;
  }

  .player-control__volume {
    float: right;
    overflow: hidden;
  }

  .control__volume--progress {
    float: left;
    width: 100px;
    position: relative;
    top: 8px;
  }

  .player__song--timeProgess{
    font-size: 12px;
    color: #fff;
    margin-top: 5px;
    padding: 0px 3px;
    background: rgba(0, 0, 0,0.3);
    border-radius: 5px;
  }

  .nowTime{
    float: left;
  }
  .totalTime{
    float: right;
  }

  .progress {
    background: rgba(0, 0, 0, 0.3);
    height: 5px;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset;
    overflow: hidden;
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  }

  .progress .back {
    width: 0px;
    height: 100%;
    border-radius: 2px;
    background: rgba(45, 206, 235, 0.5);
  }

  .progress .pointer {
    width: 7px;
    height: 7px;
    background: #fff;
    border-radius: 50%;
    opacity: 0;
    -webkit-transition: opacity 0.3s;
    -o-transition: opacity 0.3s;
    transition: opacity 0.3s;
    position: absolute;
    top: -1px;
    left: 0;
  }

  .progress:hover .pointer {
    opacity: 1;
  }


  /* 播放 画片 动画 */

  @-webkit-keyframes disc {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes disc {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .music-player__image.play {
    -webkit-animation: disc 5s linear 0s infinite;
    animation: disc 5s linear 0s infinite;
    animation-play-state:running;
  }

    .music-player__image.pause {
    -webkit-animation: disc 5s linear 0s infinite;
    animation: disc 5s linear 0s infinite;
    animation-play-state:paused;
  }


  /*  播放进度  */

  .player__song--progress {
    width: 100%;
    margin-top: 15px;
  }
</style>
