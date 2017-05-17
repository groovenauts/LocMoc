import _ from 'lodash';
import logger from 'js-logger';

export const $TIME_WIDTH = 60 * 10; // seconds


/**
 * データを整形する
 */
export function reshapeDataRequestCount(data, start, end, type) {
  const { schema, rows } = data;
  let macAddresses = [];
  let valueKey = (() => {
    switch (type) {
    case 'src': return 'src_mac';
    default: return 'raspi_mac';
    }
  })();
  const datamap = _.reduce(rows, (acc, row) => {
    let mac = row[valueKey];
    if (_.indexOf(macAddresses, mac) < 0) macAddresses.push(mac);
    acc[mac] = (_.isPlainObject(acc[mac])) ? acc[mac] : {};
    acc[mac][row.timestamp.toString()] = row.cnt;
    return acc;
  }, {});

  const timestamps = genTimestamps(start, end);
  let columns = [];
  columns[0] = genTimestampsColumn(timestamps);

  logger.info(macAddresses);

  _.each(macAddresses, (mac, i) => {
    let cols = [mac];
    _.each(timestamps, (ts, j) => {
      let nextTs = timestamps[j + 1] || end;
      let val = _.reduce(_.range(ts, nextTs), (acc, ts2) => {
        acc +=  (datamap[mac]) ? parseInt(datamap[mac][ts2.toString()] || '0') : 0;
        return acc;
      }, 0);
      cols.push(val);
    });
    columns.push(cols);
  });

  let groups = [ macAddresses ];
  return { columns, groups };
}


export function genTimestamps(start, end) {
  const diff = end - start;
  const step = (() => {
    if (diff >= 60 * 60 * 24) {
      return 60 * 60;
    } else if (diff >= 60 * 60) {
      return 60;
    } else {
      return 1;
    }
  })();
  return _.range(start, end, step);
}

export function genTimestampsColumn(timestamps, colName="x") {
  return _.reduce(timestamps, (acc, ts, i) => {
    let date = new Date(parseInt(ts * 1000));
    acc.push(date);
    return acc;
  }, [colName]);
}
