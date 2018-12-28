const electron = require('electron')
const remote = electron.remote
const headerTitle = document.querySelector('.header-title');
const cancelBtn = document.querySelector('.btn-cancel');
const saveBtn = document.querySelector('.btn-save');
const inputTag = document.querySelector('.tags-input');
const tagsList = document.querySelector('.tags');
const Store = require('../utils/store');
const books = require('../mocks/books');

const store = new Store();

const param = window.location.href.match(/\d+-\d+-\d+/g, '');
let entry = param ? param[0] || '': '';
let favorites = store.get('favorites');
let input = '';
let tags = favorites[entry] ? favorites[entry].tags || [] : [];
const lang = store.get('lang') || 'fr';
const refs = entry.split('-');
const bookName = books[refs[0]] ? books[refs[0]][lang] : 'Tags'
headerTitle.innerHTML = `${bookName} ${refs[1]} : ${refs[2]}`;

cancelBtn.addEventListener('click', function (event) {
  var window = remote.getCurrentWindow();
  window.close();
});

saveBtn.addEventListener('click', function (event) {
  var window = remote.getCurrentWindow();
  favorites = store.get('favorites');
  if (!favorites[entry]) {
    favorites[entry] = { tags: [] }
  }
  favorites[entry].tags = tags;
  store.set('favorites', favorites);
  window.close();
});

inputTag.addEventListener('keyup', (e) => {
  const { value } = e.target;
  if (e.keyCode === 13 && value && tags.length < 5) {
    if (tags.indexOf(value.trim()) === -1) {
      tags.push(value.trim());
      renderTags(tags);
      e.target.value = '';
    }
  } else if (e.keyCode === 8 && value === '' && tags.length > 0) {
    tags.pop();
    renderTags(tags);
  } else {
    input += value;
  }
});

const renderTags = (tagsArray = []) => {
  tagsList.innerHTML = tagsArray.map((tag, index) => {
    return `
      <li class="tag" onclick="tagClicked(${index})">
        ${tag} 
        <span 
          class="close-tag fa fa-times"
          data-index="${index}"
          onclick="removeTag(${index})">
        </span>
      </li>
    `
  }).join(' ');
}

window.removeTag = function (index) {
  tags.splice(index, 1);
  renderTags(tags);
}

window.tagClicked = function (index) {
  if (window.event.target.nodeName !== 'SPAN') {
    inputTag.focus()
  }
}


renderTags(tags);