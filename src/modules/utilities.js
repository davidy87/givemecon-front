import axios, { HttpStatusCode } from "axios";

export const requestNewAccessToken = (router, callback) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return;
  }

  axios
    .get('/api/auth/refresh', { headers: { 'Refresh-Token' : refreshToken } })
    .then((response) => {
      console.log(response);
      localStorage.setItem('accessToken', response.data);

      if (callback) {
        callback;
      }
    })
    .catch((error) => {
      if (error.response.status === HttpStatusCode.Unauthorized) {
        alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
        localStorage.clear();
        router.replace('/login');
      }
    });
}

export const getRequestHeaders = (mediaType) => {
  return {
    headers : {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Content-Type': mediaType
    }
  };
}

export const ContentType = {
  APPLICATION_JSON: "application/json",
  MULITPART_FORM_DATA: "multipart/form-data"
}
Object.freeze(ContentType);