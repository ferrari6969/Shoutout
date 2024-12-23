<template>
  <v-container>
    <!-- Only admins can see the "Add Party" button -->
    <v-row>
      <v-col cols="12">
        <v-btn v-if="isAdmin" color="primary" @click="addParty">Add Party</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="party in parties" :key="party._id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ party.title }}</v-card-title>
          <v-card-subtitle>Team: {{ party.teamName }}</v-card-subtitle>
          <v-card-text>{{ party.description }}</v-card-text>
          <!-- Show edit/delete buttons only if user is admin -->
          <v-card-actions v-if="isAdmin">
            <v-btn @click="editParty(party)">Edit</v-btn>
            <v-btn color="red" @click="deleteParty(party._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog for Add/Edit -->
    <v-dialog v-model="showModal" max-width="500">
      <v-card>
        <v-card-title>{{ isEditMode ? 'Edit Party' : 'Add Party' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.teamName" label="Team Name"></v-text-field>
          <v-text-field v-model="form.title" label="Title"></v-text-field>
          <v-textarea v-model="form.description" label="Description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveParty">{{ isEditMode ? 'Update' : 'Save' }}</v-btn>
          <v-btn @click="showModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TeamPartyService from "../services/TeamPartyService";

export default {
  data() {
    return {
      parties: [],
      showModal: false,
      isEditMode: false,
      form: {
        _id: "",
        teamName: "",
        title: "",
        description: "",
      },
      currentUser: JSON.parse(localStorage.getItem("userData")).user,
    };
  },
  computed: {
    isAdmin() {
      return this.currentUser?.isAdmin || false; 
    },
  },
  methods: {
    async fetchParties() {
      this.parties = await TeamPartyService.fetchParties();
    },
    addParty() {
      if (!this.isAdmin) return;
      this.isEditMode = false;
      this.form = { _id: "", teamName: "", title: "", description: "" };
      this.showModal = true;
    },
    async editParty(party) {
      if (!this.isAdmin) return; 
      this.isEditMode = true;
      this.form = { ...party };
      this.showModal = true;
    },
    async saveParty() {
      if (!this.isAdmin) return; 
      const { _id, teamName, title, description } = this.form;
      if (this.isEditMode) {
        await TeamPartyService.editParty(_id, title, description);
      } else {
        await TeamPartyService.addParty(teamName, title, description, this.currentUser.userId);
      }
      this.showModal = false;
      this.fetchParties();
      this.isEditMode = false;
    },
    async deleteParty(id) {
      if (!this.isAdmin) return; 
      await TeamPartyService.deleteParty(id);
      this.fetchParties();
    },
  },
  created() {
    this.fetchParties();
  },
};
</script>
