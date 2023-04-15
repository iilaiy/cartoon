import request from './request.js'
// import qs from 'qs'

// https://blog.csdn.net/m0_46521785/article/details/120093321?ydreferer=aHR0cHM6Ly93d3cuYmFpZHUuY29tL2xpbms%2FdXJsPVdhc2N0ZFplaGdfOXExOWtwOTc4ak9DSG5SYkJIdFhjdkdVdEFWbFpBLVdqZnJ0Q3BrN0JkdngyUFF2RDVNTzZHTTJMYi1ydE5CRkkyNW5UVW9UYU9iZjdDVHRMeC05VkZrYTVGaTQ4SkRXJndkPSZlcWlkPTlmNGMxODE4MDAxN2U3MDcwMDAwMDAwNjY0M2FhYTY4

/**
 * 获取首页数据
 */
export function getCartoonInfo() {
  return request({
    url: '/api/v2/pweb/home',
    method: 'get',
  })
}

/**
 * 获取最新数据
 */
export function getLatestInfo() {
  return request({
    url: '/api/v2/pweb/ugc/topics',
    method: 'get',
  })
}

/**
 * 获获取分类数据
 */
export function getCategoryInfo(params = {}) {
  let data = {
    count: params.count || 24,
    tag: params.tag || 0,
    sort: params.sort || 1,
    update_status: params.update_status || 0,
  }
  return request({
    url:
      '/api/v1/search/by_tag?since=0&count=' +
      data.count +
      '&f=3&tag=' +
      data.tag +
      '&sort=' +
      data.sort +
      '&query_category={"update_status":' +
      data.update_status +
      '}',
    method: 'get',
  })
}

/**
 * 获取全部榜单数据
 */
export function getListInfo() {
  return request({
    url: '/api/v2/pweb/all_rank/topics',
    method: 'get',
  })
}
