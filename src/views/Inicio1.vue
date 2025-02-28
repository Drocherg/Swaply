<template>
  <ion-page>
    <ion-content :fullscreen="true" class="gradient-bg">
      <div class="splash-container">
        <h1 class="logo-text">Swaply</h1>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  // Navigate to home after animation completes
  setTimeout(() => {
    router.replace('/Login3');
  }, 3500); // Animation duration + small delay
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');

.gradient-bg {
  --background: linear-gradient(180deg, #4FC3F7 0%, #2196F3 100%);
}

.splash-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.logo-text {
  font-family: 'Caveat', cursive;
  font-size: 4rem;
  color: white;
  margin: 0;
  animation: slideLeft 2s ease-in-out forwards;
  position: relative;
  white-space: nowrap;
}

@keyframes slideLeft {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(-100vw);
    opacity: 0;
  }
}
</style>