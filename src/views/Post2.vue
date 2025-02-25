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
      <div class="product-form">
        <!-- Photo preview -->
        <div class="photo-preview">
          <img :src="productPhoto" alt="Product photo" class="preview-image" />
          <ion-button class="confirm-button" @click="publishProduct" :disabled="!isFormValid">
            <ion-icon :icon="checkmark" />
          </ion-button>
        </div>

        <!-- Product details form -->
        <div class="form-fields">
          <div class="input-group">
            <ion-label class="input-label">Precio</ion-label>
            <ion-input
              v-model="price"
              type="number"
              placeholder="Ej: 50"
              class="price-input"
            >
              <span slot="end">€</span>
            </ion-input>
          </div>

          <div class="input-group">
            <ion-label class="input-label">Título</ion-label>
            <ion-input
              v-model="title"
              type="text"
              placeholder="Ej: iPhone 12 Pro Max"
              class="title-input"
            />
          </div>

          <div class="input-group">
            <ion-label class="input-label">Descripción</ion-label>
            <ion-textarea
              v-model="description"
              placeholder="Describe tu producto..."
              :rows="6"
              class="description-input"
            />
          </div>
        </div>
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

    <!-- Help Chat Modal -->
    <div v-if="showHelpChat" class="help-chat-overlay" @click="closeHelpChat">
      <div class="help-chat" @click.stop>
        <div class="help-chat-header">
          <div class="help-avatar">
            <span>SOS</span>
          </div>
          <div class="help-message">
            ¿En qué puedo ayudarte?
          </div>
        </div>
        <div class="help-chat-content" ref="chatContent">
          <div
            v-for="(message, index) in chatMessages"
            :key="index"
            :class="['message', message.type]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            {{ message.text }}
          </div>
        </div>
        <div class="help-chat-input">
          <ion-input
            v-model="newMessage"
            placeholder="Escribe tu mensaje..."
            class="message-input"
            @keyup.enter="sendMessage"
          />
          <ion-button fill="clear" class="send-button" @click="sendMessage">
            <ion-icon :icon="paperPlaneOutline" />
          </ion-button>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
  IonLabel,
  IonTextarea,
} from '@ionic/vue';
import {
  settings,
  search,
  helpCircle,
  home,
  heart,
  add,
  mail,
  checkmark,
  paperPlaneOutline,
} from 'ionicons/icons';

const route = useRoute();
const router = useRouter();

// Form state
const productPhoto = ref('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zJkAzdEGJH5QfPFYUWnka9N29kWWNw.png'); // Imagen por defecto
const price = ref('');
const title = ref('');
const description = ref('');

// Chat state
const showHelpChat = ref(false);
const newMessage = ref('');
const chatMessages = ref([
  { type: 'received', text: '¡Hola! ¿En qué puedo ayudarte?' },
]);

// Obtener las fotos de los parámetros de ruta al montar el componente
onMounted(() => {
  if (route.query.mainPhoto) {
    productPhoto.value = route.query.mainPhoto as string;
  }
  if (route.query.additionalPhotos) {
    const additionalPhotos = JSON.parse(route.query.additionalPhotos as string);
    console.log('Fotos adicionales:', additionalPhotos);
  }
});

// Computed properties
const isFormValid = computed(() => {
  return price.value && title.value && description.value;
});

// Help chat functions
const toggleHelpChat = () => {
  showHelpChat.value = !showHelpChat.value;
};

const closeHelpChat = () => {
  showHelpChat.value = false;
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  // Guardar el mensaje del usuario antes de limpiar el campo
  const userMessage = newMessage.value.trim();

  // Añadir el mensaje del usuario
  chatMessages.value.push({
    type: 'sent',
    text: userMessage,
  });

  // Limpiar el campo de entrada
  newMessage.value = '';

  // Desplazarse al último mensaje
  await nextTick();
  const chatContent = document.querySelector('.help-chat-content');
  if (chatContent) {
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  // Simular una respuesta automática después de 1 segundo
  setTimeout(() => {
    let response = 'Gracias por tu mensaje. Un agente te responderá pronto.';

    // Respuestas automáticas basadas en el contenido del mensaje
    if (userMessage.toLowerCase().includes('precio')) {
      response = 'Para establecer un precio adecuado, investiga el valor de mercado de productos similares y considera el estado de tu artículo.';
    } else if (userMessage.toLowerCase().includes('título')) {
      response = 'Un buen título debe ser claro y descriptivo. Incluye palabras clave relevantes para que los usuarios encuentren tu producto fácilmente.';
    } else if (userMessage.toLowerCase().includes('descripción')) {
      response = 'La descripción debe ser detallada. Incluye información sobre el estado del producto, características clave y cualquier detalle que pueda ser útil para el comprador.';
    } else if (userMessage.toLowerCase().includes('foto')) {
      response = 'Asegúrate de que las fotos sean claras y bien iluminadas. Muestra el producto desde diferentes ángulos y resalta cualquier detalle importante.';
    } else if (userMessage.toLowerCase().includes('ayuda')) {
      response = '¿Necesitas ayuda con algo en particular? Puedo ayudarte con consejos sobre precios, títulos, descripciones y fotos.';
    }

    // Añadir la respuesta del bot
    chatMessages.value.push({
      type: 'received',
      text: response,
    });

    // Desplazarse al último mensaje
    nextTick(() => {
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    });
  }, 1000);
};

// Navigation functions
const goToHome = () => {
  router.push('/Home1');
};

const goToFavorites = () => {
  router.push('/Like1');
};

// Form submission
const publishProduct = () => {
  if (!isFormValid.value) return;

  const productData = {
    photo: productPhoto.value,
    price: price.value,
    title: title.value,
    description: description.value,
  };

  console.log('Publishing product:', productData);
  router.push('/Home1');
};
</script>

<style scoped>
/* Estilos completos del segundo componente */
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

.product-form {
  padding: 1rem;
}

.photo-preview {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.confirm-button[disabled] {
  --background: #9ca3af;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  background: white;
  border-radius: 1rem;
  padding: 0.75rem;
}

.input-label {
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

.price-input,
.title-input,
.description-input {
  --background: #f3f4f6;
  --border-radius: 0.5rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --placeholder-color: #9ca3af;
}

.description-input {
  --background: #f3f4f6;
  --border-radius: 0.5rem;
  --padding: 1rem;
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