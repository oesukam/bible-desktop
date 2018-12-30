const { remote } = require('electron')
const appContainer = document.querySelector('.app');
const appName = document.querySelector('.app-name');
const appVersion = document.querySelector('.app-version');
const appCopyright = document.querySelector('.app-copyright');
const appThanks = document.querySelector('.app-thanks');
const Store = require('../utils/store');
const store = new Store();
const lang = store.get('lang') || 'fr';
const trans = require(`../mocks/trans_${lang}`);

const { app } = remote
appName.innerHTML = app.getName();
appVersion.innerHTML = `Version: ${app.getVersion()}`;
appCopyright.innerHTML = 'Copyright @ 2018, Olivier Esuka';
appThanks.innerHTML = trans.thanks;

appContainer.addEventListener('click', function (event) {
  setTimeout(() => {
    var window = remote.getCurrentWindow();
    window.close();
  }, 500);
});