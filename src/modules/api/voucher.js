import http from './http';
import { getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/vouchers';

export async function save(formData) {
  return http.post(BASE_URL, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}

export async function findAll() {
  return http.get(BASE_URL);
}

export async function findAllByBrandName(brandName) {
  const payload = {
    params: {
      brandName: brandName
    }
  };

  return http.get(BASE_URL, payload);
}

export async function findAllById(id) {
  return http.get(BASE_URL + `/${id}`);
}

export async function findSellingList(voucherId) {
  return http.get(BASE_URL + `/${voucherId}/selling-list`);
}

export async function update(id, formData) {
  return http.post(BASE_URL + `/${id}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}