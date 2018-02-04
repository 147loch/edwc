// Loader script revamped
$(document).ready(function() {
  // Goo through every webpages
  $('webview').each((i, e) => {
    // Load webcontents and get the current url of webview
    const {webContents} = require('electron')
    const webview = $(e)[0]
    let currentURL = webview.src
    let fired = false

    /**
     * When load starts, callback function
     */
    const loadstart = () => {
      // If the current url does not equal the webview src, then fire the loader (fixes the glitch when pages were loading things async and fired the events anyway)
      if (currentURL !== webview.src && !fired) {
        $(e).css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '400')
        $(e).css("visibility",  "hidden")
        currentURL = webview.src
        fired = true
      }
    }

    /**
     * When load finishes, callback function
     */
    const loadstop = () => {
      $(e).css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400')
      fired = false
    }

    // Event listeners on the webview
    webview.getWebContents().on('did-stop-loading', loadstop)
    webview.getWebContents().on('load-commit', loadstart)
  })
});
