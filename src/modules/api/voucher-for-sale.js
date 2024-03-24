import http from './http';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '../utilities';

const BASE_PATH = '/vouchers-for-sale';

export async function save(voucherToPost, router) {
  http
    .post(BASE_PATH, voucherToPost, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert('판매 등록이 완료되었습니다.');
        router.replace('/');
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
        alert('판매 등록에 실패했습니다. 다시 시도해주세요.');
      }
    );
}