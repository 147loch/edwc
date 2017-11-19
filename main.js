const {app, autoUpdater, webContents, dialog, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')
const fs = require('fs')
const isDev = require('electron-is-dev')

require('electron-reload')(__dirname)

if (!isDev) {
  const server = 'https://edwc-updates.herokuapp.com/'
  const feed = `${server}/download/${process.platform}`

  autoUpdater.setFeedURL(feed)

  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 60000)

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

  autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
  })
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: __dirname + '/favicon.jpg',
    titleBarStyle: 'hidden',
    frame: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // mainWindow.loadURL("https://eddb.io/")

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Hide the menu
  mainWindow.setMenu(null);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
<<<<<<< HEAD

=======
  
>>>>>>> 9a35b746d35ecd7af894495fb4160f76996823df
  // We assume that `win` points to a `BrowserWindow` instance containing a
  // `<webview>` with `disableguestresize`.

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

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
