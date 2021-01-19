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
        <h1>关于</h1>
        <p>我是关于内容，哈哈哈</p>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
    export default {
        name: "about"
    }
</script>

<style scoped>

</style>
