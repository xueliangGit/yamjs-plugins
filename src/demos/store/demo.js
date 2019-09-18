/*
 * @Author: xuxueliang
 * @Date: 2019-09-17 16:57:28
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-18 15:16:51
 */
import Yam, { Component } from 'yamjs'
// 单独的store
import newStore from './newStore'
@Component({
  tagName: 'store-demofour',
  store: newStore
})
class AppFour extends Yam {
  render () {
    return <div>
      Appfourwidth:{ this.$store.width }
    </div>
  }
}

@Component({
  tagName: 'store-demothree',
  store: newStore
})
class AppThree extends Yam {
  plus () {
    this.$store.commit('width', parseInt(Math.random() * 500))
  }
  render () {
    return <div>
      Appthreewidth:{ this.$store.width }
      <AppFour />
      <button onClick={this.plus.bind(this)}>变化值</button>

    </div>
  }
}
// 共享的的store
@Component({
  tagName: 'store-demotwo'
})
class Apptwo extends Yam {
  render () {
    return <div>
      Apptwowidth:{ this.$store.width }

    </div>
  }
}
// two
@Component({
  tagName: 'store-demo'
})
class App extends Yam {
  plus () {
    this.$store.commit('width', parseInt(Math.random() * 500))
  }
  render () {
    return <div>
      <p>共享的的store</p>
      <Apptwo />
      Appwidth:{ this.$store.width }
      <button onClick={this.plus.bind(this)}>变化值</button>
      <p>在共享的store中还可以设置，单独的store</p>
      <AppThree />
    </div>
  }
}

export default App
