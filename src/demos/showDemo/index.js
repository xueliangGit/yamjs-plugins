/*
 * @Author: xuxueliang
 * @Date: 2019-09-17 16:57:28
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-18 15:19:09
 */
import Yam, { Component } from 'yamjs'
let i = 0
@Component({
  tagName: 'show-demo',
  props: ['title']
})
class App extends Yam {
  $created () {
    this.i = ++i
  }
  render () {
    return <div style='border:2px rgba(0,0,0,.2) dashed;margin:10px;padding:10px'>
      { this.i }、  插件：{ this.title }
      <section style='margin:10px;border:10px rgba(0,0,0,.1) solid;padding:10px'>
        <slot />
      </section>
    </div>
  }
}
export default App
