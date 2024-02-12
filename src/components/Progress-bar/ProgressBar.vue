<template>
    <ion-grid>
      <ion-row>
        <ion-col size="6">
          <div>Confirmados: {{ totalUsersIdAttending }}</div>
        </ion-col>
        <ion-col size="6" class="ion-text-end">
          <div>Lugar libres: {{ calculateFreeSpots }}</div>
        </ion-col>
        <ion-col size="12">
          <div class="progress-bar">
            <span
              class="progress-bar-fill"
              :style="{ width: calculateProgressBarWidth }"
            ></span>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
</template>
  
  <script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const props = defineProps<{
  searchSpots: any;
  totalUsersIdAttending: any;
}>();

const calculateProgressBarWidth = computed(() => {
  return `${(props.totalUsersIdAttending / props.searchSpots) * 100}%`;
});

const calculateFreeSpots = computed(() => {
  return props.searchSpots - props.totalUsersIdAttending;
});

onMounted(() => {});
</script>
  
  <style scoped>
.progress-bar {
  width: 100%;
  background-color: var(--gray);
  padding: 1px;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.progress-bar-fill {
  display: block;
  height: 5px;
  background-color: var(--ion-color-primary);
  border-radius: 3px;
  transition: width 500ms ease-in-out;
}
</style>
  