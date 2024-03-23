import http from './http';
import { getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/brands'

export async function save(formData) {
  return http.post(BASE_URL, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}

export async function findAll() {
  return http.get(BASE_URL);
}

export function findAllByCategoryId(brands, categoryId) {
  const payload = {
    params : {
      categoryId: categoryId
    }
  };

  http
    .get(BASE_URL, payload)
    .then(
      (response) => {
        response.data.forEach((brand) => {
          brands.push(brand);
        });
      }
    );
}

export async function update(id, formData) {
  return http.post(BASE_URL + `/${id}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}