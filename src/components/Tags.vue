<template>
  <ion-badge 
    v-for="option in tags"
    :key="option.value"
    @click="emitTagClicked(option)" 
    color="dark" 
    class="ion-text-center tags"
    :class="{ 'selected': isSelected(option) }"
  >
  <div>
    {{ option.text }}
  </div>
    <ion-icon v-if="option.icon" :icon="option.icon"></ion-icon>
  </ion-badge>
</template>
  
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  tags: {
    type: Array as () => Array<{ value: any, text: string, icon?: string }>,
    required: true
  }
});

const selectedOption = ref<string | null>(null);

const emits = defineEmits(['tagClicked']);

const emitTagClicked = (option: { value: any, text: string }) => {
  selectedOption.value = option.text;
  emits('tagClicked', option.text);
};

const isSelected = (option: { value: any, text: string }) => {
  return selectedOption.value === option.text;
};
</script>

<style scoped>
ion-badge {
  font-size: 12px;
  padding: 5px;
  display: inline-flex;
}

ion-icon{
  margin-left: 3px;
}

.selected {
  color: var(--rose) !important;
}

.tags {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
