import { app, BrowserWindow } from 'electron'
import path from 'path'
import { execSync, spawn } from 'child_process'
import { platform } from 'os'
import EasyWorker from '@vandeurenglenn/easy-worker'

const host = platform()
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (host === 'win32') {
  if (require('electron-squirrel-startup')) { app.quit() }
}

let chainWorker
let mainWindow
let chainReady

import('inquirer').then((importee) => importee.default.prompt([{
  type: 'password',
  name: 'password',
  required: true
}]).then(async ({password}) => {
  chainWorker = await new EasyWorker('./chain.mjs')

  chainWorker.onmessage(message => {
    console.log(message);
  })

  chainWorker.postMessage({password})
}))



// chainWorker.on('data', data => {
//   if (data.toString().includes('listening on 4040')) {
//     chainReady = true
//     mainWindow.webContents.send('chain:ready', true)
//   }
//   else console.log(data.toString());
// })

const handleSquirrelEvent = () => {
  if (process.argv.length === 1) {
    return false;
  }

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
}
if (handleSquirrelEvent()) {} else {

  const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1366,
      height: 768,
      webPreferences: {
        nodeIntegration: true,
        // nodeIntegrationInWorker: true
        preload: path.join(__dirname, 'preload.js')
      }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools.
    mainWindow.webContents.on('did-finish-load', () => {
      if (chainReady) mainWindow.webContents.send('chain:ready', true)
    })
    mainWindow.webContents.openDevTools();
  };

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
