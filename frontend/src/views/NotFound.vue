<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <v-icon size="100" color="error">mdi-alert-circle-outline</v-icon>
          <h1 class="text-h4 my-4">Page Not Found</h1>
          <p class="text-body-1">The page you are looking for does not exist.</p>
          <v-btn 
            color="primary" 
            to="/dashboard" 
            class="mt-4"
          >
            Go to Dashboard
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  // Optional: Add any additional logic if needed
  </script>