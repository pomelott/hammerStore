import Vue from 'vue'
import Router from 'vue-router'
import comList from '@/components/goods-list'
import pomelo from '@/components/pomelo'
import detail from '@/components/detail'
import cart from '@/components/checkCart'
import checkout from '@/components/checkout'
import pay from '@/components/pay'
Vue.use(Router)

let router = new Router({
  mode: 'history',
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
      path:'/detail',
      component: detail
    },
    {
      path: '/cart',
      component: cart
    },
    {
      path: '/checkout',
      component: checkout
    },
    {
      path: '/pay',
      component: pay
    }
  ]
})

export default router
