import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
  getfaculty(user) {
    return axios
      .post(API_URL + "faculty", {
        idfaculty: user.idfaculty,
      })
      .then((response) => {
        console.log(response.data.token);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  getfaculty() {
    return axios.get(API_URL + "getfaculty", { headers: authHeader() });
  }
}

export default new UserService();
