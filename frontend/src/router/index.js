import { createRouter, createWebHistory } from 'vue-router';

// Lazy-load components for better performance
const Dashboard = () => import('../views/Dashboard.vue');
const Birthday = () => import('../views/Birthday.vue');
const WorkAnniversary = () => import('../views/WorkAnniversary.vue');
const Peer2PeerAppreciation = () => import('../views/Peer2PeerAppreciation.vue');
const TeamAchievements = () => import('../views/TeamAchievements.vue');
const Festivals = () => import('../views/Festivals.vue');
const TeamParties = () => import('../views/TeamParties.vue');
const OfficialEvents = () => import('../views/OfficialEvents.vue');
const LoginView = () => import('../components/LoginModal.vue'); 

const authGuard = (to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData && new Date().getTime() < userData.expirationTime) {
    next(); 
  } else {
    localStorage.removeItem('userData');
    localStorage.removeItem('avatarId');
    next('/login'); 
  }
};

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { hideNavigation: true } 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: authGuard,
    meta: { title: 'Dashboard' }
  },
  {
    path: '/birthdays',
    name: 'Birthdays',
    component: Birthday,
    beforeEnter: authGuard,
    meta: { title: 'Birthdays' }
  },
  {
    path: '/workAnniversary',
    name: 'WorkAnniversary',
    component: WorkAnniversary,
    beforeEnter: authGuard,
    meta: { title: 'Work Anniversary' }
  },
  {
    path: '/peer2peerAppreciation',
    name: 'peer2peerAppreciation',
    component: Peer2PeerAppreciation,
    beforeEnter: authGuard,
    meta: { title: 'Peer Appreciation' }
  },
  {
    path: '/teamAchievements',
    name: 'TeamAchievements',
    component: TeamAchievements,
    beforeEnter: authGuard,
    meta: { title: 'Team Achievements' }
  },
  {
    path: '/festivals',
    name: 'Festivals',
    component: Festivals,
    beforeEnter: authGuard,
    meta: { title: 'Festivals' }
  },
  {
    path: '/teamParties',
    name: 'TeamParties',
    component: TeamParties,
    beforeEnter: authGuard,
    meta: { title: 'Team Parties' }
  },
  {
    path: '/officialEvents',
    name: 'OfficialEvents',
    component: OfficialEvents,
    beforeEnter: authGuard,
    meta: { title: 'Official Events' }
  },
  {
    // Catch-all route for 404 Not Found
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'), // Create a basic NotFound view
    meta: { hideNavigation: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top on route change
    return { top: 0 }
  }
});

// Navigation title guard
router.beforeEach((to, from, next) => {
  // Update document title based on route meta
  document.title = to.meta.title 
    ? `ShoutOut - ${to.meta.title}` 
    : 'ShoutOut';
  
  next();
});

export default router;