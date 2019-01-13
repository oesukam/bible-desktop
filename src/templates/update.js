const { remote } = require('electron')
const appContainer = document.querySelector('.app');
const appName = document.querySelector('.app-name');
const updateBtn = document.querySelector('.update');
const updateText = document.querySelector('.update-text');
const cancelBtn = document.querySelector('.cancel');
const Store = require('../utils/store');
const store = new Store();
const lang = store.get('lang') || 'fr';
const trans = require(`../mocks/trans_${lang}`);

const { app } = remote
appName.innerHTML = app.getName();
updateText.innerHTML = trans.updateText;
updateBtn.innerHTML = trans.yes;
cancelBtn.innerHTML = trans.no;

const ipcRenderer = require('electron').ipcRenderer;

updateBtn.addEventListener('click', (event) => {
  ipcRenderer.send('quit-and-install')
  setTimeout(() => {
    const window = remote.getCurrentWindow();
    window.close();
  }, 100);
});

cancelBtn.addEventListener('click', (event) => {
  const window = remote.getCurrentWindow();
  window.close();
});