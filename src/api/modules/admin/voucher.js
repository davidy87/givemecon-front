import http from '../../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, handleBadRequest } from '@/util/utilities';

const BASE_PATH = '/admin/vouchers';

export async function findAllByStatus(router, statusCode) {
  let result = [];

  const config = {
    params: {
      statusCode: statusCode
    },
    headers: getRequestHeaders()['headers']
  };

  await http
    .get(BASE_PATH, config)
    .then(
      (response) => {
        console.log(response);
        response.data.forEach((voucher) => {
          result.push(voucher);
        });
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
      }
    );
  
  return result;
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
          case VoucherStatus.FOR_SALE: 
            alert('기프티콘 판매가 허가되었습니다.');
            break;
          case VoucherStatus.SALE_REJECTED:
            alert('기프티콘 판매가 거절되었습니다.');
            break;
        }

        router.replace('/admin/sale-requests');
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

export const VoucherStatus = {
  SALE_REQUESTED: 0,
  SALE_REJECTED: 1,
  FOR_SALE: 2,
  ORDER_PLACED: 3,
  SOLD: 4,
  EXPIRED: 5,
}
Object.freeze(VoucherStatus);