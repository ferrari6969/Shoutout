<template>
  <v-container>
    <!-- Only admins can see the "Add Event" button -->
    <v-row>
      <v-col cols="12">
        <v-btn v-if="isAdmin" color="primary" @click="addEvent">Add Event</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="event in events" :key="event._id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ event.title }}</v-card-title>
          <v-card-subtitle>Team: {{ event.teamName }}</v-card-subtitle>
          <v-card-text>{{ event.description }}</v-card-text>
          <!-- Show edit/delete buttons only if user is admin -->
          <v-card-actions v-if="isAdmin">
            <v-btn @click="editEvent(event)">Edit</v-btn>
            <v-btn color="red" @click="deleteEvent(event._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog for Add/Edit -->
    <v-dialog v-model="showModal" max-width="500">
      <v-card>
        <v-card-title>{{ isEditMode ? 'Edit Event' : 'Add Event' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.teamName" label="Team Name"></v-text-field>
          <v-text-field v-model="form.title" label="Title"></v-text-field>
          <v-textarea v-model="form.description" label="Description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEvent">{{ isEditMode ? 'Update' : 'Save' }}</v-btn>
          <v-btn @click="showModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import OfficialEventService from "../services/OfficialEventService";

export default {
  data() {
    return {
      events: [],
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
      return this.currentUser?.isAdmin || false; // Check if the user is an admin
    },
  },
  methods: {
    async fetchEvents() {
      this.events = await OfficialEventService.fetchEvents();
    },
    addEvent() {
      if (!this.isAdmin) return; // Prevent non-admins from accessing this action
      this.isEditMode = false;
      this.form = { _id: "", teamName: "", title: "", description: "" };
      this.showModal = true;
    },
    async editEvent(event) {
      if (!this.isAdmin) return; // Prevent non-admins from accessing this action
      this.isEditMode = true;
      this.form = { ...event };
      this.showModal = true;
    },
    async saveEvent() {
      if (!this.isAdmin) return; // Prevent non-admins from saving
      const { _id, teamName, title, description } = this.form;
      if (this.isEditMode) {
        await OfficialEventService.editEvent(_id, title, description);
      } else {
        await OfficialEventService.addEvent(teamName, title, description, this.currentUser.userId);
      }
      this.showModal = false;
      this.fetchEvents();
      this.isEditMode = false;
    },
    async deleteEvent(id) {
      if (!this.isAdmin) return; // Prevent non-admins from deleting
      await OfficialEventService.deleteEvent(id);
      this.fetchEvents();
    },
  },
  created() {
    this.fetchEvents();
  },
};
</script>
