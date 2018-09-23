import bg1 from './less/bg1.less'
import bg2 from './less/bg2.less'

let appElem = document.getElementById("app");
appElem.innerHTML = '<div class="' + bg2.box2 + '"></div>';

import(/* webpackChunkName: 'dyn'*/'./less/dyn.less').then(function(dyn){
  console.log(dyn);
})