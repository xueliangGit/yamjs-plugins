import Yam, { Component } from 'yamjs'
// import { Transform } from 'stream'
// var style = require('./myTimers.styl')
// console.log('style', style, style.toString())
 @Component({
   tagName: 'my-hour',
   style: require('./hour.stylus'),
   customElements: false,
   props: ['hour', 'step', 'width']
 })
class App extends Yam {
   $data () {
     return {
       step: 24,
       width: 200
     }
   }
   show (v) {
     console.log(this.emitProp('showFn', 'asdasd'))
   }
   showP (v) {
     //  console.log(this)
     this.emitProp('callFn', '111111')
   }
   getStyle (i) {
     return { transform: 'rotate(' + 360 / this.step * i + 'deg)', width: this.width + 'px' }
   }
   showList () {
     let listArray = []
     for (let i = this.step - 1; i >= 0; i--) {
       listArray.push(<li className={this.hour % this.step === i ? 'active' : ''} style={this.getStyle(i)}><span>{i}</span></li>)
     }
     return listArray
   }
   getUlStyle () {
     return { transform: 'rotate(' + -(+this.hour * 360 / this.step) + 'deg)', width: this.width + 'px', height: this.width + 'px' }
   }
   render () {
     return (
       <ul style={this.getUlStyle()} onClick={this.showP.bind(this)} className='hour' >
         {this.showList()}
       </ul>
     )
   }
 }
console.log('GoTop:#config', App._tagName)

export default App
