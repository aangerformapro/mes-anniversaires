<script setup>
import {ref} from "vue";

const
    slideUp = ref(false),
    props= defineProps({
      show: Boolean
    }),
    emit = defineEmits(['hide']);

defineExpose({
  slideUp
});

const slideDown = () =>{
  // slideUp.value = false;
  props.show = false;
  emit('hide');
}



</script>

<template>
  <div
      class="slide-in-form"
      :data-visible="show">
    <div class="slide-out-btn" @click="slideDown" />
    <div class="slide-in-form-inner">
      <slot/>
    </div>

  </div>
</template>

<style scoped>

</style>