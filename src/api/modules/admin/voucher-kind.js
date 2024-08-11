import http from '../../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '@/util/utilities';

const BASE_PATH = '/admin/voucher-kinds';

export async function save(formData, router) {
  http
    .post(BASE_PATH, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert(response.data.title + ' 기프티콘 판매 목록이 추가되었습니다.');
        router.go(0);
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          save(formData, router);
        }
      }
    );
}

export async function update(id, formData, router) {
  http
    .post(`${BASE_PATH}/${id}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert('기프티콘 판매 목록 수정이 완료되었습니다.');
        router.go(0);
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          update(id, formData, router);
        }
      }
    );
}