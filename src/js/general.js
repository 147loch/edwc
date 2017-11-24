/**
 * Main function for the app.
 * Fired when the document is ready
 */
function init() {
  // Dependencies from Electron for the following code
  const {BrowserWindow, webContents} = require('electron').remote

  /**
   * When the minify button is clicked, do the action.
   */
  $('#min-btn').on('click', (e) => {
    let mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.minimize();
  });

  /**
   * When the maximize button is clicked,
   *  First, check if the window is isMaximized
   *    If Yes: then unmaximize it
   *    If Not: then maximize it
   */
  $('#max-btn').on('click', (e) => {
    let mainWindow = BrowserWindow.getFocusedWindow();
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  /**
   * When the close button is clicked, close the app.
   */
  $('#close-btn').on('click', (e) => {
    let mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.close();
  });

  /**
   * When a new tab is shown:
   *  get the id from the tab button and use it to
   *  get the id of the corresponding webivew stored in the data-webview tag
   *
   *  then get the webview and check for navigation
   */
  $('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
    // get the tab id from the element
    // use it to then get the the id of the webview
    let id = e.target.id;
    let wvId = $("#" + id).attr('data-webview');

    // use the id of the webview to store it as a variable object
    let wv = document.getElementById(wvId);
    // when the webview has finished loading, fire the function for the navigation
    $(wv).on('did-finish-load', () => {
      // first, test if we can go to the previous page
      if (wv.canGoBack()) {
        // select the button as a jquery object
        let bbtn = $('#back-btn');
        // remove any active event listener on the button
        bbtn.off();
        // make sure the button is clickable and looks like it is
        bbtn.removeClass('disabled');
        // activate a one-time event listener on the button
        bbtn.one('click', () => {
          // if clicked, go to previous page
          wv.goBack();
        })
      } else {
        // if it's not possible to go back in time, verify that the class disabled is on the button
        // and remove any active event listener on it
        let bbtn = $('#back-btn');
        bbtn.off();
        bbtn.addClass('disabled');
      }
      // do exactly the same thing for the forward button.
      if (wv.canGoForward()) {
        let fbtn = $('#forw-btn');
        fbtn.off();
        fbtn.removeClass('disabled');
        fbtn.one('click', () => {
          wv.goForward();
        })
      } else {
        let fbtn = $('#forw-btn');
        fbtn.off();
        fbtn.addClass('disabled');
      }
    });
  });
  // Fire the event on document launch, otherwise the navigation buttons wouldn't be working for the first website when launched.
  $('a#nav-eddb-tab').trigger('shown.bs.tab');

  /**
   * When the home button is clicked, fires a function that will go through
   * every webview automatically and put the source to the data-src value
   * that is configured in the html file.
   */
  $('#home-btn').on('click', () => {
    $('webview').each((i, e) => {
      let src = $(e).attr('data-src');
      let id = $(e).attr('id');
      // still using native js as jquery is not compatible with electron's webview functions
      document.getElementById(id).loadURL(src);
    });
  });

  /**
   * When the window is resized, check if it is in fullscreen or maximized,
   * just so we can change the fullscreen button to the fullscreen exit on
   */
  $(window).on('resize', () => {
    // import of the browserwindow (i know this is dumb as I've already done it, but it works. If someone has better way: PR it!) then get the mainWindow
    const {BrowserWindow} = require('electron').remote
    let mainWindow = BrowserWindow.getFocusedWindow();

    // use the BrowserWindow functions to get the current state of the window
    let isMaximized = mainWindow.isMaximized();
    let isMinimized = mainWindow.isMinimized();
    let isFullScreen = mainWindow.isFullScreen();

    // if fullscreen or maximized, put the Google's material icon to fullscreen_exit, otherwise, set it to fullscreen
    if (isFullScreen || isMaximized) {
      $('#max-btn-i').text("fullscreen_exit");
    } else {
      $('#max-btn-i').text("fullscreen");
    }
  })

  // Devtools for EDDB and tracking styling issues
  // $("#webviewEddb")[0].openDevTools();
};

/**
 * When the document is ready,
 * launches the main function.
 */
document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    init();
  }
};
