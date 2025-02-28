<template>
  <ion-page>
    <ion-content :fullscreen="true" class="gradient-bg">
      <div class="welcome-container">
        <!-- Top section -->
        <div class="top-section">
          <h1 class="logo-text">Swaply</h1>
          <ion-button 
            class="custom-button login-button" 
            shape="round"
            @click="goToLogin"
          >
            Iniciar Sesión
          </ion-button>
        </div>
        
        <!-- Animated line -->
        <div class="line"></div>
        
        <!-- Bottom section -->
        <div class="bottom-section">
          <ion-button 
            class="custom-button register-button" 
            shape="round"
            @click="goToRegister"
          >
            Registrarse
          </ion-button>
        </div>

        <!-- Close button -->
        <ion-button 
          class="close-button" 
          fill="clear"
          @click="closeApp"
        >
          <ion-icon :icon="close"></ion-icon>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/InicioLoginAyuda1');
};

const goToRegister = () => {
  router.push('/InicioRegister1');
};

const closeApp = () => {
  // Handle app closing or return to previous screen
  router.back();
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');

.gradient-bg {
  --background: linear-gradient(180deg, #4FC3F7 0%, #2196F3 100%);
}

.welcome-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.top-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
}

.bottom-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.logo-text {
  font-family: 'Caveat', cursive;
  font-size: 4rem;
  color: white;
  margin: 0;
  opacity: 0;
  animation: dropIn 0.8s ease-out forwards;
}

.line {
  width: 100%;
  height: 2px;
  background-color: white;
  transform-origin: left;
  animation: expandLine 0.8s ease-out 0.8s forwards;
  transform: scaleX(0);
}

.custom-button {
  width: 200px;
  height: 3.5rem;
  --border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0;
}

.login-button {
  --background: rgba(255, 255, 255, 0.2);
  --color: white;
  --border-color: white;
  --border-style: solid;
  --border-width: 2px;
  animation: fadeIn 0.8s ease-out 1.6s forwards;
}

.register-button {
  --background: white;
  --color: #2196F3;
  animation: fadeIn 0.8s ease-out 2s forwards;
}

.close-button {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  --color: rgba(255, 255, 255, 0.8);
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 2.4s forwards;
}

@keyframes dropIn {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes expandLine {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* iOS safe area handling */
@supports (padding-top: env(safe-area-inset-top)) {
  .top-section {
    padding-top: calc(4rem + env(safe-area-inset-top));
  }

  .close-button {
    bottom: calc(2rem + env(safe-area-inset-bottom));
    left: calc(2rem + env(safe-area-inset-left));
  }
}
</style>