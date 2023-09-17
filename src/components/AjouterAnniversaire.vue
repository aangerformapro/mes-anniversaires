<script setup>
import {
  Datepicker,
  Input,
  initTE,
} from "tw-elements";


import {onMounted, ref, unref, watch} from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import {Person} from "../models/Person.js";
import {DATE_DEFAULT_CONFIG} from "../../assets/utils/date-manager.js";
import kit from "../stores/photos.js";
import {uuidv4} from "../../assets/utils/utils.mjs";
import FileInput from "./FileInput.vue";
import Spinner from "./Spinner.vue";

const
    fInput = ref(null),
    inputDate = ref(null),
    form = ref(null),
    btn = ref(true),
    loading = ref(false),
    emit = defineEmits(['hide']),
    reValidDate = /^([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[1-2][0-9]{3}$/,
    dateInput = ref(null);

watch(dateInput, (val, prev) => {

  if ((prev || '').endsWith('/')) {
    return;
  }
  if (/^([0-2][0-9]|3[0-1])(\/(0[1-9]|1[0-2]))?$/.test(val || '')) {
    dateInput.value += '/';
  }

});


function fileChange(target) {
  if (!(target.files[0]?.type.includes('image/'))) {
    target.value = '';
    unref(fInput).resetAll();
  }
}


function onSubmit(e) {
  e.preventDefault();
  const
      form = e.target.closest('form'),
      formData = Object.fromEntries(new FormData(form)),
      addPerson = ({name, birthday, photo}) => {
        photo ??= null;
        Person.add({name, birthday, photo});
        emit('hide');
        form.reset();
      };


  let {name, birthday} = formData;
  btn.value = true;
  if (!reValidDate.test(birthday)) {
    return;
  }

  birthday = new Date(birthday.split('/').reverse().join('-'));

  if ((new Date).getTime() <= birthday.getTime()) {
    return;
  }

  loading.value = true;

  if (formData.photo.size > 0 && formData.photo.type.includes('image/')) {
    const fileName = uuidv4() + '.' + formData.photo.name.split('.').pop();
    return kit.upload({
      file: formData.photo,
      fileName,
      useUniqueFileName: true,
      tags: ['birthday', 'profile'],
      folder: 'bmanager'
    }).then(result => {
      if (result.url) {
        return addPerson({name, birthday, photo: result.url});
      }
      throw new Error('Cannot upload ' + formData.photo.name);
    }).catch(() => {
      loading.value = false;
      unref(fInput).setErrorMode('Une erreur s\'est produite');
      setTimeout(() => {
        unref(fInput).resetAll();
      }, 2000);
    });
  }
  addPerson({name, birthday});
  form.reset();
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

function formReset() {
  btn.value = true;
  loading.value = false;
  dateInput.value = '';
}


onMounted(() => {
  initTE({Datepicker, Input});

  Datepicker.getOrCreateInstance(inputDate.value).update(
      {
        ...DATE_DEFAULT_CONFIG.datePicker,
        disableFuture: true,
        disableInput: true
      }
  );


});
</script>

<template>
  <form
      @reset="formReset"
      id="add-person-form"
      class="flex flex-col w-full h-full items-center p-4 "
      ref="form"
      @change="onChange"
      @submit="onSubmit">
    <h2 class="mb-8">Ajouter un anniversaire</h2>

    <div class="absolute right-8 top-8 z-20">
      <Spinner :loading="loading"/>
    </div>


    <div class="form-group w-full mb-6">
      <label for="name" class="px-6">
        Nom
      </label>

      <input
          class="app-input"
          placeholder="Saisissez un nom *"
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
          class="relative rounded-[100px] overflow-hidden">
        <input
            v-model="dateInput"
            class="app-input"
            placeholder="dd/mm/yyyy *"
            type="text"
            @input="onChange"
            name="birthday"
            id="birthday"
            pattern="^([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[1-2][0-9]{3}$"
            required>
      </div>

    </div>

    <FileInput
        name="photo"
        placeholder="Ajouter une image"
        accept="image/*"
        label="Photo"
        ref="fInput"
        @afterChange="fileChange"/>

    <ButtonComponent type="submit" class="w-full rounded-[100px] min-h-[50px] my-4" :disabled="btn" :atclick="onSubmit">
      Ajouter
    </ButtonComponent>

  </form>
</template>

<style scoped>


</style>