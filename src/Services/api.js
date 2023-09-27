import axios from "axios";

const baseURL = 'http://localhost:8081';

export default axios.create({
  baseURL,
});