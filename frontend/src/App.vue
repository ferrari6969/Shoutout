<template>
  <v-app>
    <LoginModal 
      v-if="!isLoggedIn" 
      @login-success="onLoginSuccess"
    />
    <template v-else>
      <TopBar @logout="logout" />
      <Sidebar />
      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './components/LoginModal.vue';
import TopBar from './components/TopBar.vue';
import Sidebar from './components/Sidebar.vue';

const router = useRouter();
const isLoggedIn = ref(false);

const checkUserLoginStatus = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  if (userData && new Date().getTime() < userData.expirationTime) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
};

const onLoginSuccess = () => {
  isLoggedIn.value = true;
};

const logout = () => {
  localStorage.removeItem('userData');
  localStorage.removeItem('avatarId');
  isLoggedIn.value = false;
  router.push('/login');
};

onMounted(() => {
  checkUserLoginStatus();
});
</script>

<style>
/* Prevent scrolling and add blur effect when not logged in */
.v-application__wrap {
  overflow: hidden;
}
</style>