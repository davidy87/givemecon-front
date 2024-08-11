import axios from 'axios';
import { BASE_SERVER_PATH } from '@/util/utilities'

const instance = axios.create({
  baseURL: `${BASE_SERVER_PATH}/api`,
});

export default instance;