import http from '../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType, handleBadRequest } from '@/util/utilities';

const BASE_PATH = '/vouchers';

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
  const config = {
    params: {
      statusCode: statusCode
    },
    headers: getRequestHeaders()['headers']
  };

  http
    .get(BASE_PATH, config)
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

export async function findAllForSaleByVoucherKindId(router, voucherKindId, voucherList) {
  const config = {
    params: {
      voucherKindId: voucherKindId
    },
    headers: getRequestHeaders()['headers']
  };

  http
    .get(BASE_PATH, config)
    .then(
      (response) => {
        console.log(response);
        response.data.forEach((voucher) => {
          voucherList.push(voucher);
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

export async function findVoucherImage(router, voucherId) {
  let voucherImageUrl = '';

  await http
    .get(`${BASE_PATH}/${voucherId}/image`, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
        voucherImageUrl = response.data.imageUrl;
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
      }
    );

  return voucherImageUrl;
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

export const VoucherForSaleStatus = {
  SALE_REQUESTED: 0,
  SALE_REJECTED: 1,
  FOR_SALE: 2,
  ORDER_PLACED: 3,
  SOLD: 4,
  EXPIRED: 5,
}
Object.freeze(VoucherForSaleStatus);