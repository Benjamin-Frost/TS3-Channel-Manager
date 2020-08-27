import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/channels";

class ChannelService {
  async getChannelList() {
    try {
      const response = await axios.get(API_URL, { headers: authHeader() });
      return response.data
    }
    catch (error) {
      if (error.response) {
        // The request was made, but the server answered with an error
        throw Error(error.response.data)
      }
      else if (error.request) {
        throw Error("The request was made, but no answer was received.")
      }
      else {
        throw Error("There was an error setting up the request.")
      }
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
      if (error.response) {
        // The request was made, but the server answered with an error
        throw Error(error.response.data)
      }
      else if (error.request) {
        throw Error("The request was made, but no answer was received.")
      }
      else {
        throw Error("There was an error setting up the request.")
      }
    }
  }

  async deleteChannel(id) {
    try {
      const response = await axios.delete(API_URL + "/" + id, { headers: authHeader() })
      return response
    }
    catch (error) {
      if (error.response) {
        // The request was made, but the server answered with an error
        throw Error(error.response.data)
      }
      else if (error.request) {
        throw Error("The request was made, but no answer was received.")
      }
      else {
        throw Error("There was an error setting up the request.")
      }
    }
  }
}

export default new ChannelService();
