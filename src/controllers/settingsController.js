const { BrowserWindow } = require('electron');
const path = require('path');
// const BrowserWindow = electron.remote.BrowserWindow;

const show = (entry = '') => {
  let win = new BrowserWindow({
    frame: false, 
    transparent: true, 
    alwaysOnTop: true,
    width: 400,
    height: 370,
    resizable: false,
  })
  win.loadURL(`file://${__dirname}/../templates/settings.html?entry=${entry}`)
  win.on('close', function () { win = null })
  win.webContents.send('store-data', 'helo');
  win.show();
}

module.exports = {
  show,
};
