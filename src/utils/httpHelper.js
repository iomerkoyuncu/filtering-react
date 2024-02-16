import axios from 'axios';
import cookie from './cookie';
import { appConfig } from '../constants/appConfig';
import { auth } from './auth';

const createInstance = (baseURL, tokenName) => {
  const headers = {
    'content-type': 'application/json',
  };

  if (cookie.getCookie(tokenName)) {
    headers['Authorization'] = cookie.getCookie(tokenName);
  }

  return axios.create({
    baseURL,
    headers,
    timeout: 10000,
  });
};

const httpHelper = {
  async makeRequest(
    method,
    baseURL,
    endPoint,
    tokenName,
    payload = {},
    config = {},
  ) {
    const instance = createInstance(baseURL, tokenName);

    try {
      const res = await instance({
        method,
        url: endPoint,
        data: payload,
        ...config,
      });
      return res;
    } catch (error) {
      this.errorHandling(error);
      return null;
    }
  },

  errorHandling(error) {
    let errorMessage = 'Bulunamadı';
    if (error.response) {
      errorMessage = error.response.data?.message;
      switch (error.response.status) {
        case 401:
          auth.logOut();
          break;
        case 404:
          errorMessage = 'Bulunamadı';
          break;
        default:
          break;
      }
    } else {
      errorMessage = error.message;
    }
    console.error(errorMessage);
  },

  async makeGetRequest(
    baseURL = appConfig.baseUrl,
    endPoint,
    params = {},
    tokenName,
  ) {
    return this.makeRequest('get', baseURL, endPoint, tokenName, undefined, {
      params,
    });
  },

  async makePostRequest(
    baseURL,
    endPoint,
    payload = {},
    tokenName,
    config = {},
  ) {
    return this.makeRequest(
      'post',
      baseURL,
      endPoint,
      tokenName,
      payload,
      config,
    );
  },

  async makePutRequest(baseURL, endPoint, payload = {}, tokenName) {
    return this.makeRequest('put', baseURL, endPoint, tokenName, payload);
  },

  async makePatchRequest(baseURL, endPoint, payload = {}, tokenName) {
    return this.makeRequest('patch', baseURL, endPoint, tokenName, payload);
  },

  async makeDeleteRequest(baseURL, endPoint, tokenName) {
    return this.makeRequest('delete', baseURL, endPoint, tokenName);
  },
};

export default httpHelper;

/* const httpHelper = {
  async makeGetRequest(
    baseURL = appConfig.baseUrl,
    endPoint,
    params = {},
    tokenName,
  ) {
    const headers = {
      'content-type': 'application/json',
    };

    const options = {
      baseURL,
      headers,
      timeout: 240000,
    };

    if (cookie.getCookie(tokenName))
      headers['Authorization'] = cookie.getCookie(tokenName);

    const instance = axios.create(options);
    let url = `${endPoint}`;

    const res = await instance
      .get(url, { params })
      .catch((error) => this.errorHandling(error));

    return res;
  },

  async makePostRequest(
    baseURL,
    endPoint,
    payload = {},
    tokenName,
    config = {},
  ) {
    const headers = {
      'content-type': 'application/json',
    };

    const options = {
      baseURL,
      headers,
      timeout: 10000,
      ...config,
    };

    if (cookie.getCookie(tokenName))
      headers['Authorization'] = cookie.getCookie(tokenName);

    const instance = axios.create(options);
    const res = await instance
      .post(endPoint, payload)
      .catch((error) => this.errorHandling(error));

    return res;
  },

  async makePutRequest(baseURL, endPoint, payload = {}, tokenName) {
    const headers = {
      'content-type': 'application/json',
    };

    const options = {
      baseURL,
      headers,
      timeout: 10000,
    };

    if (cookie.getCookie(tokenName))
      headers['Authorization'] = cookie.getCookie(tokenName);

    const instance = axios.create(options);
    const res = await instance
      .put(endPoint, payload)
      .catch((error) => this.errorHandling(error));

    return res;
  },

  async makePatchRequest(baseURL, endPoint, payload = {}, tokenName) {
    const headers = {
      'content-type': 'application/json',
    };

    const options = {
      baseURL,
      headers,
      timeout: 10000,
    };

    if (cookie.getCookie(tokenName))
      headers['Authorization'] = cookie.getCookie(tokenName);

    const instance = axios.create(options);
    const res = await instance
      .patch(endPoint, payload)
      .catch((error) => this.errorHandling(error));

    return res;
  },

  async makeDeleteRequest(baseURL, endPoint, tokenName) {
    const headers = {
      'content-type': 'application/json',
    };

    const options = {
      baseURL,
      headers,
      timeout: 10000,
    };

    if (cookie.getCookie(tokenName))
      headers['Authorization'] = cookie.getCookie(tokenName);

    const instance = axios.create(options);
    const res = await instance
      .delete(endPoint)
      .catch((error) => this.errorHandling(error));

    return res;
  },

  errorHandling(error) {
    let errorMessage = 'Bulunamadı';
    if (error.response) {
      errorMessage = error.response.data?.message;
      switch (error.response.status) {
        case 401:
          auth.logOut();
          break;
        case 404:
          errorMessage = 'Bulunamadı';
          break;
        default:
          break;
      }
    } else {
      errorMessage = error.message;
    }
    console.error(errorMessage);
  },
};

export default httpHelper; */
