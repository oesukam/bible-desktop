const { BrowserWindow } = require('electron');
const path = require('path');
// const BrowserWindow = electron.remote.BrowserWindow;

const show = () => {
  let win = new BrowserWindow({
    frame: false, 
    transparent: true, 
    alwaysOnTop: true,
    width: 500,
    height: 400,
    resizable: false,
  })
  win.loadURL(`file://${__dirname}/../templates/about.html`)
  win.on('close', function () { win = null })
  win.show();
}

module.exports = {
  show,
};
