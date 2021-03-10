import axios from 'axios';
import authHeader from '../../utils/auth-header';
import { __backendUrl__ } from '../../utils/constants';
import IChannel from '../interfaces/channel';

const API_URL = `${__backendUrl__}/channel`;

class ChannelService {
  async getAll(): Promise<IChannel[]> {
    try {
      const channels = await axios.get(API_URL, { headers: authHeader() });
      return channels.data as IChannel[];
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<IChannel> {
    try {
      const channel = await axios.get(`${API_URL}/${id}`, {
        headers: authHeader(),
      });
      return channel.data;
    } catch (error) {
      throw error;
    }
  }

  async create(name: string, password: string) {
    try {
      await axios.post(
        `${API_URL}/create`,
        {
          channelName: name,
          channelPassword: password,
        },
        {
          headers: authHeader(),
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async edit(id: string, name: string, password: string) {
    try {
      await axios.patch(
        `${API_URL}/${id}`,
        {
          channelName: name,
          channelPassword: password,
        },
        {
          headers: authHeader(),
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader(),
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new ChannelService();
