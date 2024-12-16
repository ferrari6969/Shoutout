<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="showModal = true">Add Appreciation</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="app in appreciations" :key="app._id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ app.title }}</v-card-title>
          <v-card-subtitle>From: {{ app.fromUser }} | To: {{ app.toUser }}</v-card-subtitle>
          <v-card-text>{{ app.description }}</v-card-text>
          <v-card-actions v-if="app.fromUser === currentUser.userId">
            <v-btn @click="editAppreciation(app)">Edit</v-btn>
            <v-btn color="red" @click="deleteAppreciation(app._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

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
          <v-btn @click="showModal = false">Cancel</v-btn>
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
      form: {
        _id: "",
        toUser: "",
        title: "",
        description: "",
      },
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
    async addAppreciation() {
      const { toUser, title, description } = this.form;
      const fromUser = this.currentUser.userId;
      await AppreciationService.addAppreciation(fromUser, toUser, title, description);
      this.showModal = false;
      this.fetchAppreciations();
    },
    async editAppreciation(app) {
      this.isEditMode = true;
      this.form = { ...app };
      this.showModal = true;
    },
    async saveAppreciation() {
      const { _id, toUser, title, description } = this.form;
      if (this.isEditMode) {
        await AppreciationService.editAppreciation(_id, title, description);
      } else {
        const fromUser = this.currentUser.userId;
        await AppreciationService.addAppreciation(fromUser, toUser, title, description);
      }
      this.showModal = false;
      this.fetchAppreciations();
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
