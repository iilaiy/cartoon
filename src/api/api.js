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
 * 获取每日更新 ❌
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
 * 获取更多漫画
 * @param params 请求参数
 */
export function getMoreCartoonInfo(params) {
  return request({
    url: '/mapi/mini/v1/comic/mkuaikan/discovery/module_more',
    params: {
      diffServerTimestamp: Date.now(),
      since: params.since,
      limit: params.limit,
      gender: 0,
      card_type: params.card_type,
      module_id: Number(params.module_id),
    },
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
 * 获取漫画详情数据
 * @params 请求参数
 */
export function getCarrtonDetails(params) {
  return request({
    url: `/api/v2/pweb/topic/${params}`,
  })
}

/**
 * 获取漫画章节详情数据
 * @params 请求参数
 */
export function getCarrtonChapterDetails(params) {
  return request({
    url: `/mapi/v2/mweb/comic/${params}`,
    method: 'get',
  })
}

/**
 * 获取世界数据
 */
export function getCartoonWorldInfo(limit = 20) {
  return request({
    url: `/api/v1/graph/pc/feeds/getRecommendFeed?uid=0&webTokenId=1615007958330_FFwnyURnzD0rgO2&since=0&limit=${limit}`,
    method: 'get',
  })
}

/**
 * 获取热搜
 */
export function getHotInfo(param = { page: 1, size: 10 }) {
  return request({
    url: `/mapi/search/mini/hot_word?diffServerTimestamp=${Date.now()}&page=${
      param.page
    }&size=${param.size}`,
  })
}

/**
 * 获取模糊搜索结果
 */
export function getSuggestionInfo(param = { q: '' }) {
  return request({
    url: `/api/v1/search/suggestion_topic_author?q=${param.q}&type=2&f=2`,
  })
}

/**
 * 获取搜索结果
 */
export function getSearchResult(param = { q: '' }) {
  return request({
    url: `/mapi/search/web/complex?diffServerTimestamp=${Date.now()}&q=${
      param.q
    }&f=4`,
  })
}

/**
 * 获获取分类数据 ❌
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
 * 获取全部榜单数据 ❌
 */
export function getListInfo() {
  return request({
    url: '/api/v2/pweb/all_rank/topics',
    method: 'get',
  })
}

/**
 * 获取原创数据 ❌
 */
export function getOriginalInfo() {
  return request({
    url: '/api/v2/pweb/ugc/rec_topics',
    method: 'get',
  })
}
