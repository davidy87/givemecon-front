import { HttpStatusCode } from 'axios';
import * as tokenApi from '@/modules/api/token';

export const requestNewAccessToken = async (router) => {
  try {
    let response = await tokenApi.reissueToken();
    Object.entries(response.data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

  } catch (error) {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
      localStorage.clear();
      router.replace('/login');
    }
  }
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
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return { 
      headers: {
        'Authorization': `${grantType} ${accessToken}`,
        'Refresh-Token': `${grantType} ${refreshToken}`
      }
    };
}

export const ContentType = {
  APPLICATION_JSON: "application/json",
  MULITPART_FORM_DATA: "multipart/form-data"
}
Object.freeze(ContentType);