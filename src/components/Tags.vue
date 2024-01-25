<template>
    <ion-item @click="emitTagClicked()" :button="false" lines="inset" class="mb-10">
      <ion-badge color="danger">{{ badgeValue }}</ion-badge>
    </ion-item>
  </template>
  
  <script setup lang="ts">
  
  // Define props
  const props = defineProps({
    badgeValue: {
      type: String,
      required: true
    }
  });

  const emits = defineEmits(['tagClicked']);

  const emitTagClicked = () => {
    emits('tagClicked', props.badgeValue);
    
};
  
  </script>
  