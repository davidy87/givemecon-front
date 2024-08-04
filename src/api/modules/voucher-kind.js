import http from '../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '@/util/utilities';

const BASE_PATH = '/voucher-kinds';

export async function save(formData, router) {
  http
    .post(BASE_PATH, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert(response.data.title + ' 기프티콘 판매 목록이 추가되었습니다.');
        router.go(0);
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          save(formData, router);
        }
      }
    );
}

export async function findAllByBrandId(brandId, voucherKinds) {
  const config = {
    params: {
      brandId: brandId
    },
    headers: getRequestHeaders()['headers']
  };

  http
    .get(BASE_PATH, config)
    .then(
      (response) => {
        console.log(response);
        if (voucherKinds.length === 0) {
          response.data.forEach(voucherKind => {
            voucherKinds.push(voucherKind);
          });
        }
      }
    );
}

export async function findById(id, voucherKind) {
  http
    .get(`${BASE_PATH}/${id}`, getRequestHeaders())
    .then((response) => {
      console.log(response);
      Object.entries(response.data).forEach(([key, value]) => {
        voucherKind[key] = value;
      })
    });
}

export async function findSellingList(id) {
  return http.get(`${BASE_PATH}/${id}/selling-list`);
}

export async function update(id, formData, router) {
  http
    .post(`${BASE_PATH}/${id}`, formData, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert('기프티콘 판매 목록 수정이 완료되었습니다.');
        router.go(0);
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          update(id, formData, router);
        }
      }
    );
}