// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer, remote } = require('electron'); 
const bookController = require('./src/controllers/bookController');
const electron = require('electron');
const headerTitle = document.querySelector('.header-title');
const langSelection = document.querySelector('#language');
const bibleSelection = document.querySelector('#bible');
const cancelBtn = document.querySelector('.btn-cancel');
const saveBtn = document.querySelector('.btn-save');
const Store = require('./src/utils/store');
const store = new Store();
const lang = store.get('lang') || 'fr';
const trans = require(`./src/mocks/trans_${lang}`);

const settingsModel = document.querySelector('.settings-model');
const closeModel = document.querySelector('.close-model');

const settings = {
  lang: store.get('lang') || 'fr',
  bible: store.get('bible') || 'french_bible',
}
headerTitle.innerHTML = trans.settings;
cancelBtn.innerHTML = trans.cancel;
saveBtn.innerHTML = trans.save;
langSelection.value = settings.lang;
bibleSelection.value = settings.bible;

bookController.loadBooks();
bookController.loadVerses({ loadChapters: true });

ipcRenderer.on('open-settings', (event , data) => { // when saved show notification on screen
  settingsModel.classList.add('open');
});

ipcRenderer.on('close-settings', (event , data) => { // when saved show notification on screen
  settingsModel.classList.remove('open');
});

closeModel.addEventListener('click', () => {
  ipcRenderer.send('close-model'); 
})


/* Settings model */

langSelection.addEventListener('change', (e) => {
  settings.lang = e.target.value;
});

bibleSelection.addEventListener('change', (e) => {
  settings.bible = e.target.value;
});

cancelBtn.addEventListener('click', function (event) {
  ipcRenderer.send('close-model');
});

saveBtn.addEventListener('click', function (event) {
  store.set('lang', settings.lang);
  store.set('bible', settings.bible);
  bookController.loadBooks();
  bookController.loadVerses({ loadChapters: true });
  setTimeout(() => {
    ipcRenderer.send('close-model');
  }, 500);
});
