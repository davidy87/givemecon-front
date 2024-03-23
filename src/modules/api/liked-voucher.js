import http from './http';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders, ContentType } from '../utilities';

const BASE_URL = '/liked-vouchers';

export async function addToLikedList(voucherId, router) {
  http
    .post(BASE_URL, voucherId, getRequestHeaders(ContentType.APPLICATION_JSON))
    .then(
      (response) => {
        console.log(response);
        alert('찜 리스트에 추가되었습니다.');
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          addToLikedList(voucherId, router);
        }
      }
    );
}

export function findAll(likedVouchers, router) {
  http
    .get(BASE_URL, getRequestHeaders())
    .then(
      (response) => {
        response.data.forEach((likedVoucher) => {
          likedVouchers.set(likedVoucher.id, likedVoucher);
        });
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          findAll(likedVouchers, router);
        }
      }
    );
}

export async function undoDelete(deleted, likedVouchers, router) {
  http
    .post(BASE_URL, deleted.id, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
        likedVouchers.set(deleted.id, structuredClone(deleted));
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          undoDelete(deleted, likedVouchers, router);
        }
      }
    );
}

export function deleteByVoucherId(voucherId, likedVouchers, deleted, router) {
  http
    .delete(BASE_URL + `/${voucherId}`, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
        Object.entries(likedVouchers.get(voucherId)).forEach(([key, value]) => {
          deleted[key] = value;
        });

        likedVouchers.delete(voucherId);
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          deleteByVoucherId(voucherId, likedVouchers, deleted, router);
        }
      }
    )
}