import base from './base';
import { getRequestHeaders, ContentType } from '../utilities';

export async function save(voucherPost) {
  return base.post('/api/vouchers-for-sale', voucherPost, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}