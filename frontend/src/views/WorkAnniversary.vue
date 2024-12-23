<template>
  <div class="post-component">
    <h1>🎉 Work Anniversaries 🎉</h1>
    <p>Welcome to the Work Anniversaries page!</p>
    <div v-if="anniversaries.length" class="anniversary-list">
      <div 
        v-for="anniversary in anniversaries" 
        :key="anniversary.annId" 
        class="anniversary-card"
      >
        <h2>{{ anniversary.name }}</h2>
        <p>Date of Joining: {{ new Date(anniversary.dateOfJoining).toLocaleDateString() }}</p>

        <div v-for="comment in anniversary.comments" :key="comment.commentId" class="comment">
          <strong>{{ comment.author || "Anonymous" }}:</strong> {{ comment.content }}
          <span 
            v-if="comment.userId === currentUserId" 
            @click="editComment(anniversary.annId, comment)" 
            class="edit-btn"
          >
            ✏️
          </span>
        </div>

        <form @submit.prevent="addComment(anniversary.annId)" class="add-comment">
          <input 
            v-model="newComment[anniversary.annId]" 
            type="text" 
            placeholder="Add a comment..."
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>

    <p v-else-if="loading">Loading work anniversaries...</p>
    <p v-else-if="error">{{ error }}</p>
  </div>
</template>

<script>
import WorkAnniversaryService from "../services/WorkAnniversaryService";

export default {
  name: "WorkAnniversary",
  data() {
    return {
      anniversaries: [],
      newComment: {},
      currentUserId: JSON.parse(localStorage.getItem("userData"))?.user?.userId || null,
      currentUser: JSON.parse(localStorage.getItem("userData"))?.user?.name || null,
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchAnniversaries() {
      try {
        this.loading = true;
        this.anniversaries = await WorkAnniversaryService.fetchAnniversaries();
      } catch (err) {
        this.error = "Failed to load work anniversaries!";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async addComment(annId) {
      try {
        const content = this.newComment[annId]?.trim();
        if (!content) return alert("Comment cannot be empty!");

        await WorkAnniversaryService.addComment(annId, content, this.currentUser, this.currentUserId);

        await this.fetchAnniversaries();
        this.newComment[annId] = ""; // Clear input field after submission
      } catch (err) {
        console.error("Failed to add comment:", err);
        alert("Failed to add comment. Please try again!");
      }
    },
    async editComment(annId, comment) {
      if (comment.userId !== this.currentUserId) {
        return alert("You can only edit your own comments!");
      }

      const newContent = prompt("Edit your comment:", comment.content);
      if (!newContent || newContent.trim() === comment.content) return;

      try {
        await WorkAnniversaryService.editComment(annId, comment.commentId, newContent);

        await this.fetchAnniversaries();
      } catch (err) {
        console.error("Failed to edit comment:", err);
        alert("Failed to edit comment. Please try again!");
      }
    },
  },
  async mounted() {
    await this.fetchAnniversaries();
  },
};
</script>

<style scoped>
.post-component {
  text-align: center;
  padding: 20px;
}

.anniversary-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.anniversary-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.anniversary-card h2 {
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
