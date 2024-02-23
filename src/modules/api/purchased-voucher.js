import http from './http';
import { getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/purchased-vouchers';

export async function save(toPurchaseList) {
  return http.post(BASE_URL, toPurchaseList, getRequestHeaders(ContentType.APPLICATION_JSON));
}

export async function findAll() {
  return http.get(BASE_URL, getRequestHeaders());
}

export async function findById(id) {
  return http.get(BASE_URL + `/${id}`, getRequestHeaders(ContentType.APPLICATION_JSON));
}

export async function updateValidity(id) {
  return http.put(BASE_URL + `/${id}`, {}, getRequestHeaders(ContentType.APPLICATION_JSON));
}