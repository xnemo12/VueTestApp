import {documentResource} from '@/http/resources'

export default {
  namespaced: true,
  state: {
    documents: {
      count: 0,
      results: []
    }
  },
  getters: {
    // getPriceCategoryById: (state) => (id) => {
    //   for (let i = 0; i < state.priceCategories.length; i++) {
    //     if(state.priceCategories[i].id === id)
    //       return state.priceCategories[i]
    //   }
    //   return false
    // }
  },
  mutations: {
    SET_DOCUMENTS (state, documents) {
      state.documents = documents
    },
    CLEAR_DOCUMENTS (state) {
      state.documents = {
        count: 0,
        results: []
      }
    }
  },
  actions: {
    getDocuments ({commit}, params) {
      commit('CLEAR_DOCUMENTS')
      return new Promise((resolve, reject) => {
        documentResource.getDocuments({
          page: params.pagination.page,
          page_size: params.pagination.perPage,
          q: params.q
        }).then((response) => {
          commit('SET_DOCUMENTS', response.body)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
