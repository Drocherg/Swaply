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
          <!-- Product Image -->
          <div class="product-image-container">
            <img :src="product.image" :alt="product.title" class="product-image" />
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
            <ion-button class="footer-button">
              <ion-icon :icon="mail" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { 
    IonPage, IonHeader, IonToolbar, IonContent, IonFooter,
    IonButtons, IonButton, IonIcon, IonAvatar, IonInput,
    IonTextarea
  } from '@ionic/vue';
  import { 
    settings, search, helpCircle, home, heart,
    add, mail, checkmark
  } from 'ionicons/icons';
  import { useProductsStore } from '@/store/products';
  
  const router = useRouter();
  const route = useRoute();
  const productsStore = useProductsStore();
  
  // Get product ID from route params
  const productId = Number(route.params.id);
  const product = productsStore.products.find(p => p.id === productId) || {
  id: 0,
  title: '',
  price: '',
  image: '',
  description: '',
  distance: 0,
  userId: 0 
};

  
  // Form state
  const price = ref(product.price.replace('€', ''));
  const title = ref(product.title);
  const description = ref(product.description || '');
  
  // Computed
  const isFormValid = computed(() => {
    return price.value && title.value && description.value;
  });
  
  // Functions
  const saveChanges = () => {
    if (!isFormValid.value) return;
  
    productsStore.updateProduct({
      id: productId,
      title: title.value,
      price: `${price.value}€`,
      image: product.image,
      description: description.value,
      distance: String(product.distance),
      userId: product.userId
    });
  
    router.push('/profile');
  };
  
  const goToHome = () => {
    router.push('/home');
  };
  
  const goToFavorites = () => {
    router.push('/favorites');
  };
  
  const goToUpload = () => {
    router.push('/upload');
  };
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
    --placeholder-color: #9CA3AF;
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
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    --placeholder-color: #9CA3AF;
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