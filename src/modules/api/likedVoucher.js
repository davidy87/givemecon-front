import base from "./base";
import { getRequestHeaders, ContentType } from '@/modules/utilities.js'

export async function addToLikedList(voucherId) {
  return base.post('/liked-vouchers', voucherId, getRequestHeaders(ContentType.APPLICATION_JSON));
}

export async function findAll() {
  return base.get('/liked-vouchers', getRequestHeaders());
}

export async function undoDelete(id) {
  return base.post('/api/liked-vouchers', id, getRequestHeaders());
}

export async function deleteByVoucherId(voucherId) {
  return base.delete('/api/liked-vouchers/' + voucherId, getRequestHeaders());
}