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
          <ion-button fill="clear" class="help-button" @click="toggleHelpChat">
            <ion-icon :icon="helpCircle" />
          </ion-button>
        </div>
      </ion-header>
    
      <ion-content :fullscreen="true" class="notifications-content">
        <div class="notifications-container">
          <div v-for="(notification, index) in notifications" 
               :key="index"
               class="notification-item"
               :class="{ unread: !notification.read }">
            <ion-avatar class="notification-avatar">
              <img :src="notification.avatar" :alt="notification.type" />
            </ion-avatar>
            <div class="notification-content">
              <div class="notification-message">{{ notification.message }}</div>
              <div class="notification-time">{{ notification.time }}</div>
            </div>
          </div>
    
          <div v-if="notifications.length === 0" class="empty-state">
            <ion-icon :icon="notificationsIcon" class="empty-icon" />
            <p class="empty-text">No tienes notificaciones</p>
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
            <ion-button class="footer-button active">
              <ion-icon :icon="notificationsIcon" />
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
            <div v-for="(message, index) in helpMessages" 
                 :key="index" 
                 :class="['message', message.type]">
              {{ message.text }}
            </div>
          </div>
          <div class="help-chat-input">
            <ion-input
              v-model="helpNewMessage"
              placeholder="Escribe tu mensaje..."
              class="message-input"
              @keyup.enter="sendHelpMessage"
            />
            <ion-button fill="clear" class="send-button" @click="sendHelpMessage">
              <ion-icon :icon="paperPlaneOutline" />
            </ion-button>
          </div>
        </div>
      </div>
    </ion-page>
    </template>
    
    <script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { 
      IonPage, IonHeader, IonToolbar, IonContent, IonFooter,
      IonButtons, IonButton, IonIcon, IonAvatar, IonInput
    } from '@ionic/vue';
    import { 
      settings, search, helpCircle, home, heart,
      add, notifications as notificationsIcon, paperPlaneOutline
    } from 'ionicons/icons';
    
    const router = useRouter();
    
    // Notifications state
    const notifications = ref([
      {
        type: 'welcome',
        message: '¡Bienvenido a Swaply!',
        time: 'Ahora',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=1',
        read: false
      },
      {
        type: 'price',
        message: 'Paco a bajado de precio el siguiente producto: Silla reclinable de 135€ a 120€',
        time: 'Hace 5 min',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=2',
        read: false
      },
      {
        type: 'message',
        message: 'Paco te ha hablado: Tu pillámelo que te vago el precio y encima...',
        time: 'Hace 10 min',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=3',
        read: true
      }
    ]);
    
    // Help chat state
    const showHelpChat = ref(false);
    const helpNewMessage = ref('');
    const helpMessages = ref([
      { type: 'received', text: '¡Hola! ¿En qué puedo ayudarte con las notificaciones?' }
    ]);
    
    // Help chat functions
    const toggleHelpChat = () => {
      showHelpChat.value = !showHelpChat.value;
    };
    
    const closeHelpChat = () => {
      showHelpChat.value = false;
    };
    
    const sendHelpMessage = () => {
      if (!helpNewMessage.value.trim()) return;
    
      const userMessage = helpNewMessage.value.trim();
      
      helpMessages.value.push({
        type: 'sent',
        text: userMessage
      });
    
      // Clear input immediately
      helpNewMessage.value = '';
    
      // Simulate response
      setTimeout(() => {
        let response = 'Gracias por tu mensaje. Un agente te responderá pronto.';
        
        const lowerCaseMessage = userMessage.toLowerCase();
        if (lowerCaseMessage.includes('notificacion')) {
          response = 'Las notificaciones te mantienen informado sobre actividad importante como mensajes nuevos y cambios de precio.';
        } else if (lowerCaseMessage.includes('precio')) {
          response = 'Recibirás notificaciones cuando los vendedores actualicen los precios de sus productos.';
        } else if (lowerCaseMessage.includes('mensaje')) {
          response = 'Cuando alguien te envíe un mensaje, recibirás una notificación aquí.';
        }
    
        helpMessages.value.push({
          type: 'received',
          text: response
        });
      }, 1000);
    };
    
    // Navigation functions
    const goToHome = () => router.push('/Home1');
    const goToFavorites = () => router.push('/Like1');
    const goToUpload = () => router.push('/Post1');
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
    
    .notifications-content {
      --background: linear-gradient(180deg, #9333EA 0%, #3B82F6 100%);
    }
    
    .notifications-container {
      padding: 1rem;
    }
    
    .notification-item {
      background: white;
      border-radius: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      animation: slideIn 0.3s ease-out;
    }
    
    .notification-item.unread {
      border-left: 4px solid #9333EA;
    }
    
    .notification-avatar {
      width: 3rem;
      height: 3rem;
      flex-shrink: 0;
    }
    
    .notification-content {
      flex: 1;
    }
    
    .notification-message {
      color: #1F2937;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
    
    .notification-time {
      color: #6B7280;
      font-size: 0.875rem;
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50vh;
      color: white;
      text-align: center;
    }
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.8;
    }
    
    .empty-text {
      font-size: 1.1rem;
      opacity: 0.9;
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
      background: rgb(0, 0, 0);
      color: white;
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
    
    