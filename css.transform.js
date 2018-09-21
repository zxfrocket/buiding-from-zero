module.exports = function(css){
  console.log(css);

  if(window.innerWidth < 800){
    return css.replace('red', 'green');
  }
  return css;
}