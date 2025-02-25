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

    <ion-content :fullscreen="true">
      <!-- Profile Banner -->
      <div class="profile-banner">
        <div class="profile-info">
          <ion-avatar class="large-avatar">
            <img src="https://i.pravatar.cc/300" alt="User profile" />
          </ion-avatar>
          <h2 class="username">Mi Perfil</h2>
        </div>
      </div>

      <!-- Products Grid or Empty State -->
      <div v-if="userProducts.length > 0" class="products-grid">
        <div v-for="product in userProducts" 
             :key="product.id" 
             class="product-slot"
             @click="editProduct(product.id)">
          <img :src="product.image" 
               :alt="product.title" 
               class="product-image" />
        </div>
      </div>
      <div v-else class="empty-state">
        <ion-icon :icon="add" class="empty-icon" />
        <p class="empty-text">¡Sube tu primer producto para poder editarlo/verlo!</p>
        <ion-button class="upload-button" @click="goToUpload">
          Subir Producto
        </ion-button>
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
          <ion-button class="add-button" @click="goToUpload">
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
          <div class="help-avatar"><span>SOS</span></div>
          <div class="help-message">¿En qué puedo ayudarte?</div>
        </div>
        <div class="help-chat-content" ref="chatContent">
          <div v-for="(message, index) in chatMessages" 
               :key="index" 
               :class="['message', message.type]">
            {{ message.text }}
          </div>
        </div>
        <div class="help-chat-input">
          <ion-input v-model="newMessage"
                     placeholder="Escribe tu mensaje..."
                     class="message-input"
                     @keyup.enter="sendMessage" />
          <ion-button fill="clear" class="send-button" @click="sendMessage">
            <ion-icon :icon="paperPlaneOutline" />
          </ion-button>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import DOMPurify from 'dompurify';
import { 
  IonPage, IonHeader, IonToolbar, IonContent, IonFooter,
  IonButtons, IonButton, IonIcon, IonAvatar, IonInput
} from '@ionic/vue';
import { 
  settings, search, helpCircle, home, heart,
  add, mail, paperPlaneOutline
} from 'ionicons/icons';
import { useProductsStore } from '@/store/products';

const router = useRouter();
const productsStore = useProductsStore();

// Simular un ID de usuario actual
const currentUserId = 1;

// Filtrar productos del usuario actual con prevención de errores
const userProducts = computed(() => {
  return productsStore.products?.filter(product => product.userId === currentUserId) || [];
});

const editProduct = (productId: number) => {
  router.push(`/MyProducts2/${productId}`);
};

// Chat state
const showHelpChat = ref(false);
const newMessage = ref('');
const chatMessages = ref([
  { type: 'received', text: '¡Hola! ¿En qué puedo ayudarte?' }
]);

const chatContent = ref<HTMLElement | null>(null);

// Navegación
const goToHome = () => router.push('/home1');
const goToFavorites = () => router.push('/Like1');
const goToUpload = () => router.push('/Post1');

// Help chat functions
const toggleHelpChat = () => showHelpChat.value = !showHelpChat.value;
const closeHelpChat = () => showHelpChat.value = false;

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  const cleanMessage = DOMPurify.sanitize(newMessage.value); // Previene ataques XSS

  chatMessages.value.push({ type: 'sent', text: cleanMessage });

  setTimeout(() => {
    chatMessages.value.push({ type: 'received', text: 'Gracias por tu mensaje. Un agente te responderá pronto.' });

    // Scroll automático al final del chat
    nextTick(() => {
      chatContent.value?.scrollTo({ top: chatContent.value.scrollHeight, behavior: 'smooth' });
    });
  }, 1000);

  newMessage.value = '';
};
</script>

<style scoped>
/* Ajustes en el grid para mejor separación */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px;
  background: #9333EA;
}

/* Ajuste de estilos para el chat */
.help-chat-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #F0F2F5;
  max-height: 300px;
}

.message {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 1rem;
  max-width: 80%;
}

.message.sent {
  background: #DCF8C6;
  margin-left: auto;
  border-top-right-radius: 0;
}

.message.received {
  background: white;
  margin-right: auto;
  border-top-left-radius: 0;
}
</style>
