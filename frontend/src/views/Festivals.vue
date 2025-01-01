<template>
  <div class="festival-page">
    <h1>🎉 Festivals 🎉</h1>

    <!-- Today's Festival -->
    <section v-if="todayFestival">
      <h2>Today's Festival</h2>
      <div>
        <h3>{{ todayFestival.name }}</h3>
        <video controls :src="`/videos/${todayFestival.videoId}.mp4`"></video>
      </div>
    </section>

    <!-- Past Festivals -->
    <section>
      <h2>Past Festivals</h2>
      <div v-for="festival in pastFestivals" :key="festival.festivalId" class="festival-post">
        <h3>{{ festival.name }}</h3>
        <video controls :src="`/videos/${festival.videoId}.mp4`"></video>
      </div>
      <button v-if="!loading && !endOfList" @click="fetchMoreFestivals">Load More</button>
    </section>
  </div>
</template>

<script>
import FestivalService from "../services/festivalService";

export default {
  data() {
    return {
      todayFestival: null,
      pastFestivals: [],
      offset: 0,
      limit: 10,
      endOfList: false,
      loading: false,
    };
  },
  async mounted() {
    try {
      this.todayFestival = await FestivalService.fetchTodayFestival();
    } catch (err) {
      console.warn("No festival today:", err.message);
    }
    await this.fetchMoreFestivals();
  },
  methods: {
    async fetchMoreFestivals() {
      if (this.loading || this.endOfList) return;

      this.loading = true;
      try {
        const festivals = await FestivalService.fetchPastFestivals(this.offset, this.limit);
        if (festivals.length < this.limit) this.endOfList = true;
        this.pastFestivals.push(...festivals);
        this.offset += this.limit;
      } catch (err) {
        console.error("Error fetching past festivals:", err.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.festival-page {
  text-align: center;
  padding: 20px;
}

video {
  width: 80%; /* Set video width to 80% of the container */
  display: block; /* Ensures margin auto works */
  margin: 20px auto; /* Centers the video horizontally */
}

.festival-post {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}
</style>

