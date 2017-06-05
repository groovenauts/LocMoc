
export const selectLatestPredictions = `SELECT
    timestamp,
    mac_addr,
    room,
    x AS aliasX,
    y AS aliasY
  FROM
    [<%= projectId %>:<%= datasetId %>.<%= tableId %>]
  WHERE
    timestamp >= <%= oldestTimestamp %>
    AND room = <%= roomNumber %>
  ORDER BY
    timestamp DESC
  LIMIT
    50000`

export const selectPredictionsWithFilterByTime = `SELECT
    timestamp,
    mac_addr,
    room,
    x AS aliasX,
    y AS aliasY
  FROM
    [<%= projectId %>:<%= datasetId %>.<%= tableId %>]
  WHERE
    timestamp >= <%= srcTimestamp %>
    AND timestamp <= <%= dstTimestamp %>
    AND room = <%= roomNumber %>
  ORDER BY
    timestamp DESC
  LIMIT
    50000`

export const numberOfBeforeYesterday = `SELECT
    COUNT(*) as count
  FROM
    [<%= projectId %>:<%= datasetId %>.<%= tableId %>]
  WHERE
    timestamp <= TIMESTAMP_TO_SEC(DATE_ADD(CURRENT_TIMESTAMP(), -1, 'DAY'))`

export const numberOfEvery10minPerRoom = `SELECT
    INTEGER(FLOOR(timestamp/600)*600) AS t,
    room,
    COUNT(*) AS num
  FROM
    [<%= projectId %>:<%= datasetId %>.<%= tableId %>]
  WHERE
    timestamp > TIMESTAMP_TO_SEC(DATE_ADD(CURRENT_TIMESTAMP(), -1, 'HOUR'))
  GROUP BY
    t,
    room
  ORDER BY
    t ASC,
    room`

export const numberOfHoursPerRoom = `SELECT
    INTEGER(FLOOR(timestamp/3600)*3600) AS t,
    room,
    COUNT(*) AS num
  FROM
    [<%= projectId %>:<%= datasetId %>.<%= tableId %>]
  WHERE
    (timestamp >= <%= srcTimestamp1 %> AND timestamp <= <%= dstTimestamp1 %>)
    OR (timestamp >= <%= srcTimestamp2 %> AND timestamp <= <%= dstTimestamp2 %>)
  GROUP BY
    t,
    room
  ORDER BY
    t ASC,
    room`

export const selectFilterAddr = `SELECT
    timestamp,
    room,
    x AS aliasX,
    y AS aliasY
  FROM
    [<%= projectId %>:<%= datasetId %>.<%= tableId %>]
  WHERE
    mac_addr = '<%= macAddress %>'
    AND ((timestamp >= <%= srcTimestamp1 %> AND timestamp <= <%= dstTimestamp1 %>)
    OR (timestamp >= <%= srcTimestamp2 %> AND timestamp <= <%= dstTimestamp2 %>))
  ORDER BY timestamp ASC
  LIMIT
    100000
`