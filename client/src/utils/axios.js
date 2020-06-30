import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_OFFICE_URL
});

export default instance;
