<script setup>
import FileIcon from "./icons/FileIcon.vue";
import {onBeforeMount, ref, unref} from "vue";
import {uniqid} from "@/modules/utils";

const
    root = ref(null),
    input = ref(null),
    placeholder = ref(null),
    props = defineProps(['label', 'accept', 'placeholder', 'name']),
    emit = defineEmits(['afterChange', 'afterReset']),
    DEFAULT_PLACEHOLDER = 'Sélectionner un fichier',
    uid = 'file-' + uniqid();


let accept, name, label;


function onChange({target}) {

  const file = target.files[0];
  resetColors();

  if (!file.size) {
    target.value = '';
    return resetPlaceholder();
  }

  placeholder.value = file.name;
  unref(root).classList.add('text-neutral-600');
  emit('afterChange', target);
}

function setErrorMode(message = '') {
  resetColors();
  if (message) {
    placeholder.value = message;
  }
  unref(root).classList.add('text-red-700')
}

function resetPlaceholder() {
  placeholder.value = props.placeholder || DEFAULT_PLACEHOLDER;
}

function resetColors() {
  unref(root).classList.remove('text-red-700', 'text-neutral-600');
}

function resetAll() {
  unref(input).value = '';
  resetColors();
  resetPlaceholder();
}

function onReset({target}) {
  resetAll();
  emit('afterReset', target);
}


defineExpose({
  resetAll, resetColors, resetPlaceholder, setErrorMode, input, root
});


onBeforeMount(() => {
  accept = props.accept || '';
  name = props.name || 'file';
  label = props.label;
  resetPlaceholder();
});

</script>

<template>
  <div class="form-group w-full mb-6 relative">
    <div class="px-6 capitalize" v-if="label">
      {{ label }}
    </div>
    <input
        ref="input"
        type="file"
        :accept="accept"
        class="file-input"
        placeholder="Ajouter un fichier"
        :name="name"
        :id="uid"
        @change="onChange"
        @reset="onReset"
    >
    <label :for="uid" class="app-input flex items-center">
        <span class="placeholder flex items-center" ref="root">
          <FileIcon class="me-3"/>
          {{ placeholder }}
        </span>
    </label>
  </div>
</template>

<style scoped>

</style>