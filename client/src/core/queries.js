import _ from 'lodash';
import sprintf from 'sprintf';

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
SELECT * FROM [next_tokyo_demo.wifi_data] LIMIT 10;
`;

/**
 * 特定の時間でのMACアドレスのリスト。
 * @const
 * @type {string}
 */
export const $BQ_SRC_MAC_ADDRESS_LIST_QUERY = `
SELECT src_mac
FROM [next_tokyo_demo.wifi_data]
WHERE timestamp >= "%s"
GROUP BY src_mac;
`;

/**
 * 特定の時間でのリクエスト件数
 * @const
 * @type {string}
 */
export const $BQ_REQUEST_COUNT_QUERY = `
SELECT raspi_mac, timestamp, count(src_mac) AS cnt
FROM [next_tokyo_demo.wifi_data]
WHERE timestamp >= "%s" AND timestamp <= "%s"
GROUP BY raspi_mac, timestamp
ORDER BY timestamp;
`;

