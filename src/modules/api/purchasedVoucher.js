import base from "./base";
import { getRequestHeaders, ContentType } from '@/modules/utilities.js'

export async function save(toPurchaseList) {
  return base.post('/purchased-vouchers', toPurchaseList, getRequestHeaders(ContentType.APPLICATION_JSON));
}

export async function findAll() {
  return base.get('/purchased-vouchers', getRequestHeaders())
}

export async function findById(id) {
  return base.get('/purchased-vouchers/' + id, getRequestHeaders(ContentType.APPLICATION_JSON));
}

export async function updateValidity(id) {
  return base.put('/purchased-vouchers/' + id, {}, getRequestHeaders(ContentType.APPLICATION_JSON))
}