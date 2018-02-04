// main electron imports
const {app, webContents, dialog, BrowserWindow, session, ipcMain} = require('electron')
const {autoUpdater} = require("electron-updater");

// modules needed for the app to work
const path  = require('path')
const url   = require('url')
const fs    = require('fs')
const isDev = require('electron-is-dev')
const log   = require('electron-log')

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// if the app is not in development mode (packaged),
// load the autoUpdater's distant server connected to github's releases of the repo
if (!isDev) {
// removed
} else {
  // if in development, load the electron-reload module for simplicity
  require('electron-reload')(__dirname)
}

// Keep a global reference of the window object
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 860,
    icon: __dirname + '/src/images/favicon.jpg',
    titleBarStyle: 'hidden',
    frame: false,
    show: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Hide the menu
  mainWindow.setMenu(null);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // When window is resized, reset the webview's dimensions
  // This is actually a fix of a bug with the webview when the window is resized and the webview wouldn't resize properly.
  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getContentSize()
    for (let wc of webContents.getAllWebContents()) {
      // Check if `wc` belongs to a webview in the `win` window.
      if (wc.hostWebContents &&
          wc.hostWebContents.id === mainWindow.webContents.id) {
        wc.setSize({
          normal: {
            width: width,
            height: height - 56
          }
        })
      }
    }

    autoUpdater.checkForUpdatesAndNotify();
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
