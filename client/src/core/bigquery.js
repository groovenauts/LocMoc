import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';
import { bqRunQuery } from './google';


export const $BQ_TEST_QUERY = `
SELECT * FROM [next_tokyo_demo.wifi_data] LIMIT 10
`;


/**
 * クエリを実行して結果を返す。
 * 結果はschemaを元に各行をハッシュに展開して返す。
 * @param {string} query - クエリ
 * @param {function|null|undefined} callback - コールバック
 */
export function runQuery(query, callback) {
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
      fn(callback)(true, data, response);
    } else {
      fn(callback)(false, response);
    }
  });
}
