const { remote } = require('electron')
const appContainer = document.querySelector('.app');
const appName = document.querySelector('.app-name');
const appVersion = document.querySelector('.app-version');
const appCopyright = document.querySelector('.app-copyright');
const appThanks = document.querySelector('.app-thanks');

const { app } = remote
appName.innerHTML = app.getName();
appVersion.innerHTML = `Version: ${app.getVersion()}`;
appCopyright.innerHTML = `Copyright @ ${new Date().getFullYear()}, Olivier Esuka`;
appThanks.innerHTML = '<strong>Thanks:</strong> Prophete Didier HEREDI, Mervelle KAZADI';

appContainer.addEventListener('click', function (event) {
  setTimeout(() => {
    var window = remote.getCurrentWindow();
    window.close();
  }, 500);
});