import axios from "axios";

const BASE_URL = "http://localhost:9000";

const TeamPartyService = {
  async fetchParties() {
    const response = await axios.get(`${BASE_URL}/api/teamParties/fetchAll`);
    return response.data;
  },

  async addParty(teamName, title, description, createdBy) {
    const response = await axios.post(`${BASE_URL}/api/teamParties/create`, {
      teamName,
      title,
      description,
      createdBy,
    });
    return response.data;
  },

  async editParty(id, title, description) {
    const response = await axios.put(`${BASE_URL}/api/teamParties/edit/${id}`, {
      title,
      description,
    });
    return response.data;
  },

  async deleteParty(id) {
    const response = await axios.delete(`${BASE_URL}/api/teamParties/delete/${id}`);
    return response.data;
  },
};

export default TeamPartyService;
