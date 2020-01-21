import axios from "axios";

export const callApi = () => {
  return axios.get('/api/hello');
};
