import Vue from 'vue'
import Router from 'vue-router'
import indexHeader from '@/components/header'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexHeader',
      component: indexHeader
    }
  ]
})
