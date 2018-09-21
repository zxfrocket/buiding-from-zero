
//require.include('./lib/cm')

require.ensure(['lodash'], function(){
  var _ = require('lodash')
  console.log(_.map([1,2,3], x => 2*2))
}, 'vendor')

const sub = 'sub2';

if (sub === 'sub1') {
  require.ensure(['./lib/sub1'], function () {
    var sub1 = require('./lib/sub1')
    console.log(sub1)
  }, 'sub1')
} else if (sub === 'sub2') {
  import(/* webpackChunkName:'sub2' */ './lib/sub2').then(function (sub2) {
    console.log(sub2)
  }, 'sub2')
}


export default 'app'