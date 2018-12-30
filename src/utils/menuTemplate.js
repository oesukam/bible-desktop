const { app, Menu, shell, ipcRenderer } = require('electron');
const aboutController = require('../controllers/aboutController');
const Store = require('./store');
const store = new Store();
const lang = store.get('lang') || 'fr';
const trans = require(`../mocks/trans_${lang}`);

const menu = (window) => [
{
    label: app.getName(),
    submenu: [
      {
        label: trans.about || 'About',
        click() {
          aboutController.show();
        }
      },
      {
        label: 'Preferences',
        accelerator: 'cmd+,', // shortcut
        click () {
          // settingsController.show();
          // event sent to render.js
          window.webContents.send('open-settings')
        },
      },
    ]
  },
  {
    label: trans.edit || 'Edit',
    submenu: [
      { label: trans.copy || 'Copy', role: 'copy'  },
      { label: trans.paste || 'Paste', role:'paste'  },
    ]
  },
  {
  label: 'View',
    submenu: [
      {
        role: 'reload'
      },
      {
        role: 'toggledevtools'
      },
      {
        type: 'separator'
      },
    ]
  },
  {
    label: trans.help || 'Help',
    submenu: [
      {
        label: trans.website || 'Website',
        click() {
          shell.openExternal('https://oesukam.github.io/bible');
        }
      },
    ]
  }
]

module.exports = menu;