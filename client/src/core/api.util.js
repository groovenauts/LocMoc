import _ from 'lodash';


/**
 * metaタグの要素一覧を返す。
 * @return {Element[]}
 */
export function getMetaElements() {
  return document.getElementsByTagName('meta');
}

/**
 * meta要素のプロパティ一覧を返す。
 * name属性があるものだけのハッシュを返す。
 * @return {object}
 */
export function getMetaProperties() {
  return _.reduce(getMetaElements(), (acc, meta) => {
    let name = meta.getAttribute('name');
    if (!_.isEmpty(name)) {
      let content = meta.getAttribute('content');
      acc[name] = content;
    }
    return acc;
  }, {});
}


/**
 * CSRFトークンのキーを返す。
 * @return {string}
 */
export function getCsrfParam() {
  return _.find(getMetaProperties(), (v, k) => {
    return (k === 'csrf-param');
  });
}

/**
 * CSRFトークンを返す。
 * @return {string}
 */
export function getCsrfToken() {
  return _.find(getMetaProperties(), (v, k) => {
    return (k === 'csrf-token');
  });
}

/**
 * オブジェクトにCSRFのトークンをマージする。
 * @param {object} obj - オブジェクト
 * @return {object}
 */
export function mergeCsrfToken(obj) {
  obj = (_.isObject(obj)) ? obj : {};
  if (_.isFunction(obj.append)) {
    obj.append(getCsrfParam(), getCsrfToken());
  } else {
    obj[getCsrfParam()] = getCsrfToken();
  }
  return obj;
}

/**
 * URLにCSRFトークンを付与する
 * @param {string} url - URL
 * @return {string}
 */
export function csrfTokenURL(url) {
  const key = getCsrfParam();
  const val = getCsrfToken();
  const sep = (/\?/.test(url)) ? "&" : "?";
  url += `${sep}${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
  return url;
}
