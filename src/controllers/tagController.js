const { BrowserWindow } = require('electron');
const path = require('path');
// const BrowserWindow = electron.remote.BrowserWindow;

const showTagModel = (entry = '') => {
  let win = new BrowserWindow({
    frame: false, 
    transparent: true, 
    alwaysOnTop: true,
    width: 500,
    height: 400,
    resizable: false,
  })
  win.loadURL(`file://${__dirname}/../templates/tagModel.html?entry=${entry}`)
  win.on('close', function () { win = null })
  win.show();
}

module.exports = {
  showTagModel,
};
