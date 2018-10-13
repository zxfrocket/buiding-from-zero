import './less/bg1.less'

const container = document.getElementById('css-shaking-container')
const color = document.createElement('div')
color.className = 'css-shaking-orange'
container.appendChild(color)

$('#jq-container').addClass('jquery-test')

const hmr = document.getElementById('test-hmr')
hmr.innerHTML = 'eee'

if (module.hot) {
  module.hot.accept()
}