import Calc from './lib/Calc'
import * as _ from 'lodash'

const rets = []

rets.push(Calc.sum(1,2))
rets.push(Calc.multi(1,2))
rets.push(Calc.minus(1,2))

console.log(rets);

const newArr = rets.map(x => 2*x)
console.log(newArr)

alert(`sum is ${Calc.sum(1,2)} , multi is ${Calc.multi(1,2)} and minus is ${Calc.minus(1,2)}`)

const a:String = 'aaa';
console.log(a);

_.chunk([1,2,3],2)
