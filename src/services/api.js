import axios from "axios";

export const baseUrl = "https://api-instagram-leo.herokuapp.com";
export const api = axios.create({
  baseURL: baseUrl
});

export default { api, baseUrl };
