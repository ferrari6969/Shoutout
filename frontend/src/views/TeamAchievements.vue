<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="addAchievement">Add Achievement</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="achievement in achievements" :key="achievement._id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ achievement.title }}</v-card-title>
          <v-card-subtitle>Team: {{ achievement.teamName }}</v-card-subtitle>
          <v-card-text>{{ achievement.description }}</v-card-text>
          <v-card-actions v-if="achievement.createdBy === currentUser.userId">
            <v-btn @click="editAchievement(achievement)">Edit</v-btn>
            <v-btn color="red" @click="deleteAchievement(achievement._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog for Add/Edit -->
    <v-dialog v-model="showModal" max-width="500">
      <v-card>
        <v-card-title>{{ isEditMode ? 'Edit Achievement' : 'Add Achievement' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.teamName" label="Team Name"></v-text-field>
          <v-text-field v-model="form.title" label="Title"></v-text-field>
          <v-textarea v-model="form.description" label="Description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveAchievement">{{ isEditMode ? 'Update' : 'Save' }}</v-btn>
          <v-btn @click="showModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TeamAchievementService from "../services/TeamAchievementService";

export default {
  data() {
    return {
      achievements: [],
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
  methods: {
  async fetchAchievements() {
    this.achievements = await TeamAchievementService.fetchAchievements();
  },
  addAchievement() {
    // Reset the form and set isEditMode to false
    this.isEditMode = false;
    this.form = {
      _id: "",
      teamName: "",
      title: "",
      description: "",
    };
    this.showModal = true;
  },
  async editAchievement(achievement) {
    this.isEditMode = true;
    this.form = { ...achievement };
    this.showModal = true;
  },
  async saveAchievement() {
    const { _id, teamName, title, description } = this.form;
    if (this.isEditMode) {
      await TeamAchievementService.editAchievement(_id, title, description);
    } else {
      await TeamAchievementService.addAchievement(teamName, title, description, this.currentUser.userId);
    }
    this.showModal = false;
    this.fetchAchievements();
    this.isEditMode = false;
  },
  async deleteAchievement(id) {
    await TeamAchievementService.deleteAchievement(id);
    this.fetchAchievements();
  },
},

  created() {
    this.fetchAchievements();
  },
};
</script>
