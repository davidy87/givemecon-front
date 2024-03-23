import http from './http';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/brands'

export async function save(formData, router) {
  http
    .post(BASE_URL, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
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

export async function findAll(brands, pagedBrands) {
  http
    .get(BASE_URL)
    .then(response => {
      console.log(response);
      if (brands.length === 0) {
        response.data.forEach((brand) => {
          brands.push(brand);
        });
        brands.slice(0, 16).forEach((pagedBrand) => {
          pagedBrands.push(pagedBrand);
        })
      }
    });
}

export async function findAllByCategoryId(brands, categoryId) {
  const payload = {
    params : {
      categoryId: categoryId
    }
  };

  http
    .get(BASE_URL, payload)
    .then(
      (response) => {
        if (brands.length === 0) {
          response.data.forEach((brand) => {
            brands.push(brand);
          });
        }
      }
    );
}

export async function update(id, formData, router) {
  http
    .post(BASE_URL + `/${id}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
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