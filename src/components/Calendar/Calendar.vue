<template>
    <div class="scrollable-container">
      <div class="scrollable-content ion-padding ion-text-capitalize" ref="contentRef">
        <div
          v-for="(day, index) in next30Days"
          :key="index"
          class="day-box ion-text-center"
          @click="selectDay(day)"
          :class="{ 'selected': isSelected(day)}"
        >
         <div class="ion-padding">
          {{ day }}
         </div> 
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  import { ref, onMounted } from 'vue';
  
  const contentRef: any = ref(null)
  const next30Days: any = ref([])
  const today = new Date()
  const selectedDay = ref()

  onMounted(() => {
    generateNext30Days();
    scrollToToday();
    selectedDay.value = formatDate(today) // set today as default
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
  const today = new Date();
  let options : any = { day: '2-digit' };
  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth()) {
    return `Hoy ${date.toLocaleDateString('es', options)}`;
  } else {
    options['weekday'] = 'short';
    return date.toLocaleDateString('es', options);
  }
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
    selectedDay.value = index;
  };

  const isSelected = (day: any) => {
  return selectedDay.value === day;
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
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 10px;
    background: var(--black);
    padding:2px;
  }

.scrollable-container::-webkit-scrollbar {
  display: none; /* Webkit browsers */
}

.selected {
  color: var(--rose) !important;
  border-color: var(--white) !important;
  background: var(--black) !important;
  opacity: 0.5 ;
}

  </style>
  