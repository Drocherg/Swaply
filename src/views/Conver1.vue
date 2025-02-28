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
        <ion-button fill="clear" class="help-button">
          <ion-icon :icon="helpCircle" />
        </ion-button>
      </div>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <div class="product-container">
        <!-- Product Image -->
        <div class="product-image-container">
          <img :src="product.image" :alt="product.title" class="product-image" />
          
          <!-- Favorite Button -->
          <ion-button 
            class="favorite-button" 
            fill="clear"
            @click="toggleFavorite"
          >
            <ion-icon 
              :icon="isFavorite ? heartSharp : heartOutline"
              :class="{'favorite-active': isFavorite}"
            />
          </ion-button>

          <!-- Accept Button -->
          <ion-button 
            class="accept-button" 
            @click="acceptProduct"
          >
            <ion-icon :icon="checkmark" />
          </ion-button>
        </div>

        <!-- Product Details -->
        <div class="details-container">
          <div class="detail-item">
            <ion-button class="detail-label" fill="solid" color="primary" shape="round">
              Precio
            </ion-button>
            <div class="detail-content">
              {{ product.price }}
            </div>
          </div>

          <div class="detail-item">
            <ion-button class="detail-label" fill="solid" color="primary" shape="round">
              Título
            </ion-button>
            <div class="detail-content">
              {{ product.title }}
            </div>
          </div>

          <div class="detail-item">
            <ion-button class="detail-label" fill="solid" color="primary" shape="round">
              Descripción
            </ion-button>
            <div class="detail-content description">
              {{ product.description }}
            </div>
          </div>

          <!-- Chat Button -->
          <ion-button 
            expand="block" 
            class="chat-button"
            @click="startChat"
          >
            <ion-icon :icon="chatbubbleEllipses" slot="start" />
            Iniciar Conversación
          </ion-button>
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  IonPage, IonHeader, IonToolbar, IonContent, IonFooter,
  IonButtons, IonButton, IonIcon, IonAvatar, IonInput
} from '@ionic/vue';
import { 
  settings, search, helpCircle, home, heart,
  add, mail, checkmark, chatbubbleEllipses,
  heartOutline, heartSharp
} from 'ionicons/icons';
import { useProductsStore } from '@/store/products';

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();

const productId = Number(route.params.id);
const product = ref(productsStore.products.find(p => p.id === productId) || {
  id: 0,
  title: 'Silla Reclinable',
  price: '135€',
  image: '/placeholder.svg',
  description: 'Pues una silla de oficina',
  distance: '2km',
  userId: 1
});

const isFavorite = ref(false);

onMounted(() => {
  // Aquí podrías verificar si el producto está en favoritos
  // isFavorite.value = checkIfProductIsFavorite(productId);
});

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  if (isFavorite.value) {
    // Aquí añadirías la lógica para guardar en favoritos
    // addToFavorites(product.value);
  } else {
    // Aquí añadirías la lógica para quitar de favoritos
    // removeFromFavorites(product.value.id);
  }
};

const acceptProduct = () => {
  router.push('/Home1');
};

const startChat = () => {
  router.push('/Conver2');
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

const goToAjustes = () => router.push('/Ajustes1');
const goToMyProducts = () => {
  router.push('/MyProducts1');
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

.gradient-background {
  --background: linear-gradient(180deg, #9333EA 0%, #3B82F6 100%);
}

.product-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-image-container {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  position: relative;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-button {
  position: absolute;
  top: 0.5rem;
  right: 4rem;
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  --background: rgba(255, 255, 255, 0.9);
  --border-radius: 50%;
  margin: 0;
  height: 2.5rem;
}

.favorite-button ion-icon {
  font-size: 1.5rem;
  color: #6B7280;
}

.favorite-active {
  color: #EF4444 !important;
}

.accept-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  --background: #22C55E;
  --border-radius: 50%;
  margin: 0;
  height: 2.5rem;
}

.details-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-label {
  --background: #3B82F6;
  align-self: flex-start;
  margin: 0;
  height: 2rem;
  font-size: 0.9rem;
}

.detail-content {
  background: white;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #1F2937;
}

.description {
  min-height: 6rem;
  white-space: pre-wrap;
}

.chat-button {
  --background: #3B82F6;
  --border-radius: 2rem;
  margin-top: 1rem;
  height: 3rem;
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

