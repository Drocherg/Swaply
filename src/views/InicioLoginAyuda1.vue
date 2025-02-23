<template>
    <ion-page>
      <ion-content :fullscreen="true" class="ion-no-padding">
        <div class="splash-container">
          <div :class="{'content-blur': showHelp}">
            <ion-button fill="clear" class="help-button" @click="toggleHelp('username')">
              <ion-icon :icon="helpCircle" />
            </ion-button>
            
            <div class="content-wrapper">
              <div class="logo-frame">
                <h1 class="logo-text">Swaply</h1>
              </div>
  
              <div class="avatar-container">
                <div class="avatar-placeholder">
                  <ion-icon :icon="person" class="avatar-icon" />
                </div>
              </div>
  
              <div class="login-card">
                <div class="form-group">
                  <ion-button fill="clear" class="field-label">Usuario</ion-button>
                  <ion-input
                    v-model="username"
                    class="custom-input"
                    placeholder=""
                  />
                </div>
  
                <div class="form-group">
                  <ion-button fill="clear" class="field-label">Contraseña</ion-button>
                  <div class="password-input-container">
                    <ion-input
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      class="custom-input"
                      placeholder=""
                    />
                    <ion-button 
                      fill="clear" 
                      class="visibility-toggle"
                      @click="showPassword = !showPassword"
                    >
                      <ion-icon :icon="showPassword ? eyeOff : eye" />
                    </ion-button>
                  </div>
                </div>
  
                <ion-button expand="block" class="login-button">
                  Entrar
                </ion-button>
              </div>
            </div>
          </div>
  
          <!-- Help Overlay -->
          <div v-if="showHelp" class="help-overlay" @click="toggleNextField">
            <ion-button fill="clear" class="close-help-button" @click="closeHelp">
              <ion-icon :icon="close" />
            </ion-button>
            
            <div class="content-wrapper">
              <div class="logo-frame opacity-50">
                <h1 class="logo-text">Swaply</h1>
              </div>
  
              <div class="avatar-container opacity-50">
                <div class="avatar-placeholder">
                  <ion-icon :icon="person" class="avatar-icon" />
                </div>
              </div>
  
              <div class="help-text">
                {{ helpText }}
              </div>
  
              <div class="login-card">
                <div class="form-group" :class="{'highlighted-field': activeField === 'username', 'opacity-50': activeField !== 'username'}">
                  <ion-button fill="clear" class="field-label">Usuario</ion-button>
                  <ion-input disabled class="custom-input" />
                </div>
  
                <div class="form-group" :class="{'highlighted-field': activeField === 'password', 'opacity-50': activeField !== 'password'}">
                  <ion-button fill="clear" class="field-label">Contraseña</ion-button>
                  <div class="password-input-container">
                    <ion-input disabled class="custom-input" type="password" />
                    <ion-button fill="clear" class="visibility-toggle" disabled>
                      <ion-icon :icon="eye" />
                    </ion-button>
                  </div>
                </div>
  
                <ion-button expand="block" class="login-button opacity-50" disabled>
                  Entrar
                </ion-button>
              </div>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { IonContent, IonPage, IonButton, IonIcon, IonInput } from '@ionic/vue';
  import { helpCircle, eye, eyeOff, person, close } from 'ionicons/icons';
  
  const username = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const showHelp = ref(false);
  const activeField = ref('username');
  
  const helpText = computed(() => {
    return activeField.value === 'username' 
      ? 'Introduce tu nombre de Usuario'
      : 'Introduce tu contraseña';
  });
  
  const toggleHelp = (field: string) => {
    activeField.value = field;
    showHelp.value = true;
  };
  
  const closeHelp = () => {
    showHelp.value = false;
    activeField.value = 'username';
  };
  
  const toggleNextField = (event: MouseEvent) => {
    // Prevent toggling when clicking close button
    if ((event.target as HTMLElement).closest('.close-help-button')) {
      return;
    }
    
    if (activeField.value === 'username') {
      activeField.value = 'password';
    } else {
      closeHelp();
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');
  
  .splash-container {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%);
    position: relative;
  }
  
  .content-blur {
    filter: blur(4px);
    opacity: 0.7;
    pointer-events: none;
  }
  
  .help-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    --color: white;
    font-size: 1.5rem;
    z-index: 10;
  }
  
  .close-help-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    --color: white;
    font-size: 1.5rem;
    z-index: 20;
  }
  
  .help-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
    animation: fadeIn 0.3s ease-out;
  }
  
  .content-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    padding-top: 4rem;
  }
  
  .logo-frame {
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 0.5rem 2rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .logo-text {
    font-family: 'Caveat', cursive;
    font-size: 2.5rem;
    color: white;
    margin: 0;
    padding: 0;
  }
  
  .avatar-container {
    margin-bottom: 1.5rem;
  }
  
  .avatar-placeholder {
    width: 80px;
    height: 80px;
    background-color: #D1D5DB;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .avatar-icon {
    font-size: 2.5rem;
    color: #6B7280;
  }
  
  .login-card {
    background: #4F46E5;
    padding: 2rem;
    border-radius: 1.5rem;
    width: 100%;
    max-width: 400px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    position: relative;
    transition: opacity 0.3s ease;
  }
  
  .field-label {
    --color: #93C5FD;
    --padding-start: 0;
    --padding-end: 0;
    --padding-top: 0;
    --padding-bottom: 0.5rem;
    height: auto;
    text-transform: none;
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
  }
  
  .custom-input {
    --background: #F3F4F6;
    --padding-start: 1rem;
    --padding-end: 1rem;
    --padding-top: 0.75rem;
    --padding-bottom: 0.75rem;
    --border-radius: 0.5rem;
    --color: #1F2937;
  }
  
  .password-input-container {
    position: relative;
  }
  
  .visibility-toggle {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    --color: #6B7280;
    margin: 0;
    --padding-end: 0.75rem;
    --padding-start: 0.75rem;
  }
  
  .login-button {
    --background: #93C5FD;
    --color: #1F2937;
    --border-radius: 2rem;
    --padding-top: 1rem;
    --padding-bottom: 1rem;
    margin-top: 2rem;
    font-weight: 500;
    text-transform: none;
  }
  
  .help-text {
    color: white;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 1.5rem;
    font-family: 'Caveat', cursive;
    background: rgba(79, 70, 229, 0.9);
    padding: 0.75rem 1.5rem;
    border-radius: 1rem;
    max-width: 80%;
    transition: all 0.3s ease;
  }
  
  .highlighted-field {
    position: relative;
    opacity: 1 !important;
    z-index: 2;
  }
  
  .highlighted-field::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: rgba(147, 197, 253, 0.15);
    border-radius: 1rem;
    z-index: -1;
    animation: pulse 2s infinite;
  }
  
  .opacity-50 {
    opacity: 0.5;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(147, 197, 253, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(147, 197, 253, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(147, 197, 253, 0);
    }
  }
  
  /* iOS safe area handling */
  @supports (padding-top: env(safe-area-inset-top)) {
    .content-wrapper {
      padding-top: max(4rem, env(safe-area-inset-top));
      padding-bottom: max(2rem, env(safe-area-inset-bottom));
      padding-left: max(2rem, env(safe-area-inset-left));
      padding-right: max(2rem, env(safe-area-inset-right));
    }
  
    .help-button {
      top: max(1rem, env(safe-area-inset-top));
      right: max(1rem, env(safe-area-inset-right));
    }
  
    .close-help-button {
      top: max(1rem, env(safe-area-inset-top));
      left: max(1rem, env(safe-area-inset-left));
    }
  }
  </style>