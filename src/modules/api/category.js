import http from './http';
import { getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/categories';

export async function save(formData) {
  return http.post(BASE_URL, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}

export async function findAll() {
  return http.get(BASE_URL, getRequestHeaders());
}

export async function update(categoryId, formData) {
  return http.post(BASE_URL + `/${categoryId}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
}