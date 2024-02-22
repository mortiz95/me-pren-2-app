<template>
  <ion-chip 
    v-for="option in chips"
    :key="option.value"
    @click="emitTagClicked(option)" 
    color="dark" 
    class="ion-text-center chips mr-5"
    :class="{ 'selected': isSelected(option) }"
  >
  <div>
    {{ option.text }}
  </div>
    <ion-icon v-if="option.icon" :icon="option.icon"></ion-icon>
  </ion-chip>
</template>
  
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  chips: {
    type: Array as () => Array<{ value: string, text: string, icon: string  }>,
    required: true
  },
  chipSelected : {
    type: Object,
    required: false
  }
});

const selectedOption = ref<string | null>(null);
selectedOption.value = props.chipSelected?.value;

const emits = defineEmits(['tagClicked']);

const emitTagClicked = (option: { value: any, text: string, icon: string }) => {
  selectedOption.value = option.text;
  emits('tagClicked', option);
};

const isSelected = (option: { value: any, text: string }) => {
  return selectedOption.value === option.text || selectedOption.value == option.value ;
};
</script>

<style scoped>

ion-icon {
  margin-left: 3px;
}
.selected {
  color: var(--rose) !important;
  background: var(--black) !important;
}

</style>
