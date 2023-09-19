<script setup>
import {usePersonsStore} from "@/stores";
import ButtonComponent from "../components/ButtonComponent.vue";
import AddIcon from "../components/icons/AddIcon.vue";
import {ref} from "vue";
import AjouterAnniversaire from "../components/AjouterAnniversaire.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import CancelIcon from "../components/icons/CancelIcon.vue";
import SlideInForm from "../components/SlideInForm.vue";
import PillComponent from "../components/PillComponent.vue";
import CakeIcon from "../components/icons/CakeIcon.vue";
import AgeIcon from "../components/icons/AgeIcon.vue";
import GiftIcon from "../components/icons/GiftIcon.vue";
import ActionButton from "../components/ActionButton.vue";
import AboutIcon from "../components/icons/AboutIcon.vue";
import {useRouter} from "vue-router";

const peoples = usePersonsStore();

const
    add = ref(false),
    form = ref(null),
    router = useRouter();

function clickButton() {
  add.value = !add.value;
}

function resetInput() {
  peoples.search = '';
}

function aboutButtonClick() {
  router.push({name: 'about'});
}

</script>

<template>
  <div class="h-full w-full">
    <div class="h-[100%] max-h-[100%] w-[100%] p-5">
      <header class="h-[160px] relative">
        <h1 class="mx-auto max-w-[200px] text-center mb-6">Mes Anniversaires</h1>
        <form id="search-form" class="mb-3 relative">
          <input class="app-input" type="search" name="q" placeholder="Rechercher une personne" v-model="peoples.search"
                 @focus="add = false">
          <span class="search-icon" @click="resetInput">
            <SearchIcon v-if="!peoples.search" class="text-stone-300"/>
            <CancelIcon :size="32" v-else class="text-neutral-800"/>
          </span>
        </form>
        <div class="absolute right-[-10px] top-[-10px]">
          <ActionButton title="A Propos" @click="aboutButtonClick">
            <AboutIcon size="16"/>
          </ActionButton>
        </div>
      </header>
      <div
          class="person-list mx-auto flex flex-col pb-6 pe-4 h-[calc(100vh-260px)] max-h-[calc(100vh-260px)] overflow-y-auto">

        <div v-if="peoples.all.length === 0" class="flex justify-center content-center my-auto">
          Vous n'avez ajouté personne
        </div>
        <ul v-else class="w-full mx-auto">
          <li v-for="person in peoples.value" class="li-list-item">
            <RouterLink :to="{ name: 'profile', params: { id: person.id }}"
                        class="flex items-center flex-nowrap w-full max-h-[64px]">
              <div class="w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                <img :alt="person.name" :src="person.photo" class="object-cover object-center w-full h-full">
              </div>
              <div class="flex flex-col justify-center ms-[10px] h-full">
                <h4 class="text-sm sm:text-base max-sm:text-xs text-sky-400 font-bold">{{ person.name }}</h4>
                <div class="text-xs md:text-sm text-neutral-500">
                  {{ person.nextDaysIntl }}
                </div>
              </div>
              <div class="flex flex-col items-end justify-center ms-auto">
                <PillComponent>
                  <CakeIcon size="16" class="me-1"/>
                  {{ person.birthdayFr }}
                </PillComponent>
                <div class="flex w-full my-1">
                  <PillComponent class="w-[calc(50%-2px)]">
                    <AgeIcon size="16" class="me-1"/>
                    {{ person.age }}
                  </PillComponent>
                  <PillComponent class="ms-1  w-[calc(50%-2px)]">
                    <GiftIcon size="16" class="ms-1"/>
                    {{ person.gifts.length }}
                  </PillComponent>
                </div>
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
  </div>
</template>

<style lang="scss" scoped>


</style>