import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

class AuthService {
  async requestAuthKey(tsUid) {
    try {
      const response = await axios.post(API_URL + "key", { tsUid });
      return response.data;
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
