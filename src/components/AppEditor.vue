<template>
  <div class="editor flex flex-col h-full">
    <div class="tool-bar flex-none text-right">
      <button
          class="bg-yellow-600 hover:bg-yellow-700 duration-150 px-2 py-0.5 rounded-sm font-semibold"
      >
        导出代码
      </button>
    </div>
    <div class="view flex-grow pt-4">
      内容
    </div>
  </div>
</template>

<script>
export default {
  name: "AppEditor"
}
</script>

<style scoped>

</style>