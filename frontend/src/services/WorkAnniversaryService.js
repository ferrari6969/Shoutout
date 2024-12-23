import axios from "axios";

const BASE_URL = "http://localhost:9000/api/workAnniversaries";

const WorkAnniversaryService = {
  async fetchAnniversaries() {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  },

  async addComment(annId, content, author, userId) {
    const response = await axios.post(`${BASE_URL}/${annId}/comments`, {
      content,
      author,
      userId,
    });
    return response.data;
  },

  async editComment(annId, commentId, content) {
    const response = await axios.put(`${BASE_URL}/${annId}/comments/${commentId}`, {
      content,
    });
    return response.data;
  },
};

export default WorkAnniversaryService;
