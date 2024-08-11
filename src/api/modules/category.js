import http from '../index';
import { HttpStatusCode } from 'axios';
import { requestNewAccessToken, getRequestHeaders } from '@/util/utilities';

const BASE_PATH = '/categories';

export function findAll(categories, router) {
  http
    .get(BASE_PATH, getRequestHeaders())
    .then(
      (response) => {
        console.log(response);
        if (categories.length === 0) {
          response.data.forEach((category) => {
            categories.push(category);
          });
        }
      },
      async (error) => {
        console.log(error);
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await requestNewAccessToken(router);
          findAll(categories, router);
        }
      },
    );
}
