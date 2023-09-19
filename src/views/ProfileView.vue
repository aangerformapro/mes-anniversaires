<script setup>

import {onMounted, ref, unref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import NotFoundView from "./NotFoundView.vue";
import {useGiftsStore} from "@/stores";
import SearchIcon from "../components/icons/SearchIcon.vue";
import CancelIcon from "../components/icons/CancelIcon.vue";
import {Person} from "../stores";
import SlideInForm from "../components/SlideInForm.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import GiftIcon from "../components/icons/GiftIcon.vue";
import AjouterCadeau from "../components/AjouterCadeau.vue";
import CakeIcon from "../components/icons/CakeIcon.vue";
import AgeIcon from "../components/icons/AgeIcon.vue";
import ScheduleIcon from "../components/icons/ScheduleIcon.vue";
import PillComponent from "../components/PillComponent.vue";
import TrashIcon from "../components/icons/TrashIcon.vue";
import Dialog from "../modules/utils/dialog";
import ActionButton from "../components/ActionButton.vue";
import BackButton from "../components/BackButton.vue";


const
    hasBirthdays = ref(true),
    add = ref(false),
    form = ref(null),
    gifts = useGiftsStore(), router = useRouter();


function removeProfile() {
  Dialog.confirm('Voulez-vous supprimer le profil de ' + gifts.person.name)
      .then(result => {
        if (true === result) {
          Person.remove(unref(gifts.person));
          router.replace({name: 'home'});
        }
      });
}


onMounted(() => {
  const person = Person.findById(useRoute().params.id);
  gifts.person = person;
  hasBirthdays.value = person.years.length > 0;
});


</script>

<template>
  <div v-if="gifts.person" class="h-full w-full">
    <div class="h-[100%] max-h-[100%] w-[100%] p-5 pt-0">
      <div class="absolute top-0 left-0 z-10 w-full h-[128px] md:h-[160px] bg-gradient-to-r from-sky-500 to-sky-900">
        <div
            class="text-base font-semibold text-black flex items-center justify-center absolute right-2 top-2 flex-col">

          <PillComponent class="w-[130px]">
            <CakeIcon size="24" class="me-2"/>
            {{ gifts.person.birthdayFr }}
          </PillComponent>

          <PillComponent class="w-[130px] mt-1 lg:mt-2">
            <AgeIcon size="24" class="me-2"/>
            {{ gifts.person.age }}
          </PillComponent>

          <PillComponent class="w-[130px] mt-1 lg:mt-2">
            <ScheduleIcon size="24" class="me-2"/>
            {{ gifts.person.nextDays }}
          </PillComponent>

        </div>
      </div>
      <header class="relative z-20 h-[285px] md:h-[320px]">
        <nav class="absolute top-0 left-0 pt-2 z-[100]">
          <BackButton/>
        </nav>
        <div class="flex flex-col items-center mb-3 pt-8 relative">
          <div
              class="rounded-full w-[128px] md:w-[160px] h-[128px] max-sm:w-[96px] max-sm:h-[96px] max-sm:my-4 md:h-[160px] overflow-hidden bg-sky-50 border">
            <img :alt="gifts.person.name" :src="gifts.person.photo" class="object-center object-cover w-full h-full">
          </div>
          <div class="absolute right-[-12px] bottom-[-12px]">
            <ActionButton @click="removeProfile" title="Supprimer profil">
              <TrashIcon/>
            </ActionButton>
          </div>
        </div>

        <div class="text-center">
          <h2 class="text-3xl font-semibold text-black">
            {{ gifts.person.name }}
          </h2>
          <form id="search-form" class="mt-6 mb-3 relative">
            <input
                class="app-input" type="search" name="q"
                placeholder="Rechercher par cadeau ou année"
                v-model="gifts.search"
                @focus="add = false">
            <span class="search-icon" @click="gifts.search = ''">
              <SearchIcon v-if="!gifts.search" class="text-stone-300"/>
              <CancelIcon :size="32" v-else class="text-neutral-800"/>
          </span>
          </form>
        </div>
      </header>

      <div
          class="gift-list mx-auto flex flex-col py-6 pe-4 h-[calc(100vh-385px)] max-h-[calc(100vh-385px)] md:h-[calc(100vh-420px)] md:max-h-[calc(100vh-420px)] overflow-y-auto">
        <div v-if="! hasBirthdays" class="flex justify-center content-center my-auto">
          Cette personne n'à pas eu d'anniversaire
        </div>
        <div v-else-if="gifts.all.length === 0" class="flex justify-center content-center my-auto">
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

      <div class="absolute bottom-[10px] w-[calc(100vw-40px)] max-w-[984px] h-[68px] pt-2"
           v-if="hasBirthdays">
        <ButtonComponent
            :atclick="()=>add = true"
            class="flex justify-center items-center text-center w-full h-full uppercase">
          <GiftIcon class="me-2" :size="20"/>
          Ajouter un cadeau
        </ButtonComponent>
      </div>

    </div>

    <SlideInForm :show="add" @hide="add = false" class="max-h-[500px]">
      <AjouterCadeau @hide="add = false"/>
    </SlideInForm>


  </div>
  <NotFoundView v-else/>
</template>
<style scoped>


</style>