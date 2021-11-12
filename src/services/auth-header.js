export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { "x-access-token": user.token }; // for Node.js Express back-end
  } else {
    return {};
  }
}
