const fs = require('fs')
const path = require('path')
window.onload = function() {
  $('.bottom-ad')[0].style.display='none';
  $('head').append("<style>" + fs.readFileSync(path.join(__dirname, 'assets/css/eddb/mod.css'), 'utf8') + "</style>");
};
// $('#webviewEddb').on('did-finish-load', () => {
//
//
//   // $('#webviewEddb').contents().find('head').append('<style>' + fs.readFileSync(path.join(__dirname, 'assets/css/eddb/mod.css'), 'utf8') + '</style>')
// })
// window.$ = window.jQuery = require('jquery');
