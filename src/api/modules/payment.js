import http from '../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '@/util/utilities';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const BASE_PATH = '/payments';
const clientKey = 'test_ck_ma60RZblrqzqZEL6nevx8wzYWBn1'

export async function confirmPayment(router, requestBody) {
  console.log(requestBody);

  http
    .post(`${BASE_PATH}/confirm`, requestBody, getRequestHeaders(ContentType.APPLICATION_JSON))
    .then(
      (response) => {
        console.log(response.data);
        router.replace({ path: '/payment/success', query: { paymentKey: requestBody.paymentKey }});
      },
      async (error) => {
        console.log(error);

        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          confirmPayment(requestBody);
        }
      }
    );
}

export async function findPaymentHistory(router, paymentKey, paymentResult) {
  http
    .get(`${BASE_PATH}/${paymentKey}`, getRequestHeaders())
    .then(
      (response) => {
        console.log(response.data);

        Object.entries(response.data).forEach(([key, value]) => {
          paymentResult[key] = value;
        })
      },
      async (error) => {
        console.log(error);

        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          findPaymentHistory(router, paymentKey, paymentResult);
        }
      }
    );
}

export function requestTossPayment(paymentInfo) {
  // ------ 클라이언트 키로 객체 초기화 ------
  loadTossPayments(clientKey).then(tossPayments => {
    console.log(paymentInfo);

    // ------ 결제창 띄우기 ------
    tossPayments
      .requestPayment('CARD', paymentInfo)
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          // 결제 고객이 결제창을 닫았을 때 에러 처리
        } else if (error.code === 'INVALID_CARD_COMPANY') {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        }
      })
  })
}