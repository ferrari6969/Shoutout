<template>
  <div class="dashboard">
    <h1>Welcome to the ShoutOut</h1>
    <div class="tiles-container">
      <!-- Birthday Tile -->
      <div class="tile birthday" @click="navigateTo('/birthdays')">
        <h2>Birthday Celebrations</h2>
        <p>Celebrate your colleagues' special day!</p>
      </div>
      <!-- Work Anniversary Tile -->
      <div class="tile work-anniversary" @click="navigateTo('/workAnniversary')">
        <h2>Work Anniversaries</h2>
        <p>Mark and celebrate milestones together!</p>
      </div>
      <!-- Peer Appreciation Tile -->
      <div class="tile peer-appreciation" @click="navigateTo('/peer2peerAppreciation')">
        <h2>Peer-to-Peer Appreciation</h2>
        <p>Express gratitude and uplift the team spirit!</p>
      </div>
      <!-- Team Achievements Tile -->
      <div class="tile team-achievements" @click="navigateTo('/teamAchievements')">
        <h2>Team Achievements</h2>
        <p>Celebrate success and inspire more!</p>
      </div>
      <!-- Festivals Tile -->
      <div class="tile festivals" @click="navigateTo('/festivals')">
        <h2>Festivals</h2>
        <p>Embrace cultural diversity and joy.</p>
      </div>
      <!-- Team Parties Tile -->
      <div class="tile team-parties" @click="navigateTo('/teamParties')">
        <h2>Team Parties</h2>
        <p>Unwind and have fun together.</p>
      </div>
      <!-- Official Events Tile -->
      <div class="tile official-events" @click="navigateTo('/officialEvents')">
        <h2>Official Events</h2>
        <p>Stay connected with organizational events.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.tiles-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
}

.tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px; /* Fixed height for all tiles */
  width: 100%; 
  max-width: 300px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.tile:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.tile h2 {
  font-size: 1.5rem;
  color: #222;
  margin-bottom: 10px;
  height: 2rem; /* Consistent height for titles */
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile p {
  font-size: 1rem;
  color: #666;
  height: 3rem; /* Consistent height for descriptions */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.tile::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.tile:hover::before {
  opacity: 1;
}

.birthday {
  background: linear-gradient(135deg, #ffeb3b, #ff9800);
}

.work-anniversary {
  background: linear-gradient(135deg, #2196f3, #03a9f4);
}

.peer-appreciation {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
}

.team-achievements {
  background: linear-gradient(135deg, #9c27b0, #e91e63);
}

.festivals {
  background: linear-gradient(135deg, #ffc107, #ff5722);
}

.team-parties {
  background: linear-gradient(135deg, #673ab7, #3f51b5);
}

.official-events {
  background: linear-gradient(135deg, #607d8b, #9e9e9e);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .tiles-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .tiles-container {
    grid-template-columns: 1fr;
  }
}
</style>