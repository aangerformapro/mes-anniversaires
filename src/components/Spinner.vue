<script setup>

import {ref} from "vue";

const
    loading = ref(false),
    props = defineProps(['loading']);


defineExpose({
  loading,
});

</script>

<template>
  <div
      v-if="props.loading === true || loading === true"
      class="inline-block h-8 w-8 animate-[spin_0.5s_linear_infinite] rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary"
      role="status">
          <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
  </div>
</template>

<style scoped>

</style>