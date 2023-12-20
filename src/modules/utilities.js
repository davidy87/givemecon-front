import axios, { HttpStatusCode } from "axios";

export const requestNewAccessToken = (router) => {
  axios
    .get('/api/auth/refresh', { headers: { 'Refresh-Token' : localStorage.getItem('refreshToken') } })
    .then((response) => {
      console.log(response);
      localStorage.setItem('accessToken', response.data);
    })
    .catch((error) => {
      if (error.response.status === HttpStatusCode.Unauthorized) {
        alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
        localStorage.clear();
        router.replace('/login');
      }
    });
}