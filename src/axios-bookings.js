import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://restaurant-f78cb.firebaseio.com/'
});

export default instance;