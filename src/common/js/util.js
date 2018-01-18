/**
 * 解析URL参数
 * example ?id=12345&a=b
 * return {id:12345,a:b}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  // 包含？或者&，后面是非？&一个或多个字符，=，后面还是非？&一个或多个字符,全局匹配
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=111', 'a=b']
  if (arr) {
    arr.forEach(item => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
