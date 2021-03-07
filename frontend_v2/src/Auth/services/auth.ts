import axios from 'axios';
import { handleDefaultAxiosErrors } from '../../utils/axios-errors';
import { __backendUrl__ } from '../../utils/constants';

const API_URL = `${__backendUrl__}/auth`;

class AuthService {
  async requestAuthKey(ts3Uid: string) {
    try {
      const response = await axios.post(`${API_URL}/key`, { ts3Uid: ts3Uid });
      return response;
    } catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }

  async login(ts3Uid: string, key: string) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        ts3Uid: ts3Uid,
        key: key,
      });

      if (response.data.accessToken)
        localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  // returns 'null' if user is not authenticated
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user != null ? JSON.parse(user) : null;
  }
}

export default new AuthService();
