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
}

export default new AuthService();
