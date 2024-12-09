<template>
    <v-dialog 
      v-model="isLoginModalVisible" 
      persistent 
      max-width="500px"
      class="login-modal"
    >
      <v-card>
        <v-card-title class="text-h5">User Login</v-card-title>
        <v-card-text>
          <v-text-field 
            v-model="userId" 
            label="Enter User ID" 
            @keyup.enter="checkUserId"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn 
            color="primary" 
            block 
            @click="checkUserId"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
    
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const emit = defineEmits(['login-success']);
    
  const isLoginModalVisible = ref(true);
  const userId = ref('');
  const router = useRouter();
    
  const checkUserId = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/users/login', { userId: userId.value });
      const userData = response.data;
  
      if (userData) {
        const expirationTime = new Date().getTime() + 3600000; 
        const userDataToStore = {
          ...userData, 
          userId: userId.value,
          expirationTime, 
        };
  
        localStorage.setItem('userData', JSON.stringify(userDataToStore));
  
        userData.value = userDataToStore;
  
        isLoginModalVisible.value = false;
        emit('login-success');
  
        router.push('/dashboard');
      } else {
        alert('Invalid User ID');
      }
    } catch (error) {
      console.error('Error checking user ID:', error);
      alert('Error checking user ID');
    }
  };
    
  watch(() => isLoginModalVisible.value, (newValue) => {
    if (!newValue) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData || new Date().getTime() >= userData.expirationTime) {
        isLoginModalVisible.value = true;
      }
    }
  });
  </script>
  
  <style scoped>
  .login-modal {
    background-color: rgba(0, 0, 0, 0.7);
  }
  </style>
  