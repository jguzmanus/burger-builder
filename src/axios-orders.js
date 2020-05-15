import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-eb25b.firebaseio.com/",
});

export default instance;
