<script setup>
import {isFunction} from "@/modules/utils";
import {
  Ripple,
  initTE,
} from "tw-elements";
import {onMounted} from "vue";

const props = defineProps([
  'atclick'
]);


function handleClick(e) {
  e.preventDefault();
  if (isFunction(props.atclick)) {
    props.atclick(e);
  }
}

onMounted(() => {
  initTE({Ripple});
});

</script>

<template>

  <button
      data-te-ripple-init
      data-te-ripple-color="light"
      class="button"
      @click="handleClick"
      type="button">
    <slot>Valider</slot>
  </button>
</template>

<style scoped>

</style>