import http from '../index';
import { getRefreshTokenHeader } from '@/util/utilities';

const BASE_PATH = '/auth/reissue';

export async function reissueToken() {
  return http.get(BASE_PATH, getRefreshTokenHeader());
}