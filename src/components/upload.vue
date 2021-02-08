<template>
  <div>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <div class="upload-demo" v-show="!musicplay">
          <input type="file" ref="fileInt" @change="changeHandle">
          <router-link to="/music">
          <button @click="play">音乐</button>
          </router-link>
          <router-link to="/recommend">
          <button>评论</button>
          </router-link>
        </div>
        <div v-show="musicplay" class="body">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

import axios from 'axios'
<script>
    const axios = require('axios');
    export default {
        name: "upload",
        data() {
          return {
            musicfile:'',
            musicplay: false
          }
        },
        methods: {
          changeHandle() {
            const path = 'http://localhost:5000/mus/upload'
            const self = this;
            const file = this.$refs.fileInt.files[0];
            console.log(file);
            //const data = new FormData();
            self.musicfile = new FormData();
            //data.append('file', file);
            self.musicfile.append('file', file);
            console.log('data:',self.musicfile.getAll('file'));
            axios.get(path, {
              params: {
                musicfile: this.musicfile,
              }
            }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err);
            });
          },
          play(){
            const self=this;
            self.musicplay = true;
          },
          display(){
            const self=this;
            self.musicplay = false;
          }
        }
    }
</script>

<style scoped>

</style>
