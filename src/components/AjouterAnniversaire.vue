<script setup>
import {
  Datepicker,
  Input,
  initTE,
} from "tw-elements";


import {onMounted, ref} from "vue";

const name = ref(''), birthday = ref(''), photo = ref();
onMounted(()=>{
  initTE({ Datepicker, Input });
});
</script>

<template>
  <form id="add-person-form" class="w-full p-4">
    <h2 class="mb-[120px]">Ajouter un anniversaire</h2>

    <div class="form-group w-full mb-6">
      <label for="name" class="px-6">
        Nom
      </label>
      <input
          class="app-input"
          placeholder="Saisissez un nom"
          v-model="name"
          name="name"
      >
    </div>

  <div

      class="form-group w-full mb-6 ">
    <label for="birthday" class="px-6">
      Date de naissance
    </label>
    <div data-te-datepicker-init
         data-te-input-wrapper-init class="relative rounded-[100px] overflow-hidden">
      <input
          class="app-input"
          placeholder="Saisissez une date de naissance"
          v-model="birthday"
          name="birthday"
      >
    </div>

  </div>


    <div class="form-group w-full mb-6" >
      <label for="photo" class="px-6">
        Photo
      </label>
      <input
          type="file"
          class="app-input"
          placeholder="Ajouter une image"

          name="photo"
      >
    </div>


  </form>
</template>

<style lang="scss" scoped>


</style>