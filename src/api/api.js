import request from './request.js'
// import qs from 'qs'

/**
 * 获取首页数据
 * @param 请求参数
 *  diffServerTimestamp 差异服务器时间戳
 */
export function getCartoonInfo() {
  return request({
    url:
      '/mapi/mini/v1/comic/mkuaikan/discovery/list?diffServerTimestamp=' +
      Date.now() +
      '&gender=0&cold_boot=0',
    method: 'get',
  })
}

/**
 * 获取每日更新
 * @param params 请求参数
 * pos 星期几 0~6
 */
export function getUpdatedDailyInfo(params) {
  const data = params || 0
  return request({
    url: '/api/v2/pweb/daily/topics?pos=' + data,
    method: 'get',
  })
}

/**
 * 换一换模块
 * @returns
 */
export function getChangeCartoonInfo(params) {
  return request({
    url: `/mapi/mini/v1/comic/mkuaikan/discovery/module_change?diffServerTimestamp=${Date.now()}&module_id=${
      params.module_id
    }&filter_ids=${params.filter_ids}&card_type=${params.card_type}&gender=0`,
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
 * @param params 请求参数
 *  count 返回数量
 *  tag 分类
 *  sort 排序
 *  update_status 书本状态
 */
export function getCategoryInfo(params = {}) {
  const data = {
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

/**
 * 获取原创数据
 */
export function getOriginalInfo() {
  return request({
    url: '/api/v2/pweb/ugc/rec_topics',
    method: 'get',
  })
}
