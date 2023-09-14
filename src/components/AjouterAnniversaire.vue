<script setup>
import {
  Datepicker,
  Input,
  initTE,
} from "tw-elements";


import {onMounted, ref, watch} from "vue";
import FileIcon from "./icons/FileIcon.vue";
import ButtonComponent from "./ButtonComponent.vue";
import {Person} from "../models/Person.js";

const
    inputDate = ref(null),
    form = ref(null),
    btn = ref(true),
    labelFile = ref('Ajouter une image'),
    emit = defineEmits(['hide']),
    reValidDate = /^\d{2}[\/-]\d{2}[\/-]\d{4}$/;

function resetLabel() {
  labelFile.value = 'Ajouter une image';
}

function fileChange(e) {
  const
      fileInfo = e.target.files[0],
      label = e.target.parentElement.querySelector('.placeholder');

  e.target.value = '';
  if (fileInfo?.type.includes('image/')) {
    label.classList.add('text-neutral-600');
    labelFile.value = fileInfo.name;
  } else {
    label.classList.remove('text-neutral-600');
    resetLabel();
  }

  console.debug('file', fileInfo);
}

function onSubmit(e) {
  e.preventDefault();
  const
      form = e.target.closest('form'),
      formData = Object.fromEntries(new FormData(form));


  let {name, birthday} = formData;
  btn.value = true;
  if (!reValidDate.test(birthday)) {
    return;
  }

  birthday = new Date(birthday.split('/').reverse().join('-'));


  if ((new Date).getTime() <= birthday.getTime()) {
    return;
  }

  try {

    //manage file here
    Person.add({
      name, birthday
    });
    emit('hide');
    form.reset();

  } catch (err) {

  }

}

function onChange() {
  btn.value = true;
  if (form.value.checkValidity()) {
    const {birthday} = Object.fromEntries(new FormData(form.value));
    if (reValidDate.test(birthday)) {
      btn.value = null;
    }
  }
}


onMounted(() => {
  initTE({Datepicker, Input});
  new Datepicker(inputDate.value, {
    disableFuture: true
  });

});
</script>

<template>
  <form id="add-person-form" class="flex flex-col w-full h-full items-center p-4" ref="form" @submit="onSubmit">
    <h2 class="mb-8">Ajouter un anniversaire</h2>

    <div class="form-group w-full mb-6">
      <label for="name" class="px-6">
        Nom
      </label>

      <input
          class="app-input"
          placeholder="Saisissez un nom"
          @input="onChange"
          name="name"
          id="name"
          required
      >
    </div>

    <div class="form-group w-full mb-6 ">
      <label for="birthday" class="px-6">
        Date de naissance
      </label>
      <div
          ref="inputDate"
          data-te-datepicker-init
          data-te-input-wrapper-init
          data-te-format="dd/mm/yyyy"
          class="relative rounded-[100px] overflow-hidden">
        <input
            class="app-input"
            placeholder="Saisissez une date de naissance"
            type="text"
            @input="onChange"
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

    <ButtonComponent type="submit" class="w-full rounded-[100px] min-h-[50px] my-4" :disabled="btn" :atclick="onSubmit">
      Ajouter
    </ButtonComponent>

  </form>
</template>

<style lang="scss" scoped>


</style>