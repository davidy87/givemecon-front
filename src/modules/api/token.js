import http from './http';
import { getRefreshTokenHeader } from '../utilities';

const BASE_URL = '/auth/reissue';

export async function reissueToken() {
  return http.get(BASE_URL, getRefreshTokenHeader());
}