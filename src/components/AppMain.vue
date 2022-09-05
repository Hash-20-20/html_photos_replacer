<template>
  <div class="main">
    <AppFrame>
      <AppPreview slot="left"/>
      <AppEditor slot="right"/>
    </AppFrame>
  </div>
</template>

<script>
import AppFrame from "@/components/AppFrame";
import AppPreview from "@/components/AppPreview";
import AppEditor from "@/components/AppEditor";

export default {
  name: "AppMain",
  components: {
    AppFrame,
    AppPreview,
    AppEditor
  }
}
</script>

<style scoped>

</style>