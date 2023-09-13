<script setup>

import {onMounted, onUnmounted, ref, watch} from "vue";
import {  usePersonsStore } from "../stores/persons.js";



//
// makeFakeData(25);

const peoples = usePersonsStore();



onMounted(() =>
{

  // console.debug(peoples.persons);
});

// onUnmounted(peoples.$subscribe((...s)=>{
//   console.debug(s)
// }));
</script>

<template>
  <header>
    <h1 class="mx-auto max-w-[200px] text-center mb-10">Mes Anniversaires</h1>
    <form id="search-form" class="mb-3 relative">
      <input class="" type="search" name="q" placeholder="Rechercher une personne" v-model="peoples.search">
      <!--Search icon-->
      <span class="search-icon" id="basic-addon2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd" />
        </svg>
      </span>
    </form>
  </header>
  <div class="person-list overflow-y-auto max-h-[540px] mx-auto flex flex-col justify-center">

    <div v-if="peoples.value.length === 0">
      Vous n'avez ajouté personne
    </div>
    <ul v-else>
      <li v-for="person in peoples.filtered">
        <img :alt="person.name" :src="person.photo">
        {{ person.name }} né le {{ person.birthdayFr }}
      </li>
    </ul>


  </div>
</template>

<style scoped>
h1
{
  font-size: 30px;
  font-weight: 600;
}
</style>