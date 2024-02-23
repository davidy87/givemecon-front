import http from './http';
import { getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/brands'

export async function save(formData) {
  return http.post(BASE_URL, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}

export async function findAll() {
  return http.get(BASE_URL);
}

export async function findAllByCategoryId(categoryId) {
  const payload = {
    params : {
      categoryId: categoryId
    }
  };

  return http.get(BASE_URL, payload);
}

export async function update(id, formData) {
  return http.post(BASE_URL + `/${id}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}