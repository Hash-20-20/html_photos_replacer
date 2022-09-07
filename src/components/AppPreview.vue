<template>
  <div class="preview h-full">
    <div class="tool-bar">
      <button
          @click="handleSelectDocumentClick"
          class="bg-blue-600 hover:bg-blue-700 duration-150 px-2 py-0.5 rounded-sm font-semibold"
      >
        选择文档
      </button>
    </div>
    <div class="view overflow-auto">
      <AppPreviewWindow/>
    </div>
  </div>
</template>

<script>
import AppPreviewWindow from "@/components/AppPreviewWindow";

export default {
  name: "AppPreview",
  components: {
    AppPreviewWindow
  },
  methods: {
    handleSelectDocumentClick() {
      electron.getHTML().then(res => {
        this.$store.commit('setHTML', res.html)
        this.$store.commit('setName', res.fileName)
      })
    }
  }
}
</script>

<style scoped>
  .view {
    background-image: url("~@/assets/images/canvas_background.jpeg");
    margin-top: 1rem;
    height: calc(100% - 28px - 1rem);
  }
  .view::-webkit-scrollbar {
    display: none;
  }
</style>