import http from './http';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/purchased-vouchers';

export async function save(toPurchaseList, router) {
  http
    .post(BASE_URL, toPurchaseList, getRequestHeaders(ContentType.APPLICATION_JSON))
    .then(
      (response) => {
        console.log(response.data);
        alert('결제가 완료되었습니다.\n구매하신 기프티콘은 내콘함에서 확인하실 수 있습니다.');
        router.replace('/');
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
        alert('결제에 실패하였습니다. 다시 시도해주세요.');
      }
    );
}

export async function findAll(unusedVouchers, usedVouchers, router) {
  http
    .get(BASE_URL, getRequestHeaders())
    .then(
      (response) => {
        response.data.forEach(voucher => {
          if (voucher.valid) {
            unusedVouchers.push(voucher);
          } else {
            usedVouchers.push(voucher);
          }
        })
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          findAll(unusedVouchers, usedVouchers, router);
        }
      }
    );
}

export async function findById(id, voucher, router) {
  http
    .get(BASE_URL + `/${id}`, getRequestHeaders(ContentType.APPLICATION_JSON))
    .then(
      (response) => {
        console.log(response);
        Object.entries(response.data).forEach(([key, value]) => {
          voucher[key] = value;
        });
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          findById(id, voucher, router);
        }
      }
    );
}

export async function updateValidity(id, router) {
  http
    .put(BASE_URL + `/${id}`, {}, getRequestHeaders(ContentType.APPLICATION_JSON))
    .then(
      (response) => {
        console.log(response);
        router.replace('/my-vouchers');
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          updateValidity(id, router);
        }
      }
    );
}