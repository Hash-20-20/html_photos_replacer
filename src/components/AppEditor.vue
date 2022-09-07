<template>
  <div class="editor flex flex-col h-full">
    <div class="tool-bar flex-none text-right">
      <button
          @click="handleExportHtml"
          class="bg-yellow-600 hover:bg-yellow-700 duration-150 px-2 py-0.5 rounded-sm font-semibold"
      >
        导出代码
      </button>
    </div>
    <div class="view flex-grow flex flex-wrap content-start overflow-auto">
      <div
          class="w-1/4 h-24 bg-white bg-opacity-40 hover:bg-opacity-50 duration-150 rounded transform scale-95 overflow-hidden"
          v-for="item in $store.getters.getPhotosNoRepeat"
          @click="handlePhotoClick(item.url)"
      >
        <img :src="item.url" alt="" class="object-contain object-center w-full h-full">
        <div class="photo-size absolute inset-x-0 bottom-0 text-center bg-white bg-opacity-70 text-blue-500 text-base font-mono cursor-default">{{item.size.width}}x{{item.size.height}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppEditor",
  methods: {
    handlePhotoClick(url) {
      electron.showOpenDialogByPhoto().then(res => {
        if (!res)
          return

        electron.getPhotoFileSize(res).then(newSize => {
          this.$store.dispatch('replacePhoto', {oldUrl: url, newUrl: res, newSize}).then(isSameSize => {
            if (!isSameSize)
              this.$toast.show('图像尺寸已发生改变')
          }).catch(() => {
            electron.showMessage('选择的图像大小超过10MB')
          })
        })
      })
    },
    handleExportHtml() {
      if (this.$store.getters.hasFileName) {
        electron.saveHtml(this.$store.getters.getHtmlObjInnerHtml, `${this.$store.state.fileName}-换图-v.${this.$store.state.version}.html`)
        this.$store.commit('versionIncrement')
      } else
        electron.showMessage('请先选择文档')
    }
  }
}
</script>

<style scoped>
  .view {
    margin-top: 1rem;
    height: calc(100% - 28px - 1rem);
  }
  .view::-webkit-scrollbar {
    display: none;
  }
</style>