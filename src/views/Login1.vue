<template>
    <ion-page>
      <ion-content :fullscreen="true" class="ion-no-padding">
        <div class="splash-container">
          <div class="content-wrapper">
            <h1 class="logo-text animate-fade-in">Swaply</h1>
            <div class="divider animate-fade-in"></div>
          </div>
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
    background: linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%);
  }
  
  .content-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
  
  .logo-text {
    font-family: 'Caveat', cursive;
    font-size: 3.5rem;
    color: white;
    margin: 0;
    padding: 0;
    text-align: left;
    margin-top: 15vh;
  }
  
  .divider {
    width: 100%;
    height: 1px;
    background-color: white;
    margin-top: auto;
    margin-bottom: auto;
  }
  
  .animate-fade-in {
    animation: fadeIn 1.5s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* iOS safe area handling */
  @supports (padding-top: env(safe-area-inset-top)) {
    .content-wrapper {
      padding-top: max(2rem, env(safe-area-inset-top));
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: max(2rem, env(safe-area-inset-left));
      padding-right: max(2rem, env(safe-area-inset-right));
    }
  }
  </style>