<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item link :to="{ path: '/Dashboard' }">Dashboard</v-list-item>
      <v-list-item link :to="{ path: '/birthdays' }">Birthdays</v-list-item>
      <v-list-item link :to="{ path: '/workAnniversary' }">Work Anniversary</v-list-item>
      <v-list-item link :to="{ path: '/peer2peerAppreciation' }">Peer-to-Peer Appreciation</v-list-item>
      <v-list-item link :to="{ path: '/teamAchievements' }">Team Achievements</v-list-item>
      <v-list-item link :to="{ path: '/festivals' }">Festivals</v-list-item>
      <v-list-item link :to="{ path: '/teamParties' }">Team Parties</v-list-item>
      <v-list-item link :to="{ path: '/officialEvents' }">Official Events</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>