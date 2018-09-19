import '../../node_modules/@babel/polyfill'

import sum from './lib/sum'

const multi = require('./lib/multi')

const rets = []

// require(['./lib/minus'], function(minus){
//   rets.push(minus(1,2))

//   alert(rets[0],rets[1],rets[2])
// })

rets.push(sum(1,2))
rets.push(multi(1,2))

console.log(rets);
console.log(rets.includes(10));

const newArr = rets.map(x => 2*x)
console.log(newArr)

alert(`sum is ${sum(1,2)} and multi is ${multi(1,2)}`)
