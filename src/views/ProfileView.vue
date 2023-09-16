<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import NotFoundView from "./NotFoundView.vue";
import {useGiftsStore} from "../stores/gifts.js";
import SearchIcon from "../components/icons/SearchIcon.vue";
import CancelIcon from "../components/icons/CancelIcon.vue";
import {Person} from "../models/Person.js";
import ArrowBack from "../components/icons/ArrowBack.vue";

const add = ref(false), gifts = useGiftsStore();


onMounted(() => {
  gifts.person = Person.findById(useRoute().params.id);
})


</script>

<template>
  <div v-if="gifts.person" class="h-full w-full">
    <div class="h-[100%] max-h-[100%] w-[100%] p-5" id="gifts">
      <div class="absolute top-0 left-0 z-10 w-full h-[245px] bg-gradient-to-r from-sky-500 to-sky-900"></div>
      <header class="relative z-20">
        <nav>
          <RouterLink :to="{name: 'home'}"
                      class="inline-block items-center font-base bg-transparent hover:bg-white text-white hover:text-neutral-600 py-2 px-3 rounded">
            <ArrowBack size="20" class="me-1 inline-block align-middle"/>
            <span class="align-middle">Retour</span>
          </RouterLink>
        </nav>
        <div class="flex flex-col items-center mb-4">
          <h1 class="text-3xl text-white font-semibold pb-8">
            Profil
          </h1>
          <div class="rounded-full w-[160px] h-[160px] overflow-hidden">
            <img :alt="gifts.person.name" :src="gifts.person.photo" class="object-center object-cover w-full h-full">
          </div>
        </div>

        <div class="text-center">
          <h2 class="text-3xl font-semibold text-black">{{ gifts.person.name }}</h2>
          <h3 class="text-base font-semibold text-black">{{ gifts.person.birthdayFr }}</h3>
          <form id="search-form" class="mt-8 mb-3 relative">
            <input
                class="app-input" type="search" name="q"
                placeholder="Rechercher par cadeau ou année"
                v-model="gifts.search"
                @focus="add = false">
            <span class="search-icon" @click="gifts.search = ''">
              <SearchIcon v-if="!gifts.search" fill="#bdbdbd"/>
              <CancelIcon :size="32" v-else class="text-neutral-800"/>
          </span>
          </form>
        </div>
      </header>

      <div
          class="person-list mx-auto flex flex-col py-6 pe-4 h-[calc(100vh-260px)] max-h-[calc(100vh-260px)] overflow-y-auto">

        <div v-if="gifts.all.length === 0" class="flex justify-center content-center my-auto">
          Vous n'avez ajouté de cadeaux
        </div>
        <ul v-else class="w-full mx-auto">
          <li v-for="gift in gifts.value" class="li-list-item h-[50px] items-center overflow-hidden">
            <div class="rounded-full p-2 bg-sky-500"></div>
            <div class="ms-[10px] flex items-center">
              {{ gift.description }}
            </div>
            <div class="text-sm text-neutral-500 ms-auto w-[75px] text-end">
              {{ gift.annee }}
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
  <NotFoundView v-else/>
</template>
<style scoped>


</style>