<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-avatar class="header-avatar" @click="goToMyProducts">
            <img src="https://i.pravatar.cc/300" alt="User avatar" />
          </ion-avatar>
        </ion-buttons>
        
        <div class="logo-container">
          <h1 class="logo-text">Swaply</h1>
        </div>

        <ion-buttons slot="end">
          <ion-button class="settings-button" @click="goToAjustes">
            <ion-icon :icon="settingsOutline" />
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
          <div class="profile-name">Mi Perfil</div>
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
          <div class="product-info">
            <div class="product-title">{{ product.title }}</div>
            <div class="product-price">{{ product.price }}</div>
          </div>
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
import { computed, ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, IonHeader, IonToolbar, IonContent, IonFooter,
  IonButtons, IonButton, IonIcon, IonAvatar, IonInput
} from '@ionic/vue';
import { 
  settingsOutline, search, helpCircle, home, heart,
  add, mail, paperPlaneOutline
} from 'ionicons/icons';
import { useProductsStore } from '@/store/products';

const router = useRouter();
const productsStore = useProductsStore();

// Simular un ID de usuario actual
const currentUserId = 1;

// Usar el getter del store para obtener los productos del usuario
const userProducts = computed(() => productsStore.getUserProducts(currentUserId));

// Verificar si hay productos al montar el componente
onMounted(() => {
  console.log('Productos del usuario:', userProducts.value);
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
const goToAjustes = () => router.push('/Ajustes1');
const goToMyProducts = () => {
  router.push('/MyProducts1');
};

// Help chat functions
const toggleHelpChat = () => showHelpChat.value = !showHelpChat.value;
const closeHelpChat = () => showHelpChat.value = false;

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  chatMessages.value.push({ type: 'sent', text: newMessage.value });

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
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');

/* Header Styles */
.custom-toolbar {
  --background: #9333EA;
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

.settings-button {
  --color: white;
  margin-right: 0.5rem;
}

/* Search Bar Styles */
.search-container {
  background: #9333EA;
  padding: 0.5rem 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-box {
  flex: 1;
  background: white;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
}

.search-icon {
  color: #6B7280;
  font-size: 1.25rem;
  margin-right: 0.5rem;
}

.search-input {
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  --placeholder-color: #000000;
  color: #000000;
}

.help-button {
  --color: white;
  font-size: 1.5rem;
  margin: 0;
}

/* Profile Banner Styles */
.profile-banner {
  background: linear-gradient(180deg, #9333EA 0%, #2196F3 100%);
  padding: 2rem 1rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.large-avatar {
  width: 100px;
  height: 100px;
  --border-radius: 50%;
  border: 4px solid white;
}

.profile-name {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

/* Products Grid Styles */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  padding: 1px;
  background: #9333EA;
}

.product-slot {
  aspect-ratio: 1;
  background: white;
  overflow: hidden;
  position: relative;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem;
  color: white;
}

.product-title {
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 0.9rem;
  font-weight: 600;
}

/* Footer Styles */
.footer-toolbar {
  --background: #9333EA;
  --border-color: transparent;
}

.footer-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0.5rem 0;
}

.footer-button {
  --color: white;
  font-size: 1.5rem;
}

.add-button {
  --background: white;
  --color: #9333EA;
  --padding-start: 0.75rem;
  --padding-end: 0.75rem;
  --border-radius: 50%;
  margin: -1.5rem 0;
  width: 3rem;
  height: 3rem;
}

/* Empty State Styles */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  height: calc(100vh - 300px);
}

.empty-icon {
  font-size: 4rem;
  color: #9333EA;
  margin-bottom: 1rem;
}

.empty-text {
  color: #6B7280;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 80%;
}

.upload-button {
  --background: #9333EA;
  --color: white;
  --padding-start: 2rem;
  --padding-end: 2rem;
  --border-radius: 9999px;
  font-weight: 500;
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
  background: #2B95D6;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.help-avatar {
  width: 40px;
  height: 40px;
  background: #FF0000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.help-message {
  color: white;
  font-size: 1rem;
}

.help-chat-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #F0F2F5;
}

.message {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 1rem;
  max-width: 80%;
}

.message.sent {
  background: #030403;
  margin-left: auto;
  border-top-right-radius: 0;
}

.message.received {
  background: rgb(0, 0, 0);
  margin-right: auto;
  border-top-left-radius: 0;
}

.help-chat-input {
  padding: 1rem;
  background: white;
  border-top: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.message-input {
  --background: #000000;
  --border-radius: 1.5rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
}

.send-button {
  --color: #2B95D6;
  font-size: 1.5rem;
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