import axios from "axios";

// export const SERVER = "http://easytasks.edm.co.mz/backend/public/api";
export const SERVER = "http://book-task/api";

const api = axios.create({
  baseURL: SERVER
});

export default api;
