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
  
      <ion-content :fullscreen="true" class="chat-content">
        <div class="messages-container">
          <div v-for="(message, index) in messages" 
               :key="index" 
               :class="['message-wrapper', message.type]">
            <ion-avatar class="message-avatar">
              <img :src="message.avatar" :alt="message.type" />
            </ion-avatar>
            <div class="message-bubble">
              {{ message.text }}
            </div>
          </div>
        </div>
      </ion-content>
  
      <ion-footer class="ion-no-border">
        <div class="input-container">
          <ion-input
            v-model="newMessage"
            placeholder="Escribe un mensaje..."
            class="message-input"
            @keyup.enter="sendMessage"
          />
          <ion-button fill="clear" class="send-button" @click="sendMessage">
            <ion-icon :icon="send" />
          </ion-button>
        </div>
  
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
              class="help-message-input"
              @keyup.enter="sendHelpMessage"
            />
            <ion-button fill="clear" class="help-send-button" @click="sendHelpMessage">
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
    add, mail, send, paperPlaneOutline
  } from 'ionicons/icons';
  
  const router = useRouter();
  const newMessage = ref('');
  const messages = ref([
    {
      type: 'received',
      text: 'Buenas me interesa',
      avatar: 'https://i.pravatar.cc/300?img=2'
    },
    {
      type: 'sent',
      text: 'Perfecto quedamos en algun sitio',
      avatar: 'https://i.pravatar.cc/300?img=1'
    }
  ]);
  
  // Help chat state
  const showHelpChat = ref(false);
  const helpNewMessage = ref('');
  const helpMessages = ref([
    { type: 'received', text: '¡Hola! ¿En qué puedo ayudarte con el chat?' }
  ]);
  
  const sendMessage = () => {
    if (!newMessage.value.trim()) return;
    
    messages.value.push({
      type: 'sent',
      text: newMessage.value,
      avatar: 'https://i.pravatar.cc/300?img=1'
    });
    
    newMessage.value = '';
  
    // Simular respuesta después de 1 segundo
    setTimeout(() => {
      messages.value.push({
        type: 'received',
        text: 'Vale, ¿dónde te gustaría quedar?',
        avatar: 'https://i.pravatar.cc/300?img=2'
      });
    }, 1000);
  };
  
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
  
    // Clear the input field immediately
    helpNewMessage.value = '';
  
    // Simulate help response
    setTimeout(() => {
      let response = 'Gracias por tu mensaje. Un agente te responderá pronto.';
      
      const lowerCaseMessage = userMessage.toLowerCase();
      if (lowerCaseMessage.includes('mensaje')) {
        response = 'Para enviar un mensaje, simplemente escribe en la barra inferior y presiona el botón de enviar.';
      } else if (lowerCaseMessage.includes('quedar')) {
        response = 'Puedes acordar un punto de encuentro seguro con el otro usuario para realizar el intercambio.';
      } else if (lowerCaseMessage.includes('bloquear')) {
        response = 'Si tienes problemas con un usuario, puedes reportarlo o bloquearlo desde su perfil.';
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
  
  .chat-content {
    --background: linear-gradient(180deg, #9333EA 0%, #3B82F6 100%);
  }
  
  .messages-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .message-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    max-width: 80%;
  }
  
  .message-wrapper.received {
    align-self: flex-start;
  }
  
  .message-wrapper.sent {
    align-self: flex-end;
    flex-direction: row-reverse;
  }
  
  .message-avatar {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }
  
  .message-bubble {
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .message-wrapper.received .message-bubble {
    background: white;
    color: #333;
    border-top-left-radius: 0;
  }
  
  .message-wrapper.sent .message-bubble {
    background: #030403;
    color: white;
    border-top-right-radius: 0;
  }
  
  .input-container {
    background: white;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-top: 1px solid #E5E7EB;
  }
  
  .message-input {
    --background: #F3F4F6;
    --border-radius: 1.5rem;
    --padding-start: 1rem;
    --padding-end: 1rem;
    --placeholder-color: #9CA3AF;
    --color: #333;
  }
  
  .send-button {
    --color: #9333EA;
    font-size: 1.5rem;
    margin: 0;
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
  
  /* Animation for help chat appearance */
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
  
  