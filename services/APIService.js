export const HTTP_POST = 'POST'

export default class APIService {
  errorHandler = (error, payload = {}) => payload

  request = (method, url, payload) => {
    const config = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }

    let didTimeOut = false

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        didTimeOut = true

        reject(new Error('Request timed out'))
      }, 1000)

      fetch(url, config).then(response => {
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

  post = (url, payload = {}) => this.request(HTTP_POST, url, payload)
}
