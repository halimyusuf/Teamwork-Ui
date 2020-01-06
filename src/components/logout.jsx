import { removeToken } from "../services/authServices";

const Logout = () => {
  removeToken();
  window.location = "sign-in";
};

export default Logout;
