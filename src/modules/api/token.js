import http from './http';
import { getRefreshTokenHeader } from '../utilities';

const BASE_URL = '/auth/refresh';

export async function reissueAccessToken() {
  return http.get(BASE_URL, getRefreshTokenHeader());
}