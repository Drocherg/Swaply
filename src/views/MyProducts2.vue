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
          <ion-button @click="goToAjustes">
            <ion-icon :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <div class="search-container">
        <div class="search-box">
          <ion-icon :icon="search" class="search-icon" />
          <ion-input
            placeholder="Buscar..."
            class="search-input"
          />
        </div>
        <ion-button fill="clear" class="help-button" @click="toggleHelpChat">
          <ion-icon :icon="helpCircle" />
        </ion-button>
      </div>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <div class="edit-container">
        <!-- Product Image Carousel -->
        <div class="product-image-container">
          <div class="carousel">
            <!-- Main image -->
            <img 
              :src="currentImage" 
              :alt="product.title" 
              class="product-image"
            />
            
            <!-- Navigation arrows -->
            <ion-button 
              v-if="hasMultipleImages" 
              class="carousel-button prev" 
              fill="clear"
              @click="previousImage"
            >
              <ion-icon :icon="chevronBack" />
            </ion-button>
            
            <ion-button 
              v-if="hasMultipleImages" 
              class="carousel-button next" 
              fill="clear"
              @click="nextImage"
            >
              <ion-icon :icon="chevronForward" />
            </ion-button>

            <!-- Image indicators -->
            <div v-if="hasMultipleImages" class="carousel-indicators">
              <div 
                v-for="(_, index) in allImages" 
                :key="index"
                :class="['indicator', { active: currentImageIndex === index }]"
                @click="setImage(index)"
              ></div>
            </div>
          </div>
        </div>

        <h2 class="edit-title">Editando producto:</h2>

        <!-- Edit Form -->
        <div class="edit-form">
          <div class="form-group">
            <ion-button class="form-label" fill="solid" color="primary" shape="round">
              Precio
            </ion-button>
            <ion-input
              v-model="price"
              type="number"
              placeholder="Ej: 50"
              class="form-input"
            >
              <span slot="end">€</span>
            </ion-input>
          </div>

          <div class="form-group">
            <ion-button class="form-label" fill="solid" color="primary" shape="round">
              Título
            </ion-button>
            <ion-input
              v-model="title"
              type="text"
              placeholder="Ej: iPhone 12 Pro Max"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <ion-button class="form-label" fill="solid" color="primary" shape="round">
              Descripción
            </ion-button>
            <ion-textarea
              v-model="description"
              placeholder="Describe tu producto..."
              :rows="6"
              class="form-input description-input"
            />
          </div>
        </div>

        <!-- Confirm Button -->
        <ion-button 
          class="confirm-button" 
          @click="saveChanges"
          :disabled="!isFormValid"
        >
          <ion-icon :icon="checkmark" />
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
          <ion-button class="footer-button" @click="goToNoti">
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
            ¿En que puedo ayudarte?
          </div>
        </div>
        <div class="help-chat-content" ref="chatContent">
          <div v-for="(message, index) in chatMessages" 
               :key="index" 
               :class="['message', message.type]">
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

    <!-- Toast para notificaciones -->
    <ion-toast
      :is-open="showToast"
      :message="toastMessage"
      :duration="2000"
      @didDismiss="showToast = false"
    ></ion-toast>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
  IonPage, IonHeader, IonToolbar, IonContent, IonFooter,
  IonButtons, IonButton, IonIcon, IonAvatar, IonInput,
  IonTextarea, IonToast
} from '@ionic/vue';
import { 
  settingsOutline, search, helpCircle, home, heart,
  add, mail, checkmark, paperPlaneOutline, chevronBack, chevronForward
} from 'ionicons/icons';
import { useProductsStore, type Product } from '@/store/products';

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();

// Get product ID from route params
const productId = Number(route.params.id);
const product = computed(() => 
  productsStore.products.find(p => p.id === productId) || {
    id: 0,
    title: '',
    price: '',
    image: '',
    description: '',
    distance: 0,
    userId: 0 
  } as Product
);

// Form state
const price = ref('');
const title = ref('');
const description = ref('');
const showToast = ref(false);
const toastMessage = ref('');

// Cargar los datos del producto cuando se monte el componente
onMounted(() => {
  if (product.value) {
    price.value = product.value.price.replace('€', '');
    title.value = product.value.title;
    description.value = product.value.description || '';
  }
});

// Computed
const isFormValid = computed(() => {
  return price.value && title.value && description.value;
});

// Image carousel state
const currentImageIndex = ref(0);

// Computed properties for carousel
const allImages = computed(() => {
  const images = [product.value.image];
  if (product.value.additionalImages) {
    images.push(...product.value.additionalImages);
  }
  return images;
});

const currentImage = computed(() => {
  return allImages.value[currentImageIndex.value];
});

const hasMultipleImages = computed(() => {
  return allImages.value.length > 1;
});

// Carousel functions
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % allImages.value.length;
};

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? allImages.value.length - 1 
    : currentImageIndex.value - 1;
};

const setImage = (index: number) => {
  currentImageIndex.value = index;
};


// Functions
const saveChanges = () => {
  if (!isFormValid.value) return;

  try {
    productsStore.updateProduct({
      id: productId,
      title: title.value,
      price: `${price.value}€`,
      image: product.value.image,
      description: description.value,
      distance: String(product.value.distance),
      userId: product.value.userId,
      // Mantener las imágenes adicionales si existen
      additionalImages: product.value.additionalImages
    });
    
    // Mostrar mensaje de éxito
    toastMessage.value = '¡Producto actualizado con éxito!';
    showToast.value = true;
    
    // Redirigir a MyProducts1 después de un breve retraso
    setTimeout(() => {
      router.push('/MyProducts1');
    }, 1500);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    toastMessage.value = 'Error al actualizar el producto. Inténtalo de nuevo.';
    showToast.value = true;
  }
};

const goToHome = () => {
  router.push('/Home1');
};

const goToFavorites = () => {
  router.push('/Like1');
};

const goToUpload = () => {
  router.push('/Post1');
};

const goToMyProducts = () => {
  router.push('/MyProducts1');
};
const goToNoti = () => router.push('/Noti1');
const goToAjustes = () => router.push('/Ajustes1');

// Help chat state
const showHelpChat = ref(false);
const chatMessages = ref<{ type: 'sent' | 'received'; text: string }[]>([]);
const newMessage = ref('');

const toggleHelpChat = () => {
  showHelpChat.value = !showHelpChat.value;
};

const closeHelpChat = () => {
  showHelpChat.value = false;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  chatMessages.value.push({
    type: 'sent',
    text: newMessage.value
  });

  // Simular respuesta automática después de 1 segundo
  setTimeout(() => {
    let response = 'Gracias por tu mensaje. Un agente te responderá pronto.';
    
    const message = newMessage.value.toLowerCase();
    if (message.includes('eliminar')) {
      response = 'Para eliminar un favorito, pulsa el botón X junto al producto que deseas quitar.';
    } else if (message.includes('buscar')) {
      response = 'Puedes usar la barra de búsqueda en la parte superior para filtrar tus favoritos.';
    } else if (message.includes('añadir')) {
      response = 'Para añadir favoritos, ve a la página principal y pulsa el corazón en los productos que te interesen.';
    }

    chatMessages.value.push({
      type: 'received',
      text: response
    });
  }, 1000);

  newMessage.value = '';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');

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

.search-container {
  background: #9333EA;
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
  color: #6B7280;
  margin: 0 0.5rem;
  font-size: 1.25rem;
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
}

.gradient-background {
  --background: linear-gradient(180deg, #9333EA 0%, #3B82F6 100%);
}

.edit-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

.product-image-container {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  --background: rgba(0, 0, 0, 0.5);
  --border-radius: 50%;
  margin: 0;
  width: 2.5rem;
  height: 2.5rem;
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  z-index: 10;
}

.carousel-button.prev {
  left: 0.5rem;
}

.carousel-button.next {
  right: 0.5rem;
}

.carousel-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background: white;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: white;
}

.edit-title {
  color: white;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  --background: #3B82F6;
  --color: white;
  margin: 0;
  font-size: 0.9rem;
  height: 2rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
}

.form-input {
  background: white;
  border-radius: 0.5rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --placeholder-color: #9CA3AF; /* Color del placeholder */
  --color: #000000; /* Color del texto */
}

.description-input {
  --padding-top: 0.75rem;
  --padding-bottom: 0.75rem;
}

.confirm-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  --background: #22C55E;
  --border-radius: 50%;
  margin: 0;
  width: 3rem;
  height: 3rem;
}

.confirm-button[disabled] {
  --background: #9CA3AF;
}

.footer-toolbar {
  --background: white;
  --border-color: #E5E7EB;
}

.footer-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0.5rem 0;
}

.footer-button {
  --color: #6B7280;
  font-size: 1.5rem;
}

.add-button {
  --background: #9333EA;
  --color: white;
  --padding-start: 0.75rem;
  --padding-end: 0.75rem;
  --border-radius: 50%;
  margin: -1.5rem 0;
  width: 3rem;
  height: 3rem;
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
  color: white;
  margin-left: auto;
  border-top-right-radius: 0;
}

.message.received {
  background: white;
  color: #333;
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
  --background: #F3F4F6;
  --border-radius: 1.5rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --placeholder-color: #9CA3AF; /* Color del placeholder */
  --color: #000000; /* Color del texto */
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