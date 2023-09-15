<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {Person} from "../models/Person.js";
import NotFoundView from "./NotFoundView.vue";
import {useGiftsStore} from "../stores/gifts.js";
import SearchIcon from "../components/icons/SearchIcon.vue";
import CancelIcon from "../components/icons/CancelIcon.vue";

const add = ref(false);

let
    id = useRoute().params.id ,
    gifts = useGiftsStore();

onMounted(()=>{
  gifts.person = Person.findById(id);
});
</script>


<template >
  <div v-if="gifts.person" class="h-[100%] max-h-[100%] w-[100%] p-5">
    <header>
      <nav>
        <RouterLink :to="{name: 'home'}">
          Retour
        </RouterLink>
      </nav>
      <h1>
        Profil
      </h1>
      <div class="profile-picture">
        <img :alt="gifts.person.name" :src="gifts.person.photo">
      </div>
      <div class="heading">
        <h2>{{gifts.person.name}}</h2>
        <h3>{{gifts.person.birthdayFr}}</h3>
        <form id="search-form" class="mb-3 relative">
          <input
              class="app-input" type="search" name="q"
              placeholder="Rechercher un cadeau"
              v-model="gifts.search"
              @focus="add = false">
            <span class="search-icon" @click="gifts.search = ''">
              <SearchIcon v-if="!gifts.search" fill="#bdbdbd"/>
              <CancelIcon :size="32" v-else class="text-neutral-800"/>
          </span>
        </form>
      </div>
    </header>

    <div class="person-list mx-auto flex flex-col p-6 h-[calc(100vh-260px)] max-h-[calc(100vh-260px)] overflow-y-auto">

      <div v-if="gifts.all.length === 0" class="flex justify-center content-center my-auto">
        Vous n'avez ajouté de cadeaux
      </div>
      <ul v-else class="w-full mx-auto">
        <li v-for="gift in gifts.all" class="li-list-item h-[50px] items-center overflow-hidden">
            <div class="rounded-full p-2 bg-sky-500"></div>
            <div class="ms-4 flex items-center">
              {{ gift.description }}
            </div>
            <div class="text-sm text-neutral-500 ms-auto min-w-[50px] w-[10%]">
              {{ gift.annee }}
            </div>
        </li>
      </ul>
    </div>




  </div>
  <NotFoundView v-else/>
</template>
<style scoped>

</style>