<template>
  <div class="post-component">
    <!-- Background Video -->
    <div class="background-video">
      <video autoplay loop muted>
        <source src="../assets/birthday.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <h1>🎉 Birthday Celebrations 🎉</h1>
    <p>Wish your colleague a very happy birthday !!!</p>

    <!-- Today's Birthdays -->
    <section v-if="todaysBirthdays.length">
      <h2>Today's Birthdays</h2>
      <div class="birthday-list">
        <div 
          v-for="birthday in todaysBirthdays" 
          :key="birthday.bdId" 
          class="birthday-card"
        >
          <h2>{{ birthday.name }}</h2>
          <p>🎂 Date: {{ new Date(birthday.dateOfBirth).toLocaleDateString() }} 🎂</p>

          <div v-for="comment in birthday.comments" :key="comment.commentId" class="comment">
            <strong>{{ comment.author || "Anonymous" }}:</strong> {{ comment.content }}

            <span 
                v-if="comment.userId === currentUserId" 
                @click="editComment(birthday.bdId, comment)"
                class="edit-btn"
            >
                ✏️
            </span>
          </div>

          <form @submit.prevent="addComment(birthday.bdId)" class="add-comment">
            <input 
              v-model="newComment[birthday.bdId]" 
              type="text" 
              placeholder="Add a comment..."
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </section>
    <p v-else>No birthdays today!</p>

    <!-- Past Birthdays -->
    <section v-if="pastBirthdays.length">
      <h2>Past Birthdays</h2>
      <div class="birthday-list">
        <div 
          v-for="birthday in pastBirthdays" 
          :key="birthday.bdId" 
          class="birthday-card"
        >
          <h2>{{ birthday.name }}</h2>
          <p>🎂 Date: {{ new Date(birthday.dateOfBirth).toLocaleDateString() }} 🎂</p>

          <div v-for="comment in birthday.comments" :key="comment.commentId" class="comment">
            <strong>{{ comment.author || "Anonymous" }}:</strong> {{ comment.content }}

            <span 
                v-if="comment.userId === currentUserId" 
                @click="editComment(birthday.bdId, comment)"
                class="edit-btn"
            >
                ✏️
            </span>
          </div>

          <form @submit.prevent="addComment(birthday.bdId)" class="add-comment">
            <input 
              v-model="newComment[birthday.bdId]" 
              type="text" 
              placeholder="Add a comment..."
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </section>
    <p v-else>No past birthdays!</p>
  </div>
</template>


<script>
import BirthdayService from "../services/BirthdayService";

export default {
  name: "PostComponent",
  data() {
    return {
      birthdays: [],
      todaysBirthdays: [],
      pastBirthdays: [],
      newComment: {}, 
      currentUserId: JSON.parse(localStorage.getItem('userData'))?.user?.userId || null, 
      currentUser: JSON.parse(localStorage.getItem('userData'))?.user?.name || null,
      loading: true,
      error: null,
    };
  },

  methods: {
    async fetchBirthdays() {
      try {
        this.loading = true;
        const allBirthdays = await BirthdayService.fetchBirthdays();
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0]; 

        this.todaysBirthdays = allBirthdays.filter(birthday => {
          const bdDate = new Date(birthday.dateOfBirth).toISOString().split("T")[0];
          return bdDate === todayStr;
        });

        this.pastBirthdays = allBirthdays.filter(birthday => {
          const bdDate = new Date(birthday.dateOfBirth).toISOString().split("T")[0];
          return bdDate < todayStr;
        });

        this.birthdays = allBirthdays; 
      } catch (err) {
        this.error = "Failed to load birthdays!";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addComment(bdId) {
      try {
        const content = this.newComment[bdId]?.trim();
        if (!content) return alert("Comment cannot be empty!");

        await BirthdayService.addComment(bdId, content, this.currentUser, this.currentUserId);

        await this.fetchBirthdays();
        this.newComment[bdId] = ""; 
      } catch (err) {
        console.error("Failed to add comment:", err);
        alert("Failed to add comment. Please try again!");
      }
    },

    async editComment(bdId, comment) {
      if (comment.userId !== this.currentUserId) {
        return alert("You can only edit your own comments!");
      }

      const newContent = prompt("Edit your comment:", comment.content);
      if (!newContent || newContent.trim() === comment.content) return;

      try {
        await BirthdayService.editComment(bdId, comment.commentId, newContent);

        await this.fetchBirthdays();
      } catch (err) {
        console.error("Failed to edit comment:", err);
        alert("Failed to edit comment. Please try again!");
      }
    },
  },
  async mounted() {
    await this.fetchBirthdays();
  },
};
</script>


<style scoped>
.post-component {
  position: relative;
  text-align: center;
  padding: 20px;
  z-index: 1; /* Ensure content is above the video */
}

.background-video {
  position: fixed; /* Fix the video to the background */
  top: 0;
  left: 0;
  width: 100vw; /* Full width of the viewport */
  height: 100vh; /* Full height of the viewport */
  z-index: -1; /* Ensure the video stays behind the content */
}

.background-video video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the video fills the viewport */
}

.birthday-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  margin-top: 20px;
}

.birthday-card {
  width: 350px;
  max-width: 100%;
  border: 1px solid #3498db;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: rgba(235, 244, 245, 0.8); /* Slightly transparent background for readability */
}

.birthday-card h2 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.comments {
  margin-top: 10px;
  text-align: left;
}

.comment {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px;
  border-bottom: 1px solid #f0f0f0;
}

.edit-btn {
  cursor: pointer;
  font-size: 0.9rem;
  color: #007bff;
}

.add-comment {
  margin-top: 10px;
  display: flex;
  gap: 5px;
}

.add-comment input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.add-comment button {
  padding: 8px 12px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-comment button:hover {
  background: #0056b3;
}
</style>
