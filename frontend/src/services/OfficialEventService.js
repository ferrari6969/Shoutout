import axios from "axios";

const BASE_URL = "http://localhost:9000";

const OfficialEventService = {
  async fetchEvents() {
    const response = await axios.get(`${BASE_URL}/api/officialEvents/fetchAll`);
    return response.data;
  },

  async addEvent(teamName, title, description, createdBy) {
    const response = await axios.post(`${BASE_URL}/api/officialEvents/create`, {
      teamName,
      title,
      description,
      createdBy,
    });
    return response.data;
  },

  async editEvent(id, title, description) {
    const response = await axios.put(`${BASE_URL}/api/officialEvents/edit/${id}`, {
      title,
      description,
    });
    return response.data;
  },

  async deleteEvent(id) {
    const response = await axios.delete(`${BASE_URL}/api/officialEvents/delete/${id}`);
    return response.data;
  },
};

export default OfficialEventService;
