<template>
    <ion-page>
      <ion-content :fullscreen="true" class="ion-no-padding">
        <div class="splash-container">
          <div class="content-wrapper" :class="{ 'blur-background': showExitModal }">
            <div class="logo-container">
              <h1 class="logo-text animate-fade-in">Swaply</h1>
            </div>
            
            <div class="upper-section">
              <ion-button 
                class="custom-button animate-fade-in" 
                expand="block"
                fill="outline"
              >
                Iniciar Sesión
              </ion-button>
            </div>
  
            <div class="divider animate-fade-in"></div>
  
            <div class="lower-section">
              <ion-button 
                class="custom-button animate-fade-in" 
                expand="block"
                fill="outline"
              >
                Registrarse
              </ion-button>
            </div>
  
            <div class="close-button animate-fade-in">
              <ion-button fill="clear" class="ion-no-padding" @click="showExitModal = true">
                <ion-icon :icon="close" class="close-icon"></ion-icon>
              </ion-button>
            </div>
          </div>
  
          <!-- Exit Modal -->
          <div class="modal-overlay" v-if="showExitModal">
            <div class="modal-content animate-scale-in">
              <h2>¿Quieres salir de la aplicación?</h2>
              <div class="modal-buttons">
                <ion-button 
                  fill="clear" 
                  class="confirm-button"
                  @click="confirmExit"
                >
                  <ion-icon :icon="checkmark" />
                </ion-button>
                <ion-button 
                  fill="clear" 
                  class="cancel-button"
                  @click="showExitModal = false"
                >
                  <ion-icon :icon="close" />
                </ion-button>
              </div>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonContent, IonPage, IonButton, IonIcon } from '@ionic/vue';
  import { close, checkmark } from 'ionicons/icons';
  
  const showExitModal = ref(false);
  
  const confirmExit = () => {
    // Handle exit confirmation here
    showExitModal.value = false;
  };
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
    position: relative;
    transition: filter 0.3s ease;
  }
  
  .blur-background {
    filter: blur(4px);
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    margin-top: 15vh;
  }
  
  .logo-text {
    font-family: 'Caveat', cursive;
    font-size: 3.5rem;
    color: white;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  
  .upper-section, .lower-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .divider {
    width: 100%;
    height: 1px;
    background-color: white;
  }
  
  .custom-button {
    --background: transparent;
    --background-hover: rgba(255, 255, 255, 0.1);
    --background-activated: rgba(255, 255, 255, 0.2);
    --border-color: rgba(255, 255, 255, 0.7);
    --border-radius: 50px;
    --border-width: 1px;
    --color: white;
    --padding-start: 2rem;
    --padding-end: 2rem;
    font-weight: 400;
    text-transform: none;
    width: 80%;
    max-width: 300px;
  }
  
  .close-button {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
  }
  
  .close-icon {
    padding: 8px;
    border-radius: 50%;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    font-size: 1.2rem;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #4F46E5;
    padding: 1.5rem;
    border-radius: 1rem;
    width: 80%;
    max-width: 320px;
    text-align: center;
  }
  
  .modal-content h2 {
    color: white;
    font-size: 1.25rem;
    margin: 0 0 1.5rem 0;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .confirm-button, .cancel-button {
    --padding-start: 1rem;
    --padding-end: 1rem;
  }
  
  .confirm-button ion-icon {
    font-size: 1.5rem;
    color: #22C55E;
  }
  
  .cancel-button ion-icon {
    font-size: 1.5rem;
    color: #EF4444;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
  }
  
  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* iOS safe area handling */
  @supports (padding-top: env(safe-area-inset-top)) {
    .content-wrapper {
      padding-top: max(2rem, env(safe-area-inset-top));
      padding-bottom: max(2rem, env(safe-area-inset-bottom));
      padding-left: max(2rem, env(safe-area-inset-left));
      padding-right: max(2rem, env(safe-area-inset-right));
    }
  
    .close-button {
      left: max(2rem, env(safe-area-inset-left));
    }
  }
  </style>