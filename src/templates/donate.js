const { remote } = require('electron')
const donateText = document.querySelector('.donate-text');
const Store = require('../utils/store');
const store = new Store();
const lang = store.get('lang') || 'fr';
const trans = require(`../mocks/trans_${lang}`);

const { app } = remote

donateText.innerHTML = trans.donate;

const ipcRenderer = require('electron').ipcRenderer;
