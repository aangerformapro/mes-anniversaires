<script setup>

import {onMounted, ref, unref} from "vue";
import aosConfig from "@/config/aos.config";
import {useGlobalCounterStore} from "@/stores/counter";

const
    root = ref(null),
    counter = useGlobalCounterStore(),
    props = defineProps({
      transition: String
    }),
    emit = defineEmits(['start', 'end']);

function onEnd(e) {
  emit('end', e);
}

function onStart(e) {
  emit('start', e);
}

function out(timeout) {
  return new Promise(resolve => {
    const elem = unref(root);
    if (!elem.classList.contains('aos-animate')) {
      return resolve(elem);
    }
    if (typeof timeout !== 'number') {
      const
          duration = JSON.parse(elem.dataset.aosDuration ?? ('' + (aosConfig.duration ?? 400))),
          delay = JSON.parse(elem.dataset.aosDelay ?? ('' + (aosConfig.delay ?? 0))),
          offset = JSON.parse(elem.dataset.aosOffset ?? ('' + (aosConfig.offset ?? 120)));
      timeout = duration + delay + offset;
    }
    setTimeout(() => resolve(elem), timeout);
    elem.classList.remove('aos-animate');
  });
}


// fcp fix
onMounted(() => {
  if (counter.count < 2) {
    counter.increment();
  }
});

defineExpose({
  root, out
});

</script>

<template>

  <div
      ref="root"
      v-if="props.transition && counter.count > 1"
      :data-aos="props.transition"
      @animationend="onEnd"
      @transitionend="onEnd"
      @transitionstart="onStart"
      @animationstart="onStart">
    <slot/>
  </div>
  <slot v-else/>

</template>

<style scoped>

</style>