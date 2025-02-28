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
            v-model="searchQuery"
          />
        </div>
        <ion-button fill="clear" class="help-button" @click="toggleHelpChat">
          <ion-icon :icon="helpCircle" />
        </ion-button>
      </div>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <div class="favorites-list">
        <div v-for="item in filteredFavorites" :key="item.id" class="favorite-item">
          <div class="item-content">
            <img :src="item.image" :alt="item.title" class="item-image" />
            <span class="item-title">{{ item.title }}</span>
          </div>
          <ion-button fill="clear" class="remove-button" @click="removeFavorite(item.id)">
            <ion-icon :icon="close" />
          </ion-button>
        </div>
        
        <div v-if="filteredFavorites.length === 0" class="empty-state">
          <ion-icon :icon="heart" class="empty-icon" />
          <p>No tienes favoritos aún</p>
          <p class="empty-subtitle">Los productos que marques como favoritos aparecerán aquí</p>
        </div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-toolbar class="footer-toolbar">
        <ion-buttons class="footer-buttons">
          <ion-button class="footer-button" @click="goToHome">
            <ion-icon :icon="home" />
          </ion-button>
          <ion-button class="footer-button active">
            <ion-icon :icon="heart" />
          </ion-button>
          <ion-button class="add-button" @click="goToPost">
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
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, IonHeader, IonToolbar, IonContent, IonFooter,
  IonButtons, IonButton, IonIcon, IonAvatar, IonInput
} from '@ionic/vue';
import { 
  settings, search, helpCircle, home, heart,
  add, mail, close, paperPlaneOutline
} from 'ionicons/icons';

const router = useRouter();
const searchQuery = ref('');
const showHelpChat = ref(false);
const newMessage = ref('');
const chatMessages = ref([
  { type: 'received', text: '¡Hola! ¿En qué puedo ayudarte con tus favoritos?' }
]);

const favorites = ref([
  {
    id: 1,
    title: 'Silla reclinable',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&q=80'
  },
  {
    id: 2,
    title: 'Teclado Gaming RGB',
    image: 'https://images.unsplash.com/photo-1595225476474-c377a4769c59?w=400&h=300&q=80'
  },
  {
    id: 3,
    title: 'Placa Base MSI',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&q=80'
  }
]);

const filteredFavorites = computed(() => {
  if (!searchQuery.value) return favorites.value;
  const query = searchQuery.value.toLowerCase();
  return favorites.value.filter(item => 
    item.title.toLowerCase().includes(query)
  );
});

const removeFavorite = (id: number) => {
  const index = favorites.value.findIndex(item => item.id === id);
  if (index !== -1) {
    favorites.value.splice(index, 1);
  }
};

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
    let response = 'Gracias por tu mensaje. Un agente te responderá pronto.';
    
    // Simple bot responses for favorites-related questions
    const message = newMessage.value.toLowerCase();
    if (message.includes('eliminar')) {
      response = 'Para eliminar un favorito, simplemente pulsa el botón X junto al producto que deseas quitar.';
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

const goToHome = () => {
  router.push('/home1');
};
const goToPost = () => {
  router.push('/Post1');
};
const goToNoti = () => router.push('/Noti1');
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

.favorites-list {
  padding: 1rem;
}

.favorite-item {
  background: white;
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slideIn 0.3s ease-out;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.item-image {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

.item-title {
  font-size: 1rem;
  color: #374151;
}

.remove-button {
  --color: #EF4444;
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: white;
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.empty-subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
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
  --background: #6B7280;
  --color: white;
  --padding-start: 0.75rem;
  --padding-end: 0.75rem;
  --border-radius: 50%;
  margin: -1.5rem 0;
  width: 3rem;
  height: 3rem;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
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

