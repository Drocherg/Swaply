<template>
    <ion-page>
      <ion-content :fullscreen="true" class="ion-no-padding">
        <div class="splash-container">
          <h1 class="logo-text animate-fade-in">Swaply</h1>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonContent, IonPage } from '@ionic/vue';
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');
  
  .splash-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    background: linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%);
    padding-left: 2rem; /* Add left padding for the text */
  }
  
  .logo-text {
    font-family: 'Caveat', cursive;
    font-size: 3.5rem;
    color: white;
    margin: 0;
    padding: 0;
    text-align: left;
  }
  
  .animate-fade-in {
    animation: fadeIn 1.5s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* iOS safe area handling */
  @supports (padding-top: env(safe-area-inset-top)) {
    .splash-container {
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: max(2rem, env(safe-area-inset-left));
    }
  }
  </style>