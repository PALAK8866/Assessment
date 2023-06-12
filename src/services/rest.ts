import axios, { Method, RawAxiosRequestConfig } from 'axios';
import config from '../helpers/config';

let Axios = axios.create({
  baseURL: '',
});

Axios.interceptors.request.use(
  async function (request) {
    return request;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Do something with response error
    // store.dispatch(showSnackBar({ show: true, type: 'error', message: error?.response?.data?.message || 'Something went wrong' }));
    return Promise.reject(error);
  },
);

interface RequestV1Options<RequestPayload> {
  method: Method | string;
  url: string;
  queryParams?: any;
  payload?: RequestPayload;
}

type RequestV1Response<ResponsePayload> = ResponsePayload;

export async function requestV1<RequestPayload, ResponsePayload>({
  method,
  url,
  queryParams,
  payload,
}: RequestV1Options<RequestPayload>): Promise<RequestV1Response<ResponsePayload>> {
  const request: RawAxiosRequestConfig = {
    url: `${config.baseUrl}${url}`,
    method,
    params: queryParams,
    data: payload,
  };

  return new Promise((resolve, reject) => {
    Axios.request<RequestV1Options<RequestPayload>, RequestV1Response<ResponsePayload>>(request)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export default Axios;
