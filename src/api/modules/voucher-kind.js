import http from '../index';
// import { HttpStatusCode } from 'axios';
import { getRequestHeaders } from '@/util/utilities';

const BASE_PATH = '/voucher-kinds';

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