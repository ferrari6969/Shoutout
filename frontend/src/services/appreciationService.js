import axios from "axios";

const BASE_URL = "http://localhost:9000";

const AppreciationService = {
  async fetchAppreciations() {
    const response = await axios.get(`${BASE_URL}/api/appreciation/fetchAll`);
    return response.data;
  },

  async addAppreciation(fromUser, toUser, title, description) {
    const response = await axios.post(`${BASE_URL}/api/appreciation/create`, {
      fromUser,
      toUser,
      title,
      description,
    });
    return response.data;
  },

  async editAppreciation(id, title, description) {
    const response = await axios.put(`${BASE_URL}/api/appreciation/edit/${id}`, {
      title,
      description,
    });
    return response.data;
  },
};

export default AppreciationService;
