<script setup>
defineProps(['visible'])
</script>

<template>
  <form class="absolute h-[75vh] bottom-0 bg-white rounded-t-[100px] z-10 w-[calc(100vh-40px)] max-w-[600px]" :data-hidden="!visible">
    <h1>voyons voir</h1>
  </form>
</template>

<style scoped>


</style>