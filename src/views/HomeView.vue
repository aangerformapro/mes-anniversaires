<script setup>
import {  usePersonsStore } from "../stores/persons.js";
import ButtonComponent from "../components/ButtonComponent.vue";
import AddIcon from "../components/AddIcon.vue";
import {ref} from "vue";
import AjouterAnniversaire from "../components/AjouterAnniversaire.vue";

const peoples = usePersonsStore();

const add = ref(false);

function clickButton(){
    add.value = !add.value;
}




</script>

<template>
  <header class="h-[160px]">
    <h1 class="mx-auto max-w-[200px] text-center mb-6">Mes Anniversaires</h1>
    <form id="search-form" class="mb-3 relative">
      <input class="app-input" type="search" name="q" placeholder="Rechercher une personne" v-model="peoples.search">
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
  <div class="person-list overflow-y-auto mx-auto flex flex-col p-6">

    <div v-if="peoples.value.length === 0" class="flex justify-center content-center my-auto">
      Vous n'avez ajouté personne
    </div>
    <ul v-else  class="w-[90%]">
      <li v-for="person in peoples.filtered">
        <img :alt="person.name" :src="person.photo">
        {{ person.name }} né le {{ person.birthdayFr }}
      </li>
    </ul>

  </div>

  <div class="absolute bottom-[10px] w-[calc(100vh-40px)] max-w-[600px] h-[68px] pt-2">
    <ButtonComponent
        :atclick="clickButton"
        class="flex justify-center items-center text-center w-full h-full uppercase">
        <AddIcon class="me-2" :size="20"></AddIcon>
        Ajouter un anniversaire
    </ButtonComponent>
  </div>
  <AjouterAnniversaire :visible="add"/>
</template>

<style scoped>
h1
{
  font-size: 30px;
  font-weight: 600;
}
</style>