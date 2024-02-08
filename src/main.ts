import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

/* Pinia */
import { createPinia } from 'pinia';

/* Ionic components */
 import {
  IonPage,IonContent,IonHeader,IonGrid,IonRow,IonCol,IonToolbar,IonIcon,IonButton,
  IonFabButton,IonItem,IonToggle,IonList,IonSelect,IonSelectOption,IonLabel,
  IonCard,IonSpinner,IonInput,IonText,IonDatetimeButton, IonModal, IonDatetime,
  IonButtons, IonTitle, IonBadge, IonToast, IonTextarea, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonicVue, IonSegment, IonSegmentButton, IonAccordion, IonAccordionGroup,
  IonAvatar
} from "@ionic/vue"; 

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const pinia = createPinia();

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  app.component('ion-page', IonPage)
  app.component('ion-content', IonContent)
  app.component('ion-header', IonHeader)
  app.component('ion-grid', IonGrid)
  app.component('ion-row', IonRow)
  app.component('ion-col', IonCol)
  app.component('ion-toolbar', IonToolbar)
  app.component('ion-icon', IonIcon)
  app.component('ion-button', IonButton)
  app.component('ion-fab-button', IonFabButton)
  app.component('ion-item', IonItem)
  app.component('ion-toggle', IonToggle)
  app.component('ion-list', IonList)
  app.component('ion-select', IonSelect)
  app.component('ion-select-option', IonSelectOption)
  app.component('ion-label', IonLabel)
  app.component('ion-card', IonCard)
  app.component('ion-spinner', IonSpinner)
  app.component('ion-input', IonInput)
  app.component('ion-text', IonText)
  app.component('ion-datetime-button', IonDatetimeButton)
  app.component('ion-datetime', IonDatetime)
  app.component('ion-modal', IonModal)
  app.component('ion-buttons', IonButtons)
  app.component('ion-title', IonTitle)
  app.component('ion-badge', IonBadge)
  app.component('ion-toast', IonToast)
  app.component('ion-textarea', IonTextarea)
  app.component('ion-card-content', IonCardContent)
  app.component('ion-card-header', IonCardHeader)
  app.component('ion-card-title', IonCardTitle)
  app.component('ion-card-subtitle', IonCardSubtitle)
  app.component('ion-segment', IonSegment)
  app.component('ion-segment-button', IonSegmentButton)
  app.component('ion-accordion', IonAccordion)
  app.component('ion-accordion-group', IonAccordionGroup)
  app.component('ion-avatar', IonAvatar)
  

router.isReady().then(() => {
  app.mount('#app');
});