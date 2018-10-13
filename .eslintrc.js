module.exports = {
  root: true,
  extends: 'standard',
  rules:{
    'eol-last': ['error', 'never']
  },
  globals: {
    $: true
  },
  env: {
    browser: true,
    node: true
  },
  plugins: [
    'html'
  ]

}