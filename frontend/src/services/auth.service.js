import axios from "axios";
import { handleDefaultAxiosErrors } from '../helpers/utils';

const API_URL = "http://localhost:5000/auth/";

class AuthService {
  async requestAuthKey(tsUid) {
    try {
      const response = await axios.post(API_URL + "key", { tsUid });
      return response.data;
    }
    catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }

  async login(tsUid, authKey) {
    try {
      const response = await axios.post(API_URL, {
        tsUid,
        authKey,
      });

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    }
    catch (error) {
      handleDefaultAxiosErrors(error);
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isAuthenticated() {
    return localStorage.getItem("user") !== null;
  }
}

export default new AuthService();
