import base from "./base";

export async function save(formData) {
  return base.post('/brands', formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}

export async function findAllByCategoryId(categoryId) {
  return base.get('/brands?categoryId=' + categoryId);
}

export async function update(id, formData) {
  return base.post('/brands/' + id, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}