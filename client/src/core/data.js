import _ from 'lodash';

export const $TIME_WIDTH = 60 * 10; // seconds


/**
 * データを整形する
 */
export function reshapeDataRequestCount(data, start, end) {
  const { schema, rows } = data;
  let raspi_macs = [];
  const datamap = _.reduce(rows, (acc, row) => {
    if (_.indexOf(raspi_macs, row.raspi_mac) < 0) raspi_macs.push(row.raspi_mac);
    acc[row.raspi_mac] = (_.isPlainObject(acc[row.raspi_mac])) ? acc[row.raspi_mac] : {};
    acc[row.raspi_mac][row.timestamp.toString()] = row.cnt;
    return acc;
  }, {});

  const timestamps = genTimestamps(start, end);
  let columns = [];
  columns[0] = genTimestampsColumn(timestamps);

  _.each(raspi_macs, (mac, i) => {
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

  let groups = [ raspi_macs ];
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
