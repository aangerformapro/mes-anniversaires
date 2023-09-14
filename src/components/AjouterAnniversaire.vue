<script setup>
import {
  Datepicker,
  Input,
  initTE,
} from "tw-elements";


import {onMounted, ref, watch} from "vue";
import FileIcon from "./icons/FileIcon.vue";
import ButtonComponent from "./ButtonComponent.vue";

const name = ref(''),
    birthday = ref(''),
    photo = ref(null),
    form = ref(null),
    btn = ref(true),
    labelFile = ref('Ajouter une image');

function resetLabel(){
  labelFile.value = 'Ajouter une image';
}
function fileChange(e){
  const fileInfo = e.target.files[0];
  if(fileInfo?.type.includes('image/')){
    labelFile.value = fileInfo.name;
  }else {
    e.target.value = '';
    resetLabel();
  }
}

function onSubmit(e){
  e.preventDefault();
  const formData = new FormData(e.target);
}

function onChange(){
  btn.value = true;
  if(form.value.checkValidity()){
    if(/^\d+\/\d+\/\d{4}$/.test(birthday.value)){


      btn.value = null;
    }
  }
}



watch(name, onChange);
watch(birthday, onChange);

onMounted(()=>{
  initTE({ Datepicker, Input });
});
</script>

<template>
  <form id="add-person-form" class="flex flex-col w-full h-full items-center p-4" ref="form" @submit="onSubmit">
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
          id="name"
          required
      >
    </div>

  <div class="form-group w-full mb-6 ">
    <label for="birthday" class="px-6">
      Date de naissance
    </label>
    <div data-te-datepicker-init
         data-te-input-wrapper-init class="relative rounded-[100px] overflow-hidden">
      <input
          class="app-input"
          placeholder="Saisissez une date de naissance"
          v-model="birthday"
          @change="onChange"
          name="birthday"
          id="birthday"
          required
      >
    </div>

  </div>


    <div class="form-group w-full mb-6 relative">
      <div class="px-6">
        Photo
      </div>
      <input
          type="file"
          accept="image/*"
          class="file-input"
          placeholder="Ajouter une image"
          name="photo"
          id="photo"
          v-on:change="fileChange"
      >
      <label for="photo" class="app-input flex items-center">
        <span class="placeholder flex items-center">
          <FileIcon class="me-3"/>
          {{ labelFile }}
        </span>
      </label>
    </div>


    <ButtonComponent type="submit" class="w-full rounded-[100px] h-[50px] mt-4" :disabled="btn">
      Ajouter
    </ButtonComponent>



  </form>
</template>

<style lang="scss" scoped>


</style>