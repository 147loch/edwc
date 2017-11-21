// main electron imports
const {app, autoUpdater, webContents, dialog, BrowserWindow} = require('electron')

// modules needed for the app to work
const path = require('path')
const url = require('url')
const fs = require('fs')
const isDev = require('electron-is-dev')

// if the app is not in development mode (packaged),
// load the autoUpdater's distant server connected to github's releases of the repo
if (!isDev) {
  // set up the server's (I really should get it working on my Ubuntu 14.04 server cuz using another service is unprofessional...)
  const server = 'https://edwc-updates.herokuapp.com/'
  const feed = `${server}/download/${process.platform}`

  // set up the feed
  autoUpdater.setFeedURL(feed)

  // check if updates every minute.
  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 60000)

  // when an update is ready to be installed, ask the user and badaboom the update is done.
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })

  // if a sad error happens, let the user know.
  autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
  })
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
    icon: __dirname + '/src/images/favicon.jpg',
    titleBarStyle: 'hidden',
    frame: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

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
  })
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
