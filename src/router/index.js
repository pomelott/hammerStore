import Vue from 'vue'
import Router from 'vue-router'
import comList from '@/components/goods-list'
import detail from '@/components/detail'
import cart from '@/components/checkCart'
import checkout from '@/components/checkout'
import pay from '@/components/pay'
import account from '@/components/account'
import myOrder from '@/components/myOrder'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: comList
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
    },
    {
      path: '/account',
      component: account,
      children: [
        {
          path: '',
          name: 'order',
          component: myOrder
        }
      ]
    }
  ]
})

export default router
