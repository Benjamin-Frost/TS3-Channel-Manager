import axios from 'axios';
import authHeader from '../../utils/auth-header';
import { handleDefaultAxiosErrors } from '../../utils/axios-errors';
import { __backendUrl__ } from '../../utils/constants';

const API_URL = `${__backendUrl__}/channel`;

class ChannelService {
  async channelList() {
    try {
      const channels = await axios.get(API_URL, { headers: authHeader() });
      return channels.data;
    } catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }
}

export default new ChannelService();
