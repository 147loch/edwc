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
   */
  $('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
    let id = e.target.id;
    let wvId = $("#" + id).attr('data-webview');

    // Transfer the id to navBtn
    if (wvId) navBtn(wvId);
  });
  // Fire the event on document launch, otherwise the navigation buttons wouldn't be working for the first website when launched.
  $('a#nav-eddb-tab').trigger('shown.bs.tab');
  /**
   * Function that checks if you can go to previous page or go forward.
   * @param  {string} wvId ID of the current tab's webview, generated when the event shown.bs.tab is triggered with the previous function
   */
  function navBtn(wvId) {
    // Select the webview using native js since webview functions don't work within jQuery
    let wv = document.getElementById(wvId);
    // When a page has finished loading, means the user navigated, so check if we can use navigation buttons
    $(wv).on('did-finish-load', () => {
      // if able to go back, remove the disabled class of the #back-btn button. Then add an event listener to check if the button is clicked
      if (wv.canGoBack()) {
        $('#back-btn').removeClass('disabled');
        $('#back-btn').on('click', () => {
          // if button is clicked, fade the webview out and go to page offset -1, which works better than goBack() to me.
          $(wv).css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '400', () => {
            wv.goToOffset(-1);
          });
          $(wv).css("visibility",  "hidden");
        });
      } else {
        // if we can't go back, than verifying that the button has the class .disabled
        $('#back-btn').addClass('disabled');
      }

      // if we can go forward, then do the same thing, except we don't need to fade out the webview as goForward() fires the event
      // did-start-loading used by the loader to put the loader on.
      if (wv.canGoForward()) {
        $('#forw-btn').removeClass('disabled');
        $('#forw-btn').on('click', (mainWindow) => {
          wv.goForward();
        });
      } else {
        $('#forw-btn').addClass('disabled');
      }
    });
  }

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
