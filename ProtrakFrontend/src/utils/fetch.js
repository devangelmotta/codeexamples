const fetch = require('isomorphic-unfetch');
const { createQueryFromObject } = require('./utils');

class API {
  constructor(baseUrl = '') {
    this.request = null;
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  get(url, options = {}) {
    const params = options.params ? `?${createQueryFromObject(options.params)}` : '';

    this.request = fetch(`${this.baseUrl}${url}${params}`, {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
        Authorization:
          (options.headers && options.headers.Authorization) ||
          this.defaultHeaders.Authorization ||
          '',
      },
    });

    return this;
  }

  post(url, options = {}) {
    this.request = fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(options.body),
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });

    return this;
  }

  put(url, options = {}) {
    this.request = fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      body: JSON.stringify(options.body),
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });

    return this;
  }

  delete(url, options = {}) {
    this.request = fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      body: JSON.stringify(options.body),
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });

    return this;
  }

  patch(url, options = {}) {
    this.request = fetch(`${this.baseUrl}${url}`, {
      method: 'PATCH',
      body: JSON.stringify(options.body),
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });

    return this;
  }

  json() {
    return this.request
      .then(response => {
        return Promise.all([
          Promise.resolve(!response.ok),
          this.resolveJSON(response),
          response,
        ]);
      })
      .then(([failed, payload, response]) => {
        if (failed) {
          const error = new Error(payload.message || response.statusText);
          error.code = response.status;
          error.data = payload;

          throw error;
        }

        return payload;
      });
  }

  text() {
    return this.request
      .then(response => {
        return Promise.all([Promise.resolve(!response.ok), response.text(), response]);
      })
      .then(([failed, payload, response]) => {
        if (failed) {
          const error = new Error(payload || response.statusText);
          error.code = response.status;
          error.data = payload;

          throw error;
        }

        return payload;
      });
  }

  isSuccess() {
    return this.json().then(() => true);
  }

  response() {
    return this.request.then(response => {
      return response;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  resolveJSON(response) {
    return response.text().then(text => {
      try {
        return Promise.resolve(JSON.parse(text));
      } catch (e) {
        return Promise.resolve({});
      }
    });
  }

  setDefaultHeaders(headers) {
    this.defaultHeaders = headers;
  }
}

module.exports = baseUrl => {
  return new API(baseUrl);
};
