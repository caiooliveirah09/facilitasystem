import axios from "axios";

const localhost = "http://localhost:8000";

const API = axios.create({
  baseURL: localhost,
  withCredentials: true,
});

export { API };
