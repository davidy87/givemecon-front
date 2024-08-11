import http from '../../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '@/util/utilities';

const BASE_PATH = '/admin/brands'

export async function save(formData, router) {
  http
    .post(BASE_PATH, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert('브랜드가 추가되었습니다.');
        router.go(0);
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          save(formData);
        }
      }
    );
}