<script setup>

import {onMounted, ref, unref, watch} from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import {Select, initTE, Input} from "tw-elements";
import {isEmpty} from "@/modules/utils";
import {Gift, Person} from "../stores";
import {useRoute} from "vue-router";

const
    form = ref(null),
    disabled = ref(true),
    years = ref([]),
    select = ref(null),
    person = ref(null),
    route = useRoute(),
    emit = defineEmits(['hide']);


watch(select, select => {
  if (select) {
    Select.getOrCreateInstance(unref(select));
  }

});


watch(person, /** @type {Person} */p => years.value = p.years.map(y => '' + y));

function validateFields(data) {
  data ??= Object.fromEntries(new FormData(unref(form)));
  return unref(years).includes(data.annee) && !isEmpty(data.description);
}

function onChange() {
  disabled.value = true;
  if (validateFields()) {
    disabled.value = null;
  }
}


function onSubmit(e) {
  e.preventDefault();
  disabled.value = true;

  const data = Object.fromEntries(new FormData(e.target.closest('form')));
  if (validateFields(data)) {
    data.id_person = person.value;
    try {
      Gift.add(data);
      unref(form).reset();
      emit('hide');
    } catch (err) {

    }
  }

}

function onReset() {
  disabled.value = true;
}


onMounted(() => {
  initTE({Select, Input});
  person.value = Person.findById(route.params.id);
});


</script>

<template>
  <form
      @reset="onReset"
      id="add-gift-form"
      class="flex flex-col w-full h-full items-center p-4"
      ref="form"
      @change="onChange"
      @submit="onSubmit">
    <h2 class="mb-8">Ajouter un cadeau</h2>


    <div class="form-group w-full mb-6" v-if="years.length > 0">
      <label for="annee" class="px-6">
        Année
      </label>

      <div class="relative rounded-[100px] overflow-hidden">
        <select

            data-te-select-placeholder="Sélectionner une année *"
            data-te-select-search-placeholder="Rechercher ..."
            data-te-select-filter="true"
            data-te-class-select-arrow="absolute right-3 text-[0.8rem] cursor-pointer peer-focus:text-primary peer-data-[te-input-focused]:text-primary group-data-[te-was-validated]/validation:peer-valid:text-green-600 group-data-[te-was-validated]/validation:peer-invalid:text-[rgb(220,76,100)] w-5 h-5 top-[15px]"
            data-te-class-select-input="app-input cursor-pointer"
            ref="select" name="annee" id="annee">
          <option v-for="year in years" :value="year">{{ year }}</option>
        </select>
      </div>


    </div>


    <div class="form-group w-full mb-6">
      <label for="name" class="px-6">
        Cadeau
      </label>

      <input
          class="app-input"
          placeholder="Saisissez un cadeau *"
          @input="onChange"
          name="description"
          id="description"
          required
      >
    </div>


    <ButtonComponent type="submit" class="w-full rounded-[100px] min-h-[50px] my-4" :disabled="disabled"
                     :atclick="onSubmit">
      Ajouter
    </ButtonComponent>
  </form>
</template>

<style scoped>

</style>