import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import birthday from '../views/Birthday.vue'; 
import workAnniversary from '../views/WorkAnniversary.vue'; 
import peer2peerAppreciation from '../views/Peer2PeerAppreciation.vue'; 
import teamAchievements from '../views/TeamAchievements.vue'; 
import festivals from '../views/Festivals.vue';
import teamParties from '../views/TeamParties.vue'; 
import officialEvents from '../views/OfficialEvents.vue'; 

const routes = [
  { path: '/', redirect: '/Dashboard' },
  // { path: '/login', component: LoginPage },
  {
    path: '/Dashboard',
    component: Dashboard,
    // meta: { requiresAuth: true },
  },
  {
    path: '/birthdays',
    component: birthday,
    // meta: { requiresAuth: true },
  },
  {
    path: '/workAnniversary',
    component: workAnniversary,
    // meta: { requiresAuth: true },
  },
  {
    path: '/peer2peerAppreciation',
    component: peer2peerAppreciation,
    // meta: { requiresAuth: true },
  },
  {
    path: '/teamAchievements',
    component: teamAchievements,
    // meta: { requiresAuth: true },
  },
  {
    path: '/festivals',
    component: festivals,
    // meta: { requiresAuth: true },
  },
  {
    path: '/teamParties',
    component: teamParties,
    // meta: { requiresAuth: true },
  },
  {
    path: '/officialEvents',
    component: officialEvents,
    // meta: { requiresAuth: true },
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
