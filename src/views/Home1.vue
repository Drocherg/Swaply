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
  
      <ion-content 
        :fullscreen="true" 
        class="ion-padding"
        @ionScroll="handleScroll"
        :scroll-events="true"
      >
        <div class="grid-container">
          <div v-for="item in displayedItems" :key="item.id" class="product-card">
            <div class="product-image-container">
              <img :src="item.image" :alt="item.title" class="product-image" />
            </div>
            <div class="product-info">
              <div class="price-distance">
                <span class="price">{{ item.price }}</span>
                <span class="distance">A {{ item.distance }} Km de ti</span>
              </div>
              <h3 class="product-title">{{ item.title }}</h3>
            </div>
          </div>
        </div>
  
        <ion-infinite-scroll
          @ionInfinite="loadMore"
          threshold="100px"
          :disabled="isInfiniteScrollDisabled"
        >
          <ion-infinite-scroll-content
            loading-spinner="bubbles"
            loading-text="Cargando más productos..."
          >
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ion-content>
  
      <ion-footer class="ion-no-border">
        <ion-toolbar class="footer-toolbar">
          <ion-buttons class="footer-buttons">
            <ion-button class="footer-button active">
              <ion-icon :icon="home" />
            </ion-button>
            <ion-button class="footer-button" @click="goToLike">
              <ion-icon :icon="heart" />
            </ion-button>
            <ion-button class="add-button">
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
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { 
    IonPage, IonHeader, IonToolbar, IonContent, IonFooter,
    IonButtons, IonButton, IonIcon, IonAvatar, IonInput,
    IonInfiniteScroll, IonInfiniteScrollContent
  } from '@ionic/vue';
  import { 
    settings, search, helpCircle, home, heart, 
    add, mail, paperPlaneOutline
  } from 'ionicons/icons';
import router from '@/router';
  
  // Chat state
  const showHelpChat = ref(false);
  const newMessage = ref('');
  const chatMessages = ref([
    { type: 'received', text: '¡Hola! ¿En qué puedo ayudarte?' }
  ]);
  
  // Infinite scroll state
  const pageSize = 6;
  const currentPage = ref(1);
  const isInfiniteScrollDisabled = ref(false);
  
  // All available items
  const allItems = ref([
    {
      id: 1,
      title: 'Placa msi (no negociable)',
      price: '6€',
      distance: '0.1',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&q=80'
    },
    {
      id: 2,
      title: 'Portátil super bueno gamer',
      price: '249€',
      distance: '1.4',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&q=80'
    },
    {
      id: 3,
      title: 'Silla reclinable',
      price: '135€',
      distance: '2.6',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&q=80'
    },
    {
      id: 4,
      title: 'Silla reclinable negra',
      price: '135€',
      distance: '2.6',
      image: 'https://images.unsplash.com/photo-1579656381403-cdc3ee02ee39?w=400&h=300&q=80'
    },
    {
      id: 5,
      title: 'Placa base gaming',
      price: '6€',
      distance: '0.1',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&q=80'
    },
    {
      id: 6,
      title: 'Portátil ASUS ROG',
      price: '249€',
      distance: '1.4',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&q=80'
    },
    {
      id: 7,
      title: 'Monitor Gaming 144Hz',
      price: '189€',
      distance: '3.2',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&q=80'
    },
    {
      id: 8,
      title: 'Teclado Mecánico RGB',
      price: '75€',
      distance: '1.8',
      image: 'https://images.unsplash.com/photo-1595225476474-c377a4769c59?w=400&h=300&q=80'
    },
    {
      id: 9,
      title: 'Ratón Gaming Pro',
      price: '45€',
      distance: '2.1',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&q=80'
    },
    {
      id: 10,
      title: 'Auriculares Gaming',
      price: '89€',
      distance: '4.0',
      image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&q=80'
    }
  ]);
  
  // Computed property for displayed items
  const displayedItems = computed(() => {
    return allItems.value.slice(0, currentPage.value * pageSize);
  });
  
  // Help chat functions
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
  
    // Simulate response after 1 second
    setTimeout(() => {
      chatMessages.value.push({
        type: 'received',
        text: 'Gracias por tu mensaje. Un agente te responderá pronto.'
      });
    }, 1000);
  
    newMessage.value = '';
  };
  
  // Infinite scroll function
  const loadMore = async (ev: CustomEvent) => {
    // Simulate loading delay
    setTimeout(() => {
      currentPage.value++;
      
      // Disable infinite scroll if we've loaded all items
      if (currentPage.value * pageSize >= allItems.value.length) {
        isInfiniteScrollDisabled.value = true;
      }
      
      // Complete the infinite scroll
      (ev.target as HTMLIonInfiniteScrollElement).complete();
    }, 500);
  };
  
  // Scroll handler function
  const handleScroll = (event: CustomEvent) => {
    const { scrollTop } = event.detail;
    // Aquí puedes hacer algo con el evento de scroll
    // Por ejemplo, mostrar/ocultar elementos basados en la posición del scroll
    console.log('Scroll position:', scrollTop);
  };
  const goToLike = () => {
  router.push('/Like1');
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
  
  ion-content {
    --background: #000000;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .product-card {
    background: white;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .product-image-container {
    aspect-ratio: 4/3;
    overflow: hidden;
  }
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-info {
    padding: 0.75rem;
  }
  
  .price-distance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }
  
  .price {
    font-weight: bold;
    font-size: 1.1rem;
    color: #060303;
  }
  
  .distance {
    font-size: 0.8rem;
    color: #6B7280;
  }
  
  .product-title {
    font-size: 0.9rem;
    margin: 0;
    color: #374151;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  
  .footer-button.active {
    --color: #9333EA;
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
  
  /* Animation for chat appearance */
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
  </style>