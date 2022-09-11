<template>
  <div id="app">
    <AppMain></AppMain>
  </div>
</template>

<script>
import AppMain from "@/components/AppMain";
// import {getToken} from "@/network/wxUpload";

export default {
  name: 'App',
  components: {
    AppMain
  },
  // created() {
  //   getToken().then(api => {
  //     // token
  //     const token = api.access_token
  //     console.log(token)
  //
  //     // 打开图片，获取路径
  //     electron.showOpenDialogByPhoto().then(url => {
  //       console.log(url)
  //
  //       electron.addMaterial(token, url).then(res => {
  //         console.log(res)
  //       })
  //     })
  //   })
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
