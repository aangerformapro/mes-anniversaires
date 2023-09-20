<script setup>
import {ref} from "vue";

const
    slideUp = ref(false),
    props = defineProps(['show']),
    emit = defineEmits(['hide']);

defineExpose({
  slideUp
});

const slideDown = () => {
  // slideUp.value = false;
  slideUp.value = false;
  emit('hide');
}


</script>

<template>
  <div
      class="slide-in-form"
      :data-visible="show || slideUp">
    <div class="slide-out-btn" @click="slideDown"/>
    <div class="slide-in-form-inner" v-if="show || slideUp">
      <slot/>
    </div>

  </div>
</template>

<style scoped>

</style>