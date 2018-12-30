// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain } = require('electron');
const menuTemplate = require('./src/utils/menuTemplate');
const Store = require('./src/utils/store');

const windowBounds = {
  minWidth: 800,
  minHeight: 600,
  transparent: true,
  titleBarStyle: 'hidden'
};

let store = new Store();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // initialize the store
  let lang = store.get('lang');
  console.log('lang', lang)
  if (!lang) {
    lang = app.getLocale();
    lang = lang.replace(/-\S+/g, '');
    console.log(lang)
    if (lang === 'en') {
      lang = 'en'
      store.set('lang', 'en');
      store.set('bible', 'english_bible');
    } else {
      lang = 'fr'
      store.set('lang', 'fr');
      store.set('bible', 'french_bible');
    }
    store.set('book', '1');
    store.set('chapter', '1');

    store = new Store({
      configName: 'user-preferences',
      defaults: {
        lang,
        windowBounds,
        saved: {}
      }
    });
  }
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    ...windowBounds,
    ...store.get('windowBounds'),
  });

  function saveWindowBounds() {
    store.set('windowBounds', {
      ...windowBounds,
      ...mainWindow.getBounds()
    });
  }

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  const menu = Menu.buildFromTemplate(menuTemplate(mainWindow))
  Menu.setApplicationMenu(menu)
  // mainWindow.on('ready-to-show', () => {
  //   mainWindow.show();
  // });

  // listen to `resize` and `move` and save the settings
  mainWindow.on('resize', saveWindowBounds);
  mainWindow.on('move', saveWindowBounds);

  

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

ipcMain.on('close-model', (event, arg) => {
  // Event sent to render.js
  mainWindow.webContents.send('close-settings')
});

ipcMain.on("app-quit-and-install", (event, arg) => {
  autoUpdater.quitAndInstall();
})

ipcMain.on("app-reload", (event, arg) => {
  mainWindow.reload();
});
