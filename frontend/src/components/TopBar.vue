<template>
  <v-app-bar color="primary" elevation="2">
    <!-- ShoutOut Title (Navigates to Dashboard) -->
    <v-btn text :to="{ path: '/Dashboard' }" class="shoutout-title-btn">
      <v-app-bar-title>ShoutOut</v-app-bar-title>
    </v-btn>

    <!-- Navigation Buttons -->
    <v-spacer />
    <v-btn text :to="{ path: '/birthdays' }">Birthdays</v-btn>
    <v-btn text :to="{ path: '/workAnniversary' }">Work Anniversary</v-btn>
    <v-btn text :to="{ path: '/peer2peerAppreciation' }">Peer-to-Peer Appreciation</v-btn>
    <v-btn text :to="{ path: '/teamAchievements' }">Team Achievements</v-btn>
    <v-btn text :to="{ path: '/festivals' }">Festivals</v-btn>
    <v-btn text :to="{ path: '/teamParties' }">Team Parties</v-btn>
    <v-btn text :to="{ path: '/officialEvents' }">Official Events</v-btn>

    <!-- Avatar and User Menu -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar color="secondary" v-bind="props" size="40">
          <v-img v-if="displayAvatar" :src="displayAvatar" cover>
            <template v-slot:placeholder>
              <v-layout justify-center align-center fill-height>
                <v-progress-circular color="grey" indeterminate></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
          <span v-else class="text-white">{{ userInitials }}</span>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item @click="openAvatarSelection">
          <v-list-item-title>Choose Avatar</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Avatar Selection Dialog -->
    <v-dialog v-model="avatarDialog" max-width="500px">
      <v-card>
        <v-card-title>Choose Your Avatar</v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="avatar in avatars" :key="avatar.id" cols="4" class="d-flex justify-center">
              <v-btn @click="selectAvatar(avatar.id)" icon>
                <v-avatar>
                  <v-img :src="avatar.src" />
                </v-avatar>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeAvatarSelection">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>



<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { updateAvatar } from '@/services/userService';

import avatar1 from '@/assets/avatar1.svg';
import avatar2 from '@/assets/avatar2.svg';
import avatar3 from '@/assets/avatar3.svg';
import avatar4 from '@/assets/avatar4.svg';
import avatar5 from '@/assets/avatar5.svg';
import avatar6 from '@/assets/avatar6.svg';
import avatar7 from '@/assets/avatar7.svg';
import avatar8 from '@/assets/avatar8.svg';

const router = useRouter();

// Define the available avatars
const avatars = ref([
  { id: 'avatar1', src: avatar1 },
  { id: 'avatar2', src: avatar2 },
  { id: 'avatar3', src: avatar3 },
  { id: 'avatar4', src: avatar4 },
  { id: 'avatar5', src: avatar5 },
  { id: 'avatar6', src: avatar6 },
  { id: 'avatar7', src: avatar7 },
  { id: 'avatar8', src: avatar8 },
]);

// Reactive user data
const userData = ref(JSON.parse(localStorage.getItem('userData')) || {});
const userId = computed(() => userData.value?.userId);

// Reactive reference for avatarId and avatar selection dialog
const avatarDialog = ref(false);

// Compute user initials
const userInitials = computed(() => {
  const name = userData.value?.name || 'User';
  return name.charAt(0).toUpperCase();
});

// Display the avatar based on the selected userAvatar
const displayAvatar = computed(() => {
  if (!userData.value?.user?.avatarId) return null;
  const avatarSrc = avatars.value.find(a => a.id === userData.value.user.avatarId)?.src;
  return avatarSrc || null;
});

// Watch for changes in user data to keep avatar updated
watch(() => userData.value, (newUserData) => {
  if (newUserData?.user?.avatarId) {
    displayAvatar.value = avatars.value.find(a => a.id === newUserData.user.avatarId)?.src;
  }
});

// Open the avatar selection dialog
const openAvatarSelection = () => {
  avatarDialog.value = true;
};

// Close the avatar selection dialog
const closeAvatarSelection = () => {
  avatarDialog.value = false;
};

// Handle avatar selection
const selectAvatar = async (avatarId) => {
  try {
    // Update avatar on the backend
    const updatedUser = await updateAvatar(userId.value, avatarId);

    // Update the entire user data in localStorage
    const currentUserData = { ...JSON.parse(localStorage.getItem('userData')) };
    currentUserData.user.avatarId = updatedUser.avatarId;
    localStorage.setItem('userData', JSON.stringify(currentUserData));

    // Update the reactive userData
    userData.value = currentUserData; // Force the update in reactive state

    closeAvatarSelection();
  } catch (error) {
    console.error('Failed to update avatar:', error.message);
  }
};

// Handle user logout
const handleLogout = () => {
  localStorage.removeItem('userData'); // Clear user data from localStorage
  userData.value = {}; // Clear reactive user data state
  router.push('/login'); // Navigate to login page
};
</script>
