import axios from 'axios';

const personalToken = "9f6fe0b0-67fd-4cee-8edf-a1af6d21cc82";
const baseURL = 'https://momentum.redberryinternship.ge/api';


const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${personalToken}`,
    },
  });

export default api;