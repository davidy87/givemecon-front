import http from '../index';

const BASE_PATH = '/brands'

export async function findPage(categoryId, page, size, sort) {
  const payload = {
    params : {
      categoryId: categoryId,
      page: page - 1,
      size: size,
      sort: sort,
    }
  };

  return http.get(BASE_PATH, payload);
}

export async function findAllByCategoryId(categoryId, brands) {
  const payload = {
    params : {
      categoryId: categoryId
    }
  };

  http
    .get(BASE_PATH, payload)
    .then(
      (response) => {
        response.data.forEach((brand) => {
          brands.push(brand);
        });
      }
    );
}
