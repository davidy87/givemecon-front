import http from './http';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/categories';

export function save(formData, router) {
  http
    .post(BASE_URL, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
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

export function findAll(categories, router) {
  http
    .get(BASE_URL, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
        if (categories.length === 0) {
          response.data.forEach((category) => {
            categories.push(category);
          });
        }
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          findAll(categories, router);
        }
      },
    );
}

export function update(categoryId, formData, router) {
  http
    .post(BASE_URL + `/${categoryId}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
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