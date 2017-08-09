

import axios from 'axios';
import store from '../store';

export const apiVersion = 'v1';
export const buildApiUrl = url => `/api/${apiVersion}/${url}`;


const api = {
  fetch(apiConfig) {
    /* eslint-disable import/no-named-as-default-member*/
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        JSESSIONID: store.getters.JsessionId,
      },
    };
    /* eslint-enable import/no-named-as-default-member*/
    const { url, params = {} } = apiConfig;
    const apiUrl = buildApiUrl(url);

    return http.get(apiUrl, { params }, config);
  },

  fetchWithPost(apiConfig) {
    /* eslint-disable import/no-named-as-default-member*/
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        JSESSIONID: store.getters.JsessionId,
      },
    };
    /* eslint-enable import/no-named-as-default-member*/
    const { url, requestParams } = apiConfig;
    const apiUrl = buildApiUrl(url);
    return http.post(apiUrl, requestParams, config);
  },

  fetchWithPut(apiConfig) {
    const { url, requestParams } = apiConfig;
    const apiUrl = buildApiUrl(url);
    return http.put(apiUrl, requestParams);
  },

  reAuthorize: (baseUrl) => {
    const eventName = 'RE_AUTHORIZE';
    const messageData = { service: baseUrl };
    window.outPort.sendMessage(eventName, messageData);
  },
};

const http = axios.create({
  withCredentials: true,
  maxRedirects: 0,
/*  headers: {
    'Access-Control-Allow-Origin': '*',
  },*/
  validateStatus(status) {
    const reAuthStatusCodes = [401, 403, 302];

    if (reAuthStatusCodes.includes(status)) {
      api.reAuthorize(axios.defaults.baseURL);
      return false;
    }
    else if (status >= 200 && status < 300) {
      return true;
    }
    return false;
  },
});

// Add a response interceptor handled by then or catch
// return only response.data
http.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error),
);

export {
  api,
  http,
};
