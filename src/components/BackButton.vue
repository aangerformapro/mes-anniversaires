<script setup>

import ArrowBack from "./icons/ArrowBack.vue";

const props = defineProps({
  route: String
})


</script>

<template>
  <RouterLink :to="{name: props.route || 'home'}"
              class="inline-block items-center font-base bg-transparent hover:bg-white text-white hover:text-neutral-600 py-2 px-3 rounded">
    <slot>
      <ArrowBack size="20" class="me-1 inline-block align-middle"/>
      <span class="align-middle">Retour</span>
    </slot>
  </RouterLink>
</template>

<style scoped>

</style>