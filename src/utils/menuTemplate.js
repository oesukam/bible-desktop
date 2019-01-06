const { app, Menu, shell, ipcRenderer } = require('electron');
const aboutController = require('../controllers/aboutController');
const Store = require('./store');
const store = new Store();
const lang = store.get('lang') || 'fr';
const trans = require(`../mocks/trans_${lang}`);

const menu = (window) => {
  const appMenu = [
    {
      label: trans.edit || 'Edit',
      submenu: [
        { label: trans.copy || 'Copy', role: 'copy'  },
        { label: trans.paste || 'Paste', role:'paste'  },
      ]
    },
    {
      label: trans.help || 'Help',
      submenu: [
        {
          label: trans.website || 'Website',
          click() {
            shell.openExternal('https://oesukam.github.io/bible-desktop');
          }
        },
      ]
    }
  ];
  // Check if the app runs on MacOS
  if (process.platform === 'darwin') {
    appMenu.unshift({
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
            // event sent to render.js
            window.webContents.send('open-settings')
          },
        },
      ]
    })
  };

  if (process.env.NODE_ENV === 'dev') {
    appMenu.push({
      label: 'Dev',
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
    });
  }
  return appMenu;
}

module.exports = menu;