import _ from 'lodash';

/**
 * 関数じゃなかったら空関数を返す。
 * @param {function} func - 関数
 * @return {function}
 */
export function fn(func) {
  return (_.isFunction(func)) ? func : ()=>{}
}
