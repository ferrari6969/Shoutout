import axios from "axios";
import Birthday from "../views/Birthday.vue";

const BASE_URL = "http://localhost:9000";

const BirthdayService = {
  async fetchBirthdays() {
    const response = await axios.get(`${BASE_URL}/api/birthdays`);
    return response.data;
  },

  async addComment(bdId, content, author, userId) {
    const response = await axios.post(`${BASE_URL}/api/birthdays/${bdId}/comments`, {
        content,
        author,
        userId,
    });
    return response.data;
},

  async editComment(bdId, commentId, content) {
    const response = await axios.put(`${BASE_URL}/api/birthdays/${bdId}/comments/${commentId}`, {
      content,
    });
    return response.data;
  },
};

export default BirthdayService;
