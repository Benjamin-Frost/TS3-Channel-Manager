import axios from "axios";
import authHeader from "./auth-header";
import { handleDefaultAxiosErrors } from '../helpers/utils';

const API_URL = "http://localhost:5000/channels";

class ChannelService {
  async getChannelList() {
    try {
      const response = await axios.get(API_URL, { headers: authHeader() });
      return response.data
    }
    catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }

  async getChannelById(id) {
    try {
      const response = await axios.get(API_URL + "/" + id, { headers: authHeader() });
      return response.data
    }
    catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }

  async createChannel(channelName, channelPassword) {
    try {
      const response = await axios.post(API_URL + "/create",
        {
          channelName,
          channelPassword
        },
        { headers: authHeader() });

      return response
    }
    catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }

  async editChannel(id, newChannelProps) {
    try {
      const response = await axios.patch(API_URL + "/" + id, newChannelProps, { headers: authHeader() })
      return response
    }
    catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }

  async deleteChannel(id) {
    try {
      const response = await axios.delete(API_URL + "/" + id, { headers: authHeader() })
      return response
    }
    catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }
}

export default new ChannelService();
