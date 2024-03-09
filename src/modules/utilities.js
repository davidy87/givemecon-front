import { HttpStatusCode } from 'axios';
import * as tokenApi from '@/modules/api/token';

export const requestNewAccessToken = (router, callback) => {
  tokenApi
    .reissueAccessToken()
    .then(response => {
      console.log(response);
      localStorage.setItem('accessToken', response.data);

      if (callback) {
        callback;
      }
    })
    .catch(error => {
      if (error.response.status === HttpStatusCode.Unauthorized) {
        alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
        localStorage.clear();
        router.replace('/login');
      }
    });
}

export const getRequestHeaders = (mediaType) => {
  const grantType = localStorage.getItem('grantType');
  const accessToken = localStorage.getItem('accessToken');
  const headers = {};

  if (grantType && accessToken) {
    headers['Authorization'] = `${grantType} ${accessToken}`;
  }
  
  if (mediaType) {
    headers['Content-Type'] = mediaType;
  }

  return { headers };
}

export const getRefreshTokenHeader = () => {
  const grantType = localStorage.getItem('grantType');
  const refreshToken = localStorage.getItem('refreshToken');

  return { 
      headers: {
        Authorization: `${grantType} ${refreshToken}`
      }
    };
}

export const ContentType = {
  APPLICATION_JSON: "application/json",
  MULITPART_FORM_DATA: "multipart/form-data"
}
Object.freeze(ContentType);