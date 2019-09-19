import axios from 'axios';
import {getCookie} from './cookies'

const options = {
  baseURL: `http://localhost:8080/api/`
  // headers: {'x-access-token': getCookie('token').token}
}

let instance = axios.create(options)

instance.interceptors.request.use((config) => {
  const token = getCookie('token').token;
  config.headers['x-access-token'] = token;

  return config;
})

export default instance;
// export default axios.create({
//   baseURL: `http://localhost:8080/api/`,
//   headers: {'x-access-token': getCookie('token').token}
// });