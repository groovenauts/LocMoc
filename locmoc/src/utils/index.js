import _ from 'lodash'


/**
 * Convert to Date of of time in seconds from Timestamp
 * @param {Number} timestamp 
 */
export const timestampToDate = (timestamp) => new Date(timestamp * 1000)

/**
 * Convert to Timestamp of time in seconds from Date
 * @param {Date} date 
 */
export const dateToTimestamp = (date) => Math.round(date.getTime() / 1000)

export const minutesAgoDate = (date, num) => {
  return new Date(date.setMinutes(date.getMinutes() - num))
}

export const getBaseHoursTimestamp = (timestamp) => {
  return _.toNumber(Math.floor(timestamp/3600)*3600)
}

export const toDoubleDigits = (num) => {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;     
}
