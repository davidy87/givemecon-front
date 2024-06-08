import http from '../index';

import { getRequestHeaders, ContentType } from '@/util/utilities';

const BASE_PATH = '/images';

export async function requestImageTextExtraction(imageFile) {
  let formData = new FormData();
  formData.append('imageFile', imageFile);

  return http.post(`${BASE_PATH}/extracted-texts`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA));
}