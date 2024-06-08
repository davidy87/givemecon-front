import { HttpStatusCode } from 'axios';
import * as tokenApi from '@/api/modules/token';

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

export const handleBadRequest = (axiosError) => {
  console.log(axiosError.response);
  const fieldErrors = axiosError.response.data.error.fieldErrors;
  
  if (fieldErrors) {
    let fieldErrorMessages = '오류: \n';

    fieldErrors.forEach((fieldError) => {
      fieldErrorMessages += `${fieldError.message} \n`;
    });

    alert(fieldErrorMessages);
  }
}

export const ContentType = {
  APPLICATION_JSON: 'application/json',
  MULITPART_FORM_DATA: 'multipart/form-data',
}
Object.freeze(ContentType);
