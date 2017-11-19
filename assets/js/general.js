(function () {
  function init() {
    const {BrowserWindow, webContents} = require('electron').remote
    // Minimize task
    document.getElementById("min-btn").addEventListener("click", (e) => {
      let mainWindow = BrowserWindow.getFocusedWindow();
      mainWindow.minimize();
    });

    // Maximize window
    document.getElementById("max-btn").addEventListener("click", (e) => {
      let mainWindow = BrowserWindow.getFocusedWindow();
      if(mainWindow.isMaximized()){
        mainWindow.unmaximize();
      }else{
        mainWindow.maximize();
      }
    })

    // Close app
    document.getElementById("close-btn").addEventListener("click", (e) => {
      let mainWindow = BrowserWindow.getFocusedWindow();
      mainWindow.close();
    });

    // Check if go back and activate button and same for forward
    (function checkNav() {
      $('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
        let currentID = $('.tab-pane.show').attr('id');
        let activeTab = "";
        switch (currentID) {
          case 'nav-eddb':
            activeTab = "webviewEddb";
            break;
          case 'nav-coriolis':
            activeTab = "webviewCoriolis";
            break;
          case 'nav-shipyard':
            activeTab = "webviewShipyard";
            break;
          case 'nav-starmap':
            activeTab = "webviewStarmap";
            break;
          case 'nav-inara':
            activeTab = "webviewInara";
            break;
          default:
            console.log("Webview is undefined, so no goback and goforward...");
        }

        let wv = document.getElementById(activeTab);
        $('#' + activeTab).on('did-finish-load', () => {
          if (wv.canGoBack()) {
            $('#back-btn').removeClass('disabled');
            $('#back-btn').on('click', () => {
              $('#' + activeTab).css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '400', () => {
                wv.goToOffset(-1);
              });
              $('#' + activeTab).css("visibility",  "hidden");
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
      })
      $('a[data-toggle="tab"]').trigger('shown.bs.tab')
    })();

    $('#home-btn').on('click', () => {
      document.getElementById('webviewEddb').loadURL("http://eddb.io");
      document.getElementById('webviewCoriolis').loadURL("http://coriolis.edcd.io");
      document.getElementById('webviewShipyard').loadURL("http://www.edshipyard.com/");
      document.getElementById('webviewStarmap').loadURL("http://www.edsm.net/");
      document.getElementById('webviewInara').loadURL("http://inara.cz/");
    })

    // $("#webviewEddb")[0].openDevTools();
  };

  document.onreadystatechange =  () => {
      if (document.readyState == "complete") {
          init();
      }
  };
})();

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
