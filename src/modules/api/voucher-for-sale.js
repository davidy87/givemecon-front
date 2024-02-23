import http from './http';
import { getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/vouchers-for-sale';

export async function save(voucherPost) {
  return http.post(BASE_URL, voucherPost, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}