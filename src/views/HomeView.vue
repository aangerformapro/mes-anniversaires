<script setup>

import {ref} from "vue";

let search = ref('');


</script>

<template>

  <header>
    <h1 class="mx-auto max-w-[200px] text-center mb-10">Mes Anniversaires</h1>
    <form id="search-form" class="mb-3 relative">
      <input
          class=""
          type="search"
          name="q"
          placeholder="Rechercher une personne"
          v-model="search">
      <!--Search icon-->
      <span
          class="search-icon"
          id="basic-addon2">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
        <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd" />
      </svg>
    </span>
    </form>
  </header>


</template>

<style scoped>

h1{
  font-size: 30px;
  font-weight: 600;
}

</style>