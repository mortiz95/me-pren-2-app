<template>
    <ion-grid class="ion-no-padding">
      <ion-row>
        <ion-col size="6">
          <ion-text>Confirmados: {{ totalUsersIdAttending }} / {{ searchSpots }} </ion-text>
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

onMounted(() => {});
</script>
  
  <style scoped>

  ion-text{
    color: var(--white)
  }
.progress-bar {
  width: 100%;
  background-color: var(--gray);
  padding: 1px;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-top:5px;
}

.progress-bar-fill {
  display: block;
  height: 5px;
  background-color: var(--white);
  border-radius: 3px;
  transition: width 500ms ease-in-out;
}
</style>
  