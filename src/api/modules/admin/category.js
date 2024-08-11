import http from '../../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '@/util/utilities';

const BASE_PATH = '/admin/categories';

export function save(formData, router) {
  http
    .post(BASE_PATH, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert('카테고리가 추가되었습니다.');
        router.go(0);
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          save(formData, router);
        }
      }
    )
}

export function update(categoryId, formData, router) {
  http
    .post(`${BASE_PATH}/${categoryId}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert('카테고리가 수정되었습니다.');
        router.go(0);
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          update(categoryId, formData, router);
        }
      }
    );
}