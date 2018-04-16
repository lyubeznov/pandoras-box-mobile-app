import qs from 'query-string'

export const HTTP_GET = 'GET'
export const HTTP_POST = 'POST'

const BASE_URL = 'http://pandoras.box'

export default class APIService {
  errorHandler = (error, payload = {}) => payload

  request = (method, url, _query, _payload) => {
    const query = qs.stringify(_query || {})
    const payload = _payload || {}

    const requestUrl = `${BASE_URL}${url}${query.length > 0 ? `?${query}` : ''}`

    const config = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    if (method === HTTP_POST) {
      config.body = JSON.stringify(payload)
    }

    let didTimeOut = false

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        didTimeOut = true

        reject(new Error('Request timed out'))
      }, 1000)

      fetch(requestUrl, config).then(response => {
        clearTimeout(timeout)

        if (!didTimeOut) {
          resolve(response)
        }
      }).catch(err => {
        if (didTimeOut) {
          return
        }

        reject(err)
      })
    }).then(res => res.json()).catch(err => this.errorHandler(err, payload))
  }

  post = (url, payload) => this.request(HTTP_POST, url, payload)

  get = (url, payload) => this.request(HTTP_GET, url, payload)
}
