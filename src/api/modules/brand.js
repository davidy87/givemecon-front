import http from '../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '@/util/utilities';

const BASE_PATH = '/brands'

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

export async function findPage(categoryId, page, size, sort) {
  const payload = {
    params : {
      categoryId: categoryId,
      page: page - 1,
      size: size,
      sort: sort,
    }
  };

  return http.get(BASE_PATH, payload);
}

export async function findAllByCategoryId(categoryId, brands) {
  const payload = {
    params : {
      categoryId: categoryId
    }
  };

  http
    .get(BASE_PATH, payload)
    .then(
      (response) => {
        response.data.forEach((brand) => {
          brands.push(brand);
        });
      }
    );
}

export async function update(id, formData, router) {
  http
    .post(`${BASE_PATH}/${id}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert('브랜드가 수정되었습니다.');
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