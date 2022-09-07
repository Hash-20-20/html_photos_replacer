<template>
  <div class="preview-window" v-html="$store.state.html" ref="obj"></div>
</template>

<script>
import {toArray} from "@/assets/js/tools";

export default {
  name: "AppPreviewWindow",
  mounted() {
    this.$store.commit('setHtmlObj', this.$refs.obj)
  },
  updated() {
    const photos = toArray(this.$el.querySelectorAll('svg, img')).map(item => {
      const tag = item.tagName.toLowerCase()
      let url

      switch (tag) {
        case 'img':
          url = item.src
          break
        case 'svg':
          url = item.style.backgroundImage.substring(5, item.style.backgroundImage.length - 2)
          break
      }

      return {tag: tag, url, obj: item, size: {width: 0, height: 0}}
    })

    this.$store.commit('setPhotos', photos)
    this.$store.dispatch('initPhotoSize')
  }
}
</script>