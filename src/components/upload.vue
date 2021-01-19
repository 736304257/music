<template>
  <div>
    <a-layout style="padding: 0 24px 24px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <div class="upload-demo">
          <input type="file" ref="fileInt" @change="changeHandle">
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
            musicfile:''
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
          }
        },
    }
</script>

<style scoped>

</style>
