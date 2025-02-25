<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-avatar class="header-avatar">
            <img src="https://i.pravatar.cc/300" alt="User avatar" />
          </ion-avatar>
        </ion-buttons>

        <div class="logo-container">
          <h1 class="logo-text">Swaply</h1>
        </div>

        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="settings" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <div class="search-container">
        <div class="search-box">
          <ion-icon :icon="search" class="search-icon" />
          <ion-input placeholder="Buscar..." class="search-input" />
        </div>
        <ion-button fill="clear" class="help-button" @click="toggleHelpChat">
          <ion-icon :icon="helpCircle" />
        </ion-button>
      </div>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <div class="upload-container">
        <!-- Main photo preview -->
        <div class="main-photo-container">
          <div v-if="mainPhoto" class="photo-preview">
            <img :src="mainPhoto" alt="Selected photo" class="preview-image" />
            <ion-button fill="clear" class="remove-photo" @click="removeMainPhoto">
              <ion-icon :icon="close" />
            </ion-button>
          </div>
          <div v-else class="photo-placeholder" @click="selectMainPhoto">
            <ion-icon :icon="camera" />
            <span>Selecciona una foto principal</span>
          </div>
          <ion-button class="confirm-button" @click="confirmUpload" :disabled="!mainPhoto">
            <ion-icon :icon="checkmark" />
          </ion-button>
        </div>

        <!-- Additional photos grid -->
        <div class="photos-grid">
          <div
            v-for="(photo, index) in additionalPhotos"
            :key="index"
            class="photo-slot"
            @click="selectAdditionalPhoto(index)"
          >
            <div v-if="photo" class="photo-preview">
              <img :src="photo" alt="Additional photo" class="preview-image" />
              <ion-button fill="clear" class="remove-photo" @click.stop="removeAdditionalPhoto(index)">
                <ion-icon :icon="close" />
              </ion-button>
            </div>
            <div v-else class="photo-placeholder">
              <ion-icon :icon="add" />
            </div>
          </div>
        </div>

        <!-- Hidden file inputs -->
        <input
          type="file"
          ref="mainPhotoInput"
          accept="image/*"
          class="hidden-input"
          @change="onMainPhotoSelected"
        />
        <input
          type="file"
          ref="additionalPhotoInput"
          accept="image/*"
          class="hidden-input"
          @change="onAdditionalPhotoSelected"
        />
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-toolbar class="footer-toolbar">
        <ion-buttons class="footer-buttons">
          <ion-button class="footer-button" @click="goToHome">
            <ion-icon :icon="home" />
          </ion-button>
          <ion-button class="footer-button" @click="goToFavorites">
            <ion-icon :icon="heart" />
          </ion-button>
          <ion-button class="add-button active">
            <ion-icon :icon="add" />
          </ion-button>
          <ion-button class="footer-button">
            <ion-icon :icon="mail" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonFooter,
  IonButtons,
  IonButton,
  IonIcon,
  IonAvatar,
  IonInput,
} from '@ionic/vue';
import {
  settings,
  search,
  helpCircle,
  home,
  heart,
  add,
  mail,
  camera,
  checkmark,
  close,
  paperPlaneOutline,
} from 'ionicons/icons';

const router = useRouter();
const mainPhotoInput = ref<HTMLInputElement | null>(null);
const additionalPhotoInput = ref<HTMLInputElement | null>(null);
const currentAdditionalPhotoIndex = ref(-1);
const mainPhoto = ref<string | null>(null);
const additionalPhotos = ref<(string | null)[]>(Array(6).fill(null));

// Chat state
const showHelpChat = ref(false);
const newMessage = ref('');
const chatMessages = ref([
  { type: 'received', text: '¡Hola! ¿En qué puedo ayudarte con la subida de fotos?' },
]);

// Método para alternar la visibilidad del chat de ayuda
const toggleHelpChat = () => {
  showHelpChat.value = !showHelpChat.value;
};

const selectMainPhoto = () => {
  mainPhotoInput.value?.click();
};

const selectAdditionalPhoto = (index: number) => {
  currentAdditionalPhotoIndex.value = index;
  additionalPhotoInput.value?.click();
};

const onMainPhotoSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      mainPhoto.value = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const onAdditionalPhotoSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0] && currentAdditionalPhotoIndex.value !== -1) {
    const reader = new FileReader();
    reader.onload = (e) => {
      additionalPhotos.value[currentAdditionalPhotoIndex.value] = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const removeMainPhoto = () => {
  mainPhoto.value = null;
  if (mainPhotoInput.value) {
    mainPhotoInput.value.value = '';
  }
};

const removeAdditionalPhoto = (index: number) => {
  additionalPhotos.value[index] = null;
  if (additionalPhotoInput.value) {
    additionalPhotoInput.value.value = '';
  }
};

const confirmUpload = () => {
  if (!mainPhoto.value) return;

  // Pasar las fotos como parámetros de ruta
  router.push({
    path: '/Post2',
    query: {
      mainPhoto: mainPhoto.value,
      additionalPhotos: JSON.stringify(additionalPhotos.value),
    },
  });
};

const goToHome = () => {
  router.push('/home1');
};

const goToFavorites = () => {
  router.push('/Like1');
};
</script>

<style scoped>
/* Estilos completos del primer componente */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');

.custom-toolbar {
  --background: #9333ea;
  --color: white;
  padding: 0.5rem;
}

.header-avatar {
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.5rem;
}

.logo-container {
  display: flex;
  justify-content: center;
  flex: 1;
}

.logo-text {
  font-family: 'Caveat', cursive;
  font-size: 2rem;
  color: white;
  margin: 0;
}

.search-container {
  background: #9333ea;
  padding: 0.5rem 1rem 1rem;
  display: flex;
  align-items: center;
}

.search-box {
  background: white;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  flex-grow: 1;
  margin-right: 0.5rem;
}

.search-icon {
  color: #6b7280;
  margin: 0 0.5rem;
  font-size: 1.25rem;
}

.search-input {
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  --placeholder-color: #9ca3af;
}

.help-button {
  --color: white;
  font-size: 1.5rem;
}

.gradient-background {
  --background: linear-gradient(180deg, #9333ea 0%, #3b82f6 100%);
}

.upload-container {
  padding: 1rem;
}

.main-photo-container {
  position: relative;
  margin-bottom: 1rem;
}

.photo-preview {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6b7280;
  cursor: pointer;
}

.photo-placeholder ion-icon {
  font-size: 2rem;
}

.remove-photo {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  --color: #ef4444;
  margin: 0;
}

.confirm-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  --background: #22c55e;
  --border-radius: 50%;
  margin: 0;
  width: 3rem;
  height: 3rem;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.photo-slot {
  aspect-ratio: 1;
}

.hidden-input {
  display: none;
}

.footer-toolbar {
  --background: white;
  --border-color: #e5e7eb;
}

.footer-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0.5rem 0;
}

.footer-button {
  --color: #6b7280;
  font-size: 1.5rem;
}

.footer-button.active {
  --color: #9333ea;
}

.add-button {
  --background: #9333ea;
  --color: white;
  --padding-start: 0.75rem;
  --padding-end: 0.75rem;
  --border-radius: 50%;
  margin: -1.5rem 0;
  width: 3rem;
  height: 3rem;
}

.add-button.active {
  --background: #7c3aed;
}

/* Help Chat Styles */
.help-chat-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.help-chat {
  width: 90%;
  max-width: 400px;
  height: 80vh;
  background: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.help-chat-header {
  background: #2b95d6;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.help-avatar {
  width: 40px;
  height: 40px;
  background: #ff0000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.help-message {
  color: rgb(0, 0, 0);
  font-size: 1rem;
}

.help-chat-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #f0f2f5;
}

.message {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 1rem;
  max-width: 80%;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

.message.sent {
  background: #9333ea;
  color: white;
  margin-left: auto;
  border-top-right-radius: 0;
}

.message.received {
  background: #e5e7eb;
  color: black;
  margin-right: auto;
  border-top-left-radius: 0;
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

/* Animación para el chat */
.help-chat {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* iOS safe area handling */
@supports (padding-top: env(safe-area-inset-top)) {
  ion-header {
    padding-top: env(safe-area-inset-top);
  }

  ion-footer {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>