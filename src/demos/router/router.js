/*
 * @Author: xuxueliang
 * @Date: 2019-09-18 14:59:02
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-18 20:05:35
 */
import Yam from 'yamjs'
import Router from '../../plugins/router'
Yam.use(
  new Router({
    routes: [{
      name: 'index',
      path: '/',
      component: 'router-one'
    },
    {
      path: '/rtwo',
      component: 'router-two',
      name: 'rTwo'
    }]
  })
)
