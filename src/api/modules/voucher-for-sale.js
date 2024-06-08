import http from '../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType, handleBadRequest } from '@/util/utilities';

const BASE_PATH = '/vouchers-for-sale';

export async function save(voucherToPost, router) {
  http
    .post(BASE_PATH, voucherToPost, getRequestHeaders(ContentType.MULITPART_FORM_DATA))
    .then(
      (response) => {
        console.log(response);
        alert('판매 등록이 완료되었습니다.');
        router.replace('/');
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
        alert('판매 등록에 실패했습니다. 다시 시도해주세요.');
      }
    );
}

export async function findAllByStatus(statusCode, forSaleRequests, router) {
  http
    .get(BASE_PATH, {params: {statusCode}}, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
        response.data.forEach((voucherForSale) => {
          forSaleRequests.push(voucherForSale);
        });
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
      }
    );
}

export async function updateStatus(router, id, statusCode, rejectedReason) {
  const requestBody = {
    statusCode,
    rejectedReason
  }

  http
    .put(`${BASE_PATH}/${id}`, requestBody, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);

        switch (statusCode) {
          case VoucherForSaleStatus.FOR_SALE: 
            alert('기프티콘 판매가 허가되었습니다.');
            break;
          case VoucherForSaleStatus.REJECTED:
            alert('기프티콘 판매가 거절되었습니다.');
            break;
        }
      },
      async (error) => {
        console.log(error.response);
        const status = error.response.status;

        if (status === HttpStatusCode.BadRequest) {
          handleBadRequest(error);
        } else if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          updateStatus(router, id, statusCode, rejectedReason);
        }
      }
    );
}

export const VoucherForSaleStatus = {
  NOT_YET_PERMITTED: 0,
  FOR_SALE: 1,
  SOLD: 2,
  REJECTED: 3,
  EXPIRED: 4
}
Object.freeze(VoucherForSaleStatus);