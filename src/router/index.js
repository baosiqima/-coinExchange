import Vue from 'vue'
import Router from 'vue-router'

import User from '@/pages/user/User'
import Slider from '@/components/Slider'
import Login from '@/pages/user/Login'
import FindPwd from '@/pages/user/FindPwd'
import Regist from '@/pages/user/Regist'


import Account from '@/pages/account/Account'
import IdentityVerify from '@/pages/account/IdentityVerify'
import Security from '@/pages/account/Security'

import Property from '@/pages/property/Property'
import CoinOption from '@/pages/property/CoinOption'
import OrderList from '@/pages/property/OrderList'

import Main from '@/pages/Main'
import Home from '@/pages/Home'
import CoinExchange from '@/pages/exchange/CoinExchange'
Vue.use(Router)

const router =  new Router({
  mode:"history",
  routes: [
    // login
    {
      path: '/',
      component: Main,
      children:[
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'property',
          name: 'property',
          component: Property,
          children:[
            {
              path: 'coinoption',
              component: CoinOption
            },
            {
              path: 'coinoption/:dealId/:type',
              name:'coinoption',
              component: CoinOption
            },
            {
              path: 'orderlist',
              name: 'orderlist',
              component: OrderList
            }
          ]
        },
        {
          path: 'account',
          name: 'account',
          component: Account,
          children:[
            {
              path: '',
              component: Security
            },
            {
              path: 'identityverify',
              name: 'identityverify',
              component: IdentityVerify
            },
            {
              path: 'security',
              name: 'security',
              component: Security
            }
          ]
        },
        {
          path: 'user',
          name: 'User',
          component: User,
          children:[
            {
              path: 'regist',
              name: 'regist',
              component: Regist
            },
            {
              path: 'login',
              name: 'login',
              component: Login
            }
          ]
        },
        {
          path: 'findpassword', //我改成FindPwd就变成那样了
          name: 'findpassword',
          component: FindPwd
        },
        {
          path: 'exchange/coinexchange',
          name: 'coinexchange',
          component: CoinExchange
        }
      ]
    }
  ]
})
export default router 