<template>
  <div class="post-component">
    <h1>🎉 Birthday Celebrations 🎉</h1>
    <p>Welcome to the Birthday Celebrations page!</p>
    <!-- <div>
      {{currentUserId}} {{currentUser}} 
      </div> -->
    <div v-if="birthdays.length" class="birthday-list">
      <div 
        v-for="birthday in birthdays" 
        :key="birthday.bdId" 
        class="birthday-card"
      >
        <h2>{{ birthday.name }}</h2>
        <p>Date of Birth: {{ new Date(birthday.dateOfBirth).toLocaleDateString() }}</p>

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

    <p v-else-if="loading">Loading birthdays...</p>
    <p v-else-if="error">{{ error }}</p>
  </div>
</template>

<script>
import BirthdayService from "../services/BirthdayService";

export default {
  name: "PostComponent",
  data() {
    return {
        birthdays: [],
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
        this.birthdays = await BirthdayService.fetchBirthdays();
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
  text-align: center;
  padding: 20px;
}

.birthday-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.birthday-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.birthday-card h2 {
  margin: 0;
  color: #333;
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
