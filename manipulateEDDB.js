// Import dependencies
const fs = require('fs')
const path = require('path')

// when window is ready inject the css
window.onload = function() {
  // $('.bottom-ad')[0].style.display='none';
  //Append the script to the the head tag, which is cool cause it overrides it!
  $('head').append("<style>" + fs.readFileSync(path.join(__dirname, 'assets/css/eddb/mod.css'), 'utf8') + "</style>");
};
