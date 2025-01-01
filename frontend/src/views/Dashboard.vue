<template>
  <div class="dashboard">
    <div class="background-video">
      <video autoplay loop muted>
        <source src="..\assets\dashboard_bg.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <h1 class="welcome-title"> 🙌🎉 ShoutOut Wall 🎉🙌 </h1>
    <div class="tiles-container">
      <!-- Birthday Tile -->
      <div class="tile birthday" @click="navigateTo('/birthdays')">
        <h1> 🎂 </h1>
        <h2>Birthday Celebrations </h2>
        <p>Celebrate your colleagues' special day!</p>
      </div>
      <!-- Work Anniversary Tile -->
      <div class="tile work-anniversary" @click="navigateTo('/workAnniversary')">
        <h1> 💼 </h1>
        <h2>Work Anniversaries </h2>
        <p>Mark and celebrate milestones together!</p>
      </div>
      <!-- Peer Appreciation Tile -->
      <div class="tile peer-appreciation" @click="navigateTo('/peer2peerAppreciation')">
        <h1> 🤝 </h1>
        <h2>Peer-2-Peer Appreciation</h2>
        <p>Express gratitude and uplift the team spirit!</p>
      </div>
      <!-- Team Achievements Tile -->
      <div class="tile team-achievements" @click="navigateTo('/teamAchievements')">
        <h1> 👯‍♂️👯‍♀️ </h1>
        <h2>Team Achievements</h2>
        <p>Celebrate success and inspire more!</p>
      </div>
      <!-- Festivals Tile -->
      <div class="tile festivals" @click="navigateTo('/festivals')">
        <h1> 🪔 </h1>
        <h2>Festivals</h2>
        <p>Embrace cultural diversity and joy.</p>
      </div>
      <!-- Team Parties Tile -->
      <div class="tile team-parties" @click="navigateTo('/teamParties')">
        <h1> 🥂 </h1>
        <h2>Team Parties</h2>
        <p>Unwind and have fun together.</p>
      </div>
      <!-- Official Events Tile -->
      <div class="tile official-events" @click="navigateTo('/officialEvents')">
        <h1> 🏆 </h1>
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
  position: relative; 
  z-index: 1;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  z-index: -1; 
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); 
  z-index: -1; 
}

.welcome-title {
  font-size: 3rem; /* Adjust font size as needed */
  color:rgb(245, 238, 238);
  margin-bottom: 30px; /* Spacing between the title and tiles */
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
  justify-items: center; /* Ensures tiles are centered within each grid cell */
  justify-content: center; /* Ensure tiles are centered in the container */
}

.tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px; /* Fixed height for all tiles */
  width: 100%; 
  max-width: 500px;
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
  background: linear-gradient(135deg, #a7c7f3, #81d4fa );
}

.work-anniversary {
  background: linear-gradient(135deg, #a8e6a0, #c8e6c9);
}

.peer-appreciation {
  background: linear-gradient(135deg,#80D8D8, #AEE8F8);
}

.team-achievements {
  background: linear-gradient(135deg, #d1a0d5, #f0a1c5 );
}

.festivals {
  background: linear-gradient(135deg, #f9e79f, #f7c17d);
}

.team-parties {
  background: linear-gradient(135deg, #c1a1e3, #b2a7d7 );
}

.official-events {
  background: linear-gradient(135deg, #b0c4cc, #d1d8e0);
}

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