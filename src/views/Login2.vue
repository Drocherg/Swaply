<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-padding">
      <div class="splash-container">
        <div class="content-wrapper">
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
            <ion-button fill="clear" class="ion-no-padding">
              <ion-icon :icon="close" class="close-icon"></ion-icon>
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonIcon } from '@ionic/vue';
import { close } from 'ionicons/icons';
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

.upper-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lower-section {
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

.animate-fade-in {
  animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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