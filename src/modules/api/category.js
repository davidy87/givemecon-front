import base from './base';
import { getRequestHeaders, ContentType } from '../utilities';

export async function save(formData) {
  return base.post('/categories', formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}

export async function findAll() {
  return base.get('/categories');
}

export async function update(categoryId, formData) {
  return base.post('/categories/' + categoryId, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
}