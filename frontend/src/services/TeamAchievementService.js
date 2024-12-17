import axios from "axios";

const BASE_URL = "http://localhost:9000";

const TeamAchievementService = {
  async fetchAchievements() {
    const response = await axios.get(`${BASE_URL}/api/teamAchievements/fetchAll`);
    return response.data;
  },

  async addAchievement(teamName, title, description, createdBy) {
    const response = await axios.post(`${BASE_URL}/api/teamAchievements/create`, {
      teamName,
      title,
      description,
      createdBy,
    });
    return response.data;
  },

  async editAchievement(id, title, description) {
    const response = await axios.put(`${BASE_URL}/api/teamAchievements/edit/${id}`, {
      title,
      description,
    });
    return response.data;
  },

  async deleteAchievement(id) {
    const response = await axios.delete(`${BASE_URL}/api/teamAchievements/delete/${id}`);
    return response.data;
  },
};

export default TeamAchievementService;
