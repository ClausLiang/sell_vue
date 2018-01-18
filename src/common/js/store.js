/**
 * 存到缓存
 * @param id    商家ID
 * @param key
 * @param val
 */
export function saveToLocal (id, key, val) {
  let seller = window.localStorage.__seller__
  if (!seller) { // 第一次存储
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) { // 不同ID的商家
      seller[id] = {}
    }
  }
  seller[id][key] = val
  window.localStorage.__seller__ = JSON.stringify(seller)
}

/**
 * 从缓存读
 * @param id
 * @param key
 * @param def 默认值
 */
export function loadFromLocal (id, key, def) {
  console.log('要从localstorage中读是否关注，商户ID是：', id)
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
