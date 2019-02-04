// import {eventsResource} from '@/http/resources'
// import {orderResource} from '@/http/resources'
//
// export default {
//   namespaced: true,
//   state: {
//     sessions: {
//       count: 0,
//       results: []
//     },
//     sessionDetail: {
//       event: {
//         name: ''
//       }
//     },
//     priceCategories: [],
//     ticketList: []
//   },
//   getters: {
//     getPriceCategoryById: (state) => (id) => {
//       for (let i = 0; i < state.priceCategories.length; i++) {
//         if(state.priceCategories[i].id === id)
//           return state.priceCategories[i]
//       }
//       return false
//     }
//   },
//   mutations: {
//     SET_SESSIONS(state, sessions) {
//       state.sessions = sessions
//     },
//     CLEAR_SESSIONS(state) {
//       state.sessions = {
//         count: 0,
//         results: []
//       }
//     },
//     SET_SESSION_DETAIL(state, sessionDetail) {
//       state.sessionDetail = sessionDetail
//     },
//     CLEAR_SESSION_DETAIL(state) {
//       state.sessionDetail = {
//         event: {
//           name: ''
//         }
//       }
//     },
//     SET_PRICE_CATEGORIES(state, priceCategories) {
//       state.priceCategories = priceCategories
//     },
//     CLEAR_PRICE_CATEGORIES(state) {
//       state.priceCategories = []
//     },
//     SET_TICKET_LIST(state, ticketList) {
//       state.ticketList = ticketList
//     }
//   },
//   actions: {
//     getSessions({commit}, params) {
//       commit('CLEAR_SESSIONS')
//       return new Promise((resolve, reject) => {
//         eventsResource.getSessions({
//           page: params.pagination.page,
//           page_size: params.pagination.perPage,
//           q: params.q
//         }).then((response) => {
//           commit('SET_SESSIONS', response.body)
//         }).catch((error) => {
//           reject(error)
//         })
//       })
//     },
//     getPriceCategories({commit}) {
//       commit('CLEAR_PRICE_CATEGORIES')
//       return new Promise((resolve, reject) => {
//         eventsResource.getPriceCategories().then((response) => {
//           commit('SET_PRICE_CATEGORIES', response.body)
//         }).catch((error) => {
//           reject(error)
//         })
//       })
//     },
//     getSessionDetail({commit}, id) {
//       return new Promise((resolve, reject) => {
//         eventsResource.getSessionDetail({id})
//           .then((response) => {
//             commit('SET_SESSION_DETAIL', response.body)
//             resolve()
//           }).catch((error) => {
//           reject(error)
//         })
//       })
//     },
//     doOrder({commit}, order) {
//       return new Promise((resolve, reject) => {
//         orderResource.order(order).then((response) => {
//           commit('SET_TICKET_LIST', response.body)
//           resolve(response)
//         }).catch((error) => {
//           reject(error)
//         })
//       })
//     },
//     doSimpleOrder({commit}, order) {
//       return new Promise((resolve, reject) => {
//         orderResource.simpleOrder(order).then((response) => {
//           commit('SET_TICKET_LIST', response.body)
//           resolve(response.body)
//         }).catch((error) => {
//           reject(error)
//         })
//       })
//     }
//   }
// }
