<script setup>
defineProps({
  visible: Boolean
});
defineEmits(['hide'])
</script>

<template>
  <form
      id="add-person-form"
      class="slide-in-form"
      :data-visible="visible">
    <div class="slide-out-btn" @click="$emit('hide')"/>
  </form>
</template>

<style lang="scss" scoped>


</style>