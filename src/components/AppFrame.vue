<template>
  <div class="w-full h-screen flex bg-gray-700 text-white">
    <div class="w-6/12 h-full p-5">
      <slot name="left"></slot>
    </div>
    <div class="w-6/12 h-full p-5">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFrame"
}
</script>