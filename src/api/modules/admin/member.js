import http from '../../index';
// import { HttpStatusCode } from 'axios';s
// import { requestNewAccessToken, getRequestHeaders, ContentType, handleBadRequest } from '@/util/utilities';

const BASE_PATH = '/admin/members/login';

export async function adminLogin(router, loginRequest) {
  http
    .post(BASE_PATH, loginRequest)
    .then((response) => {
      console.log(response.data);

      Object.entries(response.data).forEach(entry => {
        const [key, value] = entry;
        localStorage.setItem(key, value);
      });

      router.replace('/admin');
    })
    .catch((error) => {
      console.log(error.response.data);
      
      if (error.response.data.error.code === '001') {
        alert('아이디 혹은 비밀번호가 올바르지 않습니다.');
      }
    })
}