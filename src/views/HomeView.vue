<script setup>
import {usePersonsStore} from "../stores/persons.js";
import ButtonComponent from "../components/ButtonComponent.vue";
import AddIcon from "../components/icons/AddIcon.vue";
import {ref, watch} from "vue";
import AjouterAnniversaire from "../components/AjouterAnniversaire.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import CancelIcon from "../components/icons/CancelIcon.vue";
import SlideUpForm from "../components/SlideInForm.vue";
import SlideInForm from "../components/SlideInForm.vue";

const peoples = usePersonsStore();

const
    add = ref(false),
    form = ref(null);

// watch(add, value => {
//   if(form.value.slideUp !== value){
//     form.value.slideUp = value
//   }
// });

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
    <div class="person-list mx-auto flex flex-col p-6 h-[calc(100vh-260px)] max-h-[calc(100vh-260px)] overflow-y-auto">

      <div v-if="peoples.value.length === 0" class="flex justify-center content-center my-auto">
        Vous n'avez ajouté personne
      </div>
      <ul v-else class="w-full mx-auto">
        <li v-for="person in peoples.filtered" class="li-list-item">
          <RouterLink :to="{ name: 'profile', params: { id: person.id }}" class="flex items-center flex-wrap w-full max-h-[50px]">
            <div class="w-[50px] h-[50px] relative overflow-hidden">
              <img :alt="person.name" :src="person.photo" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex flex-col p-2 justify-between ms-4 mt-auto">
              <h4 class="text-sky-400 font-semibold">{{ person.name }}</h4>
              <div class="text-sm">
                {{ person.birthdayFr }} - {{ person.age }} ans
              </div>
            </div>
            <div class="text-sm text-neutral-500 ms-auto min-w-[50px] w-[10%]">
              {{ person.nextDaysIntl }}
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="absolute bottom-[10px] w-[calc(100vw-40px)] max-w-[984px] h-[68px] pt-2">
      <ButtonComponent
          :atclick="clickButton"
          class="flex justify-center items-center text-center w-full h-full uppercase">
        <AddIcon class="me-2" :size="20"></AddIcon>
        Ajouter un anniversaire
      </ButtonComponent>
    </div>
  </div>

  <SlideInForm :show="add" @hide="add=false">
    <AjouterAnniversaire @hide="add=false"/>
  </SlideInForm>

</template>

<style lang="scss" scoped>



</style>