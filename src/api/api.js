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
    url: `/mapi/v2/mweb/topic/${params}`,
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
 * 获取世界数据(pc)
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
export function getSuggestionInfo(params) {
  return request({
    url: `/mapi/search/mini/suggest?q=${params.q}&size=${
      params.size
    }&diffServerTimestamp=${Date.now()}`,
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
 * 获获取分类数据
 * @param params 请求参数
 */
export function getCategoryInfo(params = {}) {
  return request({
    url: `/mapi/search/mini/topic/multi_filter`,
    params: {
      diffServerTimestamp: Date.now(),
      page: params.page || 1,
      size: params.size || 20,
      tag_id: params.tag_id || 0,
      update_status: params.update_status || 0,
      pay_status: params.pay_status || 0,
      label_dimension_origin: params.label_dimension_origin || 1,
      sort: params.sort || 1,
      fav_filter: params.fav_filter || 0,
      gender: 0,
    },
    method: 'get',
  })
}

/**
 * 获取全部榜单数据
 */
export function getListInfo(params = {}) {
  return request({
    url: '/mapi/mini/v1/comic/mkuaikan/rank_list',
    params: {
      diffServerTimestamp: Date.now(),
      since: params.since || 0,
      limit: params.limit || 20,
      need_ranks: true,
      rank_id: params.rank_id,
    },
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
