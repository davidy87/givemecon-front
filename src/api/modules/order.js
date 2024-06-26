import http from '../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType, handleBadRequest } from '@/util/utilities';

const BASE_PATH = '/orders';

export async function placeOrder(router, voucherForSaleIdList) {
  const requestBody = {
    voucherForSaleIdList
  };

  http
    .post(BASE_PATH, requestBody, getRequestHeaders(ContentType.APPLICATION_JSON))
    .then(
      (response) => {
        console.log(response);
        router.push({ 
          path: '/purchase', 
          query: { 
            orderNumber: response.data.orderNumber
          }
        });
      },
      async (error) => {
        console.log(error);

        if (error.response.status === HttpStatusCode.BadRequest) {
          handleBadRequest(error);
        } else if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
      }
    );
}

export async function findOrder(router, orderNumber, orderSummary) {
  http
    .get(`${BASE_PATH}/${orderNumber}`, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
        Object.entries(response.data).forEach(([key, value]) => {
          orderSummary[key] = value;
        });
      },
      async (error) => {
        console.log(error);

        if (error.response.status === HttpStatusCode.BadRequest) {
          handleBadRequest(error);
        } else if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
      }
    );
}

export async function confirmOrder(router, orderNumber) {
  http
    .put(`${BASE_PATH}/${orderNumber}`, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
      },
      async (error) => {
        console.log(error);

        if (error.response.status === HttpStatusCode.BadRequest) {
          handleBadRequest(error);
        } else if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
      }
    );
}

export async function cancelOrder(router, orderNumber) {
  http
    .delete(`${BASE_PATH}/${orderNumber}`, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
      },
      async (error) => {
        console.log(error);

        if (error.response.status === HttpStatusCode.BadRequest) {
          handleBadRequest(error);
        } else if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
        }
      }
    );
}