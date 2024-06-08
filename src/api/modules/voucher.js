import http from '../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '@/util/utilities';

const BASE_PATH = '/vouchers';

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

export async function findAllByBrandName(brandName, vouchers) {
  const payload = {
    params: {
      brandName: brandName
    }
  };

  http
    .get(BASE_PATH, payload)
    .then(
      (response) => {
        console.log(response);
        if (vouchers.length === 0) {
          response.data.vouchers.forEach(voucher => {
            vouchers.push(voucher);
          });
        }
      }
    );
}

export async function findById(id, voucher) {
  http
    .get(`${BASE_PATH}/${id}`)
    .then((response) => {
      console.log(response);
      Object.entries(response.data).forEach(([key, value]) => {
        voucher[key] = value;
      })
    });
}

export async function findSellingList(voucherId) {
  return http.get(`${BASE_PATH}/${voucherId}/selling-list`);
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