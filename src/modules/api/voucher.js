import base from "./base";
import { getRequestHeaders, ContentType } from '@/modules/utilities.js'

export async function save(formData) {
  return base.post("/vouchers", formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}

export async function findAllById(id) {
  return base.get('/vouchers/' + id);
}

export async function findAllByBrandName(brandName) {
  return base.get('/vouchers?brandName=' + brandName);
}

export async function findSellingList(voucherId) {
  return base.get('/vouchers/' + voucherId + '/selling-list');
}

export async function update(id, formData) {
  return base.post("/vouchers/" + id, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}