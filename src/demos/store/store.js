/*
 * @Author: xuxueliang
 * @Date: 2019-09-17 16:53:41
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-17 18:48:41
 */
import Yam from 'yamjs'
import Store from '../../plugins/store'
Yam.use(new Store({
  state: {
    width: 0
  }
})
)
