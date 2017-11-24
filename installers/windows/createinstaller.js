const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Elite Dangerous Websites Companion-win32-ia32/'),
    authors: 'Loïc Herman',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'Elite Dangerous Websites Companion.exe',
    setupExe: 'edwc.setup.exe',
    setupIcon: path.join(rootPath, 'src', 'images', 'favicon.ico')
  })
}
