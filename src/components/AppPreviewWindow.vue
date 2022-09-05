<template>
  <div class="preview-window" v-html="$store.state.html"></div>
</template>

<script>
export default {
  name: "AppPreviewWindow",
  updated() {
    console.log('更新了HTML代码，搜索所有svg和img')
  }
}
</script>

<style scoped>

</style>