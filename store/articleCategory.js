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

  /** article api **/
  async deleteArticle({ commit }, id) {
    return await this.$api.delete(`/article/${id}`)
  },
  async postArticle({ commit }, body) {
    return await this.$api.post('/article', body)
  },
  async patchArticle({ commit }, body) {
    return await this.$api.patch(`/article/${body.id}`, body)
  },
  async getArticle({ commit, rootState }, id) {
    // 如果是管理员，可以看到私有文章
    const { token } = rootState.user
    const { data } = await this.$api.get(`/article/${id}`, { headers: { token, }, })
    commit('setData', { key: 'article', value: data, })
    return data
  },
  async getArticlesTop({ commit, rootState }) {
    const { token } = rootState.user
    const { data } = await this.$api.get(`/articles-top`, { headers: { token, }, })
    commit('setData', { key: 'articlesTop', value: data, })
  },

  // 获取最新文章
  async getArticlesNew({ commit, rootState }) {
    const { token } = rootState.user
    const { data } = await this.$api.get(`/articles-new`, { headers: { token, }, })
    commit('setData', { key: 'articlesNew', value: data, })
  },
  async getArticles({ state, commit }, params) {
    const { data, total } = await this.$api.get('/articles', { params: { ...params, limit: state.limit, } })
    commit('setArticles', { data, total, })
    return data
  },
  async getDrafts({ state, commit }, params) {
    const { data, total } = await this.$api.get('/drafts', { params: { ...params, limit: state.limit, } })
    commit('setArticles', { data, total, })
    return data
  },

  /** category api **/
  async getCategories({ commit, rootState }) {
    // 管理员可以看到所有分类
    const { token } = rootState.user
    const { data } = await this.$api.get('/categories', { headers: { token, }, })
    commit('setData', { key: 'categories', value: data, })
    return data
  },
  async getCategory({ commit }, id) {
    const { data } = await this.$api.get(`/category/${id}`)
    commit('setData', { key: 'category', value: data, })
  },
  async postCategory({ commit }, body) {
    return await this.$api.post('/category', body)
  },
  async patchCategory({ commit }, body) {
    return await this.$api.patch(`/category/${body.id}`, body)
  },
  async deleteCategory({ commit }, id) {
    return await this.$api.delete(`/category/${id}`)
  },
}
