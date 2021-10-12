import Vue from 'vue'
import axios from 'axios'

const isServer = Vue.prototype.$isServer || process.server
const baseURL = isServer ? `${process.env.DOMAIN}/api` : `${window.location.origin}/api`
const ajax = axios.create({
  baseURL,
  responseType: 'json',
  withCredentials: true,
})

ajax.interceptors.response.use((response) => {
  const { data } = response
  if (data && !isServer && !data.success) {
    console.error(data.message)
  }
  return data
}, error => Promise.reject(error))

export const state = () => ({
  articles: [],
  articlesTop: [],
  articlesNew: [],
  total: 0,
  limit: 15,
  article: {},
  categories: [],
  category: {},
})

export const mutations = {
  setData(state, payload) {
    state[payload.key] = payload.value
  },
  setArticles(state, { data, total }) {
    state.articles = data
    state.total = total
  },
}

export const actions = {

  /**
   * article api
   */
  async deleteArticle({ commit }, id) {
    return await ajax.delete(`/article/${id}`)
  },
  async postArticle({ commit }, body) {
    return await ajax.post('/article', body)
  },
  async patchArticle({ commit }, body) {
    return await ajax.patch(`/article/${body.id}`, body)
  },
  async getArticle({ commit, state }, id) {
    // 如果是管理员，可以看到私有文章
    const { token } = state
    const { data } = await ajax.get(`/article/${id}`, {
      headers: {
        token,
      },
    })
    commit('setData', {
      key: 'article',
      value: data,
    })
  },
  async getArticlesTop({ commit, state }) {
    const { token } = state
    const { data } = await ajax.get(`/articles-top`, {
      headers: {
        token,
      },
    })
    commit('setData', {
      key: 'articlesTop',
      value: data,
    })
  },

  // 获取最新文章
  async getArticlesNew({ commit, state }) {
    const { token } = state
    const { data } = await ajax.get(`/articles-new`, {
      headers: {
        token,
      },
    })
    commit('setData', {
      key: 'articlesNew',
      value: data,
    })
  },
  async getArticles({ state, commit }, params) {
    const { data, total } = await ajax.get('/articles', {
      params: {
        ...params,
        limit: state.limit,
      }
    })
    commit('setArticles', {
      data,
      total,
    })
    return data
  },
  async getDrafts({ state, commit }, params) {
    const { data, total } = await ajax.get('/drafts', {
      params: {
        ...params,
        limit: state.limit,
      }
    })
    commit('setArticles', {
      data,
      total,
    })
    return data
  },

  /**
   * category api
   */
  async getCategories({ commit, state }) {
    // 管理员可以看到所有分类
    const { token } = state
    const { data } = await ajax.get('/categories', {
      headers: {
        token,
      },
    })
    commit('setData', {
      key: 'categories',
      value: data,
    })
    return data
  },
  async getCategory({ commit }, id) {
    const { data } = await ajax.get(`/category/${id}`)
    commit('setData', {
      key: 'category',
      value: data,
    })
  },
  async postCategory({ commit }, body) {
    return await ajax.post('/category', body)
  },
  async patchCategory({ commit }, body) {
    return await ajax.patch(`/category/${body.id}`, body)
  },
  async deleteCategory({ commit }, id) {
    return await ajax.delete(`/category/${id}`)
  },
}
