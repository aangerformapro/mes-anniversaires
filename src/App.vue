<script setup>
import AOS from "@/components/AOS.vue";
</script>


<template>
  <RouterView v-slot="{Component, route}">
    <AOS :transition="route.meta.transition" class="h-full w-full" :key="route.path">
      <Component :is="Component"/>
    </AOS>
  </RouterView>

</template>

