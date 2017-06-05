import superagent from 'superagent'

const defaultOptions = {
  autoPaginate: false,
  useQueryCache: false,
  useLegacySql: true,
  timeoutMs: 600000
}

export function runStartQuery(sqlQuery, options={}) {
  return new Promise((resolve, reject) => {
    superagent
      .post("./startQuery")
      .send({
        options: {
          ...defaultOptions,
          query: sqlQuery,
          ...options
        }
      })
      .timeout(600000)
      .end((err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response.body)
        }
      })
    })
}
