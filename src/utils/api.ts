import axios from "axios";

const api = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
});

api.interceptors.request.use(async (req: any) => {
  req.headers["Authorization"] = import.meta.env.VITE_API_KEY;
  return req;
});

export default api;
