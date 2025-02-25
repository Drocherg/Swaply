<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="transparent-toolbar">
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <div id="container" class="animate-fade-in">
        <strong class="logo-text">Swaply</strong>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/vue';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');

.gradient-background {
  --background: linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%);
}

.transparent-toolbar {
  --background: transparent;
  --color: white;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.logo-text {
  font-family: 'Caveat', cursive;
  font-size: 4rem;
  color: white;
  display: block;
  margin-bottom: 1rem;
}

.welcome-text {
  font-size: 1.1rem;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.animate-fade-in {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-45%);
  }
  to {
    opacity: 1;
    transform: translateY(-50%);
  }
}
</style>