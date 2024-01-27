<template>
    <div class="scrollable-container">
      <div class="scrollable-content ion-padding" ref="contentRef">
        <div
          v-for="day in next30Days"
          :key="day"
          class="day-box ion-text-center"
          @click="selectDay(day)"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  import { ref, onMounted } from 'vue';
  
  const contentRef: any = ref(null);
  const next30Days: any = ref([]);
  const selectedDay = ref(null);
  
  onMounted(() => {
    generateNext30Days();
    scrollToToday();
  });
  
  const generateNext30Days = () => {
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      next30Days.value.push(formatDate(nextDay));
    }
  };
  
  const formatDate = (date: any) => {
    const options = { day: '2-digit', month: 'short' };
    return date.toLocaleDateString('es', options);
  };
  
  const scrollToToday = () => {
    const today = new Date();
    const todayIndex = today.getDate() - 1; // Adjust to zero-based index
    const dayBox = contentRef.value.children[todayIndex];
    if (dayBox) {
      dayBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectDay = (index: any) => {
    alert(index)
    selectedDay.value = index;
  };
  </script>
  
  <style scoped>
  .scrollable-container {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer */
  }
  
  .scrollable-content {
    display: flex;
  }
  
  .day-box {
    min-width: 50px !important;
    height: 60px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 10px;
    background: var(--light-black);
    padding:2px;
  }

.scrollable-container::-webkit-scrollbar {
  display: none; /* Webkit browsers */
}

  </style>
  