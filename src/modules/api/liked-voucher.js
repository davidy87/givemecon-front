import http from './http';
import { getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/liked-vouchers';

export async function addToLikedList(voucherId) {
  return http.post(BASE_URL, voucherId, getRequestHeaders(ContentType.APPLICATION_JSON));
}

export async function findAll() {
  return http.get(BASE_URL, getRequestHeaders());
}

export async function undoDelete(id) {
  return http.post(BASE_URL, id, getRequestHeaders());
}

export async function deleteByVoucherId(voucherId) {
  return http.delete(BASE_URL + `/${voucherId}`, getRequestHeaders());
}