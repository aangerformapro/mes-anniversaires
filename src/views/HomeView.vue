<script setup>
import {usePersonsStore} from "../stores/persons.js";
import ButtonComponent from "../components/ButtonComponent.vue";
import AddIcon from "../components/AddIcon.vue";
import {ref} from "vue";
import AjouterAnniversaire from "../components/AjouterAnniversaire.vue";
import SearchIcon from "../components/SearchIcon.vue";
import CancelIcon from "../components/CancelIcon.vue";

const peoples = usePersonsStore();

const add = ref(false);

function clickButton() {
  add.value = !add.value;
}

function resetInput() {
  peoples.search = '';
}

</script>

<template>
  <div class="h-[100%] max-h-[100%] w-[100%] p-5">
    <header class="h-[160px]">
      <h1 class="mx-auto max-w-[200px] text-center mb-6">Mes Anniversaires</h1>
      <form id="search-form" class="mb-3 relative">
        <input class="app-input" type="search" name="q" placeholder="Rechercher une personne" v-model="peoples.search"
               @focus="add = false">
        <span class="search-icon" @click="resetInput">
          <SearchIcon v-if="!peoples.search" fill="#bdbdbd"/>
          <CancelIcon :size="32" v-else class="text-neutral-800"/>
        </span>

      </form>
    </header>
    <div class="person-list overflow-y-auto mx-auto flex flex-col p-6 h-[calc(100vh-260px)] max-h-[calc(100vh-260px)]">

      <div v-if="peoples.value.length === 0" class="flex justify-center content-center my-auto">
        Vous n'avez ajouté personne
      </div>
      <ul v-else class="w-[90%]">
        <li v-for="person in peoples.filtered">
          <img :alt="person.name" :src="person.photo">
          {{ person.name }} né le {{ person.birthdayFr }}
        </li>
      </ul>

    </div>

    <div class="absolute bottom-[10px] w-[calc(100vw-40px)] max-w-[600px] h-[68px] pt-2">
      <ButtonComponent
          :atclick="clickButton"
          class="flex justify-center items-center text-center w-full h-full uppercase">
        <AddIcon class="me-2" :size="20"></AddIcon>
        Ajouter un anniversaire
      </ButtonComponent>
    </div>
  </div>
  <AjouterAnniversaire :visible="add" @hide="add=false"/>
</template>

<style scoped>

</style>