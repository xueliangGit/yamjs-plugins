/*
 * @Author: xuxueliang
 * @Date: 2019-09-17 16:57:28
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-18 20:10:33
 */
import Yam, { Component } from 'yamjs'
import routerView from '../../plugins/router/routerView'
@Component({
  tagName: 'router-one'
})
// eslint-disable-next-line no-unused-vars
class Apptwo extends Yam {
  go () {
    this.$router.push({
      name: 'rTwo',
      query: { a: 1, b: 2 }
    })
  }
  render () {
    return <div>
      router-one:
      <button onClick={this.go.bind(this)}>toTwo</button>
    </div>
  }
}
// two
@Component({
  tagName: 'router-two'
})
// eslint-disable-next-line no-unused-vars
class App extends Yam {
  go () {
    this.$router.push({
      name: 'index'
    })
  }
  render () {
    return <div>
      router-two参数[this.$router.current.query]:{ this.$router.current.query }
      <button onClick={this.go.bind(this)}>toOne</button>
    </div>
  }
}
export default routerView
