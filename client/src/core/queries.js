import _ from 'lodash';
import logger from 'js-logger';
import sprintf from 'sprintf';

export const $TABLE = '[office_demo.wifi_data]';

/**
 * 変数を埋め込んだりする必要があるクエリを組み立てる。
 * @param {string} query - クエリ
 * @param {array} params - パラメータ
 */
export function buildSQL(query, ...params) {
  return sprintf(query, ...params);
}

/**
 * テスト的にデータを取得してみるクエリ。
 * @const
 * @type {string}
 */
export const $BQ_TEST_QUERY = `
SELECT * FROM ${$TABLE} LIMIT 10;
`;

/**
 * 特定の時間でのMACアドレスのリスト。
 * @const
 * @type {string}
 */
export const $BQ_SRC_MAC_ADDRESS_LIST_QUERY = `
SELECT src_mac
FROM ${$TABLE}
WHERE timestamp >= %d AND timestamp <= %d
GROUP BY src_mac;
`;

/**
 * 特定の時間でのリクエスト件数
 * @const
 * @type {string}
 */
export const $BQ_RASPI_REQUEST_COUNT_QUERY = `
SELECT raspi_mac, timestamp, count(src_mac) AS cnt
FROM ${$TABLE}
WHERE timestamp >= %d AND timestamp <= %d
GROUP BY raspi_mac, timestamp
ORDER BY timestamp;
`;

/**
 * 特定の時間でのリクエスト件数
 * @const
 * @type {string}
 */
export const $BQ_SRC_REQUEST_COUNT_QUERY = `
SELECT src_mac, timestamp, count(raspi_mac) AS cnt
FROM ${$TABLE}
WHERE timestamp >= %d AND timestamp <= %d AND src_mac = "%s"
GROUP BY src_mac, timestamp
ORDER BY timestamp;
`;

