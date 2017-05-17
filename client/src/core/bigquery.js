import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';
import { bqRunQuery } from './google';
import { buildSQL } from './queries';


/**
 * クエリを実行して結果を返す。
 * 結果はschemaを元に各行をハッシュに展開して返す。
 * @param {string} query - クエリ
 */
export function runQuery(query, ...args) {
  return new Promise((resolve, reject) => {
    query = buildSQL(query, ...args);
    bqRunQuery(query, (response) => {
      logger.debug(response)
      if (response.jobComplete) {
        const schema = _.get(response, 'schema.fields');
        const rows = _.map(_.get(response, 'rows'), (row) => {
          return _.reduce(schema, (acc, f, i) => {
            acc[schema[i].name] = _.get(row, `f.${i}.v`, undefined);
            return acc;
          }, {});
        });
        const data = { schema, rows }
        resolve([true, data, response]);
      } else {
        let error = new Error();
        error.response = response;
        reject(error);
      }
    });
  });
}
