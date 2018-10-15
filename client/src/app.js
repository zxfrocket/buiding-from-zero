import './less/bg1.less'
import add from './calc/add'
import sub from './calc/sub'

const container = document.getElementById('css-shaking-container')
const color = document.createElement('div')
color.className = 'css-shaking-orange'
container.appendChild(color)

console.log(`a + b = ${add(10, 12)}`)
console.log(`a - b = ${sub(10, 12)}`)

$('#jq-container').addClass('jquery-test')

const hmr = document.getElementById('test-hmr')
hmr.innerHTML = 'eee'

if (module.hot) {
  module.hot.accept()
}