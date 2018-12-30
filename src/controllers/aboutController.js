const { BrowserWindow } = require('electron');
const path = require('path');
const Store = require('../utils/store');
const store = new Store();
const lang = store.get('lang') || 'fr';
const trans = require(`../mocks/trans_${lang}`);

const show = () => {
  let win = new BrowserWindow({
    // frame: false,
    // transparent: true, 
    alwaysOnTop: true,
    width: 500,
    height: 400,
    resizable: false,
    show: false,
    minimizable: false,
    maximizable: false,
    title: trans.about || 'A Propos'
  })
  win.loadURL(`file://${__dirname}/../templates/about.html`)
  win.on('close', function () { win = null });
  win.show();
}

module.exports = {
  show,
};
