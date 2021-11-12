import axios from "axios";

const API_URL = "http://localhost:3000/";

class AuthService {
  login(user) {
    console.log(user.Username)
    console.log(user.Password)
    return axios
      .post(API_URL + "Signin", {
        username: user.Username,
        password: user.Password,
      })
      .then((response) => {
        console.log(response.data.token)
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
