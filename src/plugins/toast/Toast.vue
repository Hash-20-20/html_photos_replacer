<template>
  <div class="toast fixed right-5 bottom-5 rounded shadow-md text-blue-600 bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm px-2.5 py-2" v-if="isShow">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(msg, duration=1500) {
      this.message = msg
      this.isShow = true

      setTimeout(() => this.isShow = false, duration)
      // 动画加在这里
    }
  }
}
</script>

<style scoped>
.toast {
  z-index: 9999;
  box-shadow: 0 0 10px rgba(255, 255, 255, .6), 0 0 15px rgba(255, 255, 255, .3);
}
</style>