import Vue from 'vue'
import Router from 'vue-router'
import comList from '@/components/goods-list'
import pomelo from '@/components/pomelo'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  // base: '/',
  routes: [
    {
      path: '/',
      component: comList
    },
    {
      path: '/pomelo',
      component: pomelo
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
