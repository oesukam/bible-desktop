const { app, Menu, shell } = require('electron');
const settingsController = require('../controllers/settingsController');
const aboutController = require('../controllers/aboutController');
const menu = [
{
    label: app.getName(),
    submenu: [
      {
        label: 'Preferences',
        accelerator: 'cmd+,', // shortcut
        click () {
          settingsController.show();
        },
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Copy', role: 'copy'  },
      { label: 'Paste', role:'paste'  },
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
    label: 'Help',
    submenu: [
      {
        label: 'Website',
        click() {
          shell.openExternal('https://oesukam.github.io/bible');
        }
      },
      {
        label: 'About',
        click() {
          aboutController.show();
        }
      },
    ]
  }
]

module.exports = menu;