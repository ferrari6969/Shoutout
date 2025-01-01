<template>
  <v-container class="video-container">
    <!-- Background Video -->
    <video class="background-video" autoplay loop muted>
      <source src="..\assets\peer2peer.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  
    <!-- Page Heading and Tagline -->
    <div class="heading-container">
      <h1 class="page-title">Peer to Peer Appreciation</h1>
      <p class="tagline">Celebrating the kindness and contributions of individuals</p>
    </div>

    <!-- Add Appreciation Button -->
    <v-row class="button-container">
      <v-col cols="12">
        <v-btn color="primary" @click="openAddModal">Add Appreciation</v-btn>
      </v-col>
    </v-row>

    <!-- Appreciation Posts -->
    <v-row>
      <v-col v-for="app in appreciations" :key="app._id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ app.title }}</v-card-title>
          <v-card-subtitle>From: {{ app.fromUser }} | To: {{ app.toUser }}</v-card-subtitle>
          <v-card-text>{{ app.description }}</v-card-text>
          <v-card-actions v-if="app.fromUser === currentUser.userId">
            <v-btn @click="openEditModal(app)">Edit</v-btn>
            <v-btn color="red" @click="deleteAppreciation(app._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog for Add/Edit -->
    <v-dialog v-model="showModal" max-width="500">
      <v-card>
        <v-card-title>{{ isEditMode ? 'Edit Appreciation' : 'Add Appreciation' }}</v-card-title>
        <v-card-text>
          <v-select 
            v-model="form.toUser" 
            :items="formattedUsers"
            label="Select User"
            outlined
          ></v-select>
          <v-text-field v-model="form.title" label="Title"></v-text-field>
          <v-textarea v-model="form.description" label="Description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveAppreciation">{{ isEditMode ? 'Update' : 'Save' }}</v-btn>
          <v-btn @click="closeModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import UserService from "../services/UserService";
import AppreciationService from "../services/appreciationService";

export default {
  data() {
    return {
      appreciations: [],
      users: [],
      showModal: false,
      isEditMode: false,
      form: this.resetForm(),
      currentUser: JSON.parse(localStorage.getItem('userData')).user,
    };
  },
  methods: {
    async fetchAppreciations() {
      this.appreciations = await AppreciationService.fetchAppreciations();
    },
    async fetchUsers() {
      this.users = await UserService.fetchUsers();
    },

    // Resets form to its initial state
    resetForm() {
      return {
        _id: "",
        toUser: "",
        title: "",
        description: "",
      };
    },

    // Open modal for adding a new appreciation
    openAddModal() {
      this.form = this.resetForm();
      this.isEditMode = false;
      this.showModal = true;
    },

    // Open modal for editing an appreciation
    openEditModal(app) {
      this.form = { ...app };
      this.isEditMode = true;
      this.showModal = true;
    },

    // Save appreciation based on mode (Add/Edit)
    async saveAppreciation() {
      const { _id, toUser, title, description } = this.form;
      if (this.isEditMode) {
        await AppreciationService.editAppreciation(_id, title, description);
      } else {
        const fromUser = this.currentUser.userId;
        await AppreciationService.addAppreciation(fromUser, toUser, title, description);
      }
      this.closeModal();
      this.fetchAppreciations();
    },

    // Close modal and reset form
    closeModal() {
      this.showModal = false;
      this.form = this.resetForm();
      this.isEditMode = false;
    },

    async deleteAppreciation(id) {
      await AppreciationService.deleteAppreciation(id);
      this.fetchAppreciations();
    },
  },
  created() {
    this.fetchAppreciations();
    this.fetchUsers();
  },
  computed: {
    formattedUsers() {
      return this.users.map(user => ({
        title: user.name,
        value: user.userId
      }));
    }
  },
};
</script>

<style scoped>
/* Full-screen background video */
.video-container {
  position: fixed; /* Ensures the container stays in place even when scrolling */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Full viewport height */
  overflow: hidden; /* Prevents scrolling from affecting the video */
}

.background-video {
  position: fixed; /* Ensures the video stays in place */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Covers the full container without distortion */
  z-index: -1; /* Places the video behind all other elements */
}

.v-container {
  position: relative; /* Keep the content above the video */
  z-index: 1;
  padding-top: 20px; /* Optional: Add padding to avoid content overlapping */
}

/* Heading and tagline styles */
/* Heading and tagline styles */
.heading-container {
  position: absolute;
  top: 2%; /* Adjusted to move the heading higher */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  z-index: 1;
}

.page-title {
  font-size: 3rem;
  font-weight: bold;
}

.tagline {
  font-size: 1.2rem;
  margin-top: 10px;
}


/* Styling for the Add Appreciation button */
.button-container {
  position: relative;
  margin-top: 80px; /* Adjust space below the heading */
  text-align: center;
  z-index: 1;
}

/* Make the card content below the button */
.v-row {
  padding-top: 20px;
}
</style>
