function init() {
  const {BrowserWindow, webContents} = require('electron').remote
  // Minimize task
  $('#min-btn').on('click', (e) => {
    let mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.minimize();
  });

  // Maximize window
  $('#max-btn').on('click', (e) => {
    let mainWindow = BrowserWindow.getFocusedWindow();
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  // Close app
  $('#close-btn').on('click', (e) => {
    let mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.close();
  });

  // Check if go back and activate button and same for forward
  $('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
    let id = e.target.id;
    let wvId = $("#" + id).attr('data-webview');

    if (wvId) navBtn(wvId);
  });
  $('a#nav-eddb-tab').trigger('shown.bs.tab');
  function navBtn(wvId) {
    let wv = document.getElementById(wvId);
    $(wv).on('did-finish-load', () => {
      if (wv.canGoBack()) {
        $('#back-btn').removeClass('disabled');
        $('#back-btn').on('click', () => {
          $(wv).css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '400', () => {
            wv.goToOffset(-1);
          });
          $(wv).css("visibility",  "hidden");
        });
      } else {
        $('#back-btn').addClass('disabled');
      }

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

  $('#home-btn').on('click', () => {
    $('webview').each((i, e) => {
      let src = $(e).attr('data-src');
      let id = $(e).attr('id');
      document.getElementById(id).loadURL(src);
    });
  });

  // Devtools for EDDB and tracking styling issues
  // $("#webviewEddb")[0].openDevTools();
};

document.onreadystatechange =  () => {
  if (document.readyState == "complete") {
    init();
  }
};

$(window).on('resize', () => {
  const {BrowserWindow} = require('electron').remote
  let mainWindow = BrowserWindow.getFocusedWindow();

  let isMaximized = mainWindow.isMaximized();
  let isMinimized = mainWindow.isMinimized();
  let isFullScreen = mainWindow.isFullScreen();

  if (isFullScreen || isMaximized) {
    $('#max-btn-i').text("fullscreen_exit");
  } else {
    $('#max-btn-i').text("fullscreen");
  }
})
