import axios from 'axios';

const API_URL = 'http://localhost:9000/api/users';

export const updateAvatar = async (userId, avatarId) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}/avatar`, { avatarId });
    return response.data;
  } catch (error) {
    throw new Error('Error updating avatar: ' + error.message);
  }
};
