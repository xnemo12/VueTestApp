import Vue from 'vue'
import Router from 'vue-router'
import DocumentList from '../views/DocumentList'
import DocumentNewForm from '../views/DocumentForm'
import DocumentView from '../views/DocumentView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DocumentList',
      component: DocumentList
    },
    {
      path: '/form',
      name: 'DocumentNewForm',
      component: DocumentNewForm
    },
    {
      path: '/form/:id',
      name: 'DocumentEditForm',
      component: DocumentNewForm,
      props: true
    },
    {
      path: '/view/:id',
      name: 'DocumentView',
      component: DocumentView,
      props: true
    }
  ]
})
