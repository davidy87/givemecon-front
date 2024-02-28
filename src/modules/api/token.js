import http from './http';

const BASE_URL = '/auth/refresh';

export async function reissueAccessToken(refreshToken) {
  return http.get(BASE_URL, { headers: { 'Refresh-Token' : refreshToken } })
}