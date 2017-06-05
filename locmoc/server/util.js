var _ = require('lodash');

export function formatQueryResult(response) {
  return _.map(response.result.rows, function(row) {
    const values = _.map(row.f, function(value) {
      return value.v
    })
    return _.reduce(values, function(acc, v, i) {
      const type = response.result.schema.fields[i].type
      let value = v
      if (_.isNull(value)) {
        // do nothing
      } else if (type === "INTEGER") {
        value = _.toInteger(value)
      } else if (type === "FLOAT") {
        if (/^(-?[0-9]\d*|0)(\.\d+)?$/.test(value)) {
          value = parseFloat(value);
        } else if (_.isNumber(value)) {
          // do nothing
        } else {
          value = 0.0
        }
      }
      acc = _.defaults(acc, { [response.result.schema.fields[i].name]: value })
      return acc
    }, {})
  })
}
