import axios from 'axios';

const API_URL = 'http://localhost:9000/api/users';

const UserService = {
  // Fetch all users
  async fetchUsers() {
    try {
      const response = await axios.get(`${API_URL}/fetchUsers`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  },

  // Update user avatar
  async updateAvatar(userId, avatarId) {
    try {
      const response = await axios.put(`${API_URL}/${userId}/avatar`, { avatarId });
      return response.data;
    } catch (error) {
      throw new Error('Error updating avatar: ' + error.message);
    }
  },
};

// Export individual functions for backward compatibility
export const updateAvatar = UserService.updateAvatar;

// Default export for new-style usage
export default UserService;
