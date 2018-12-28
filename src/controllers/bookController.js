// index.js
const Store = require('../utils/store');
const booksJSON = require('../mocks/books');
const englishBibleJSON = require('../mocks/english_bible');
const frenchBibleJSON = require('../mocks/french_bible');
const lingalaBibleJSON = require('../mocks/lingala_bible');
const swahiliBibleJSON = require('../mocks/swahili_bible');
const formatDate = require('../utils/formatDate').getFormattedDate;
const { showTagModel } = require('./tagController');
const books = Object.values(booksJSON);
const booksNamesContainer = document.querySelector('#side-bar__books');
const chaptersContainer = document.querySelector('.side-chapters__list')
const versesContainer = document.querySelector('.verses');
const verseTitle = document.querySelector('.verse-title');
const searchBook = document.querySelector('#search-books > .search-input');

store = new Store();
const bibleMap = {
  en: englishBibleJSON,
  fr: frenchBibleJSON,
  li: lingalaBibleJSON,
  sw: swahiliBibleJSON,
}
let keywords = '';

searchBook.addEventListener('input', (e) => {
  const { value } = e.target;
  loadBooks(value);
})
const loadBooks = (search = '') => {
  keywords = search;
  const lang = store.get('lang') || 'fr';
  booksNamesContainer.innerHTML =  books.map((val, index) => {
    const i = index + 1;
    if (keywords) {
      if (val.en.toLowerCase().includes(keywords.toLocaleLowerCase())) {
        return `<li data-index="${i}" class="side-bar__book">${val[lang] || val.fr}</li>` 
      }
    } else {
      return `<li data-index="${i}" class="side-bar__book">${val[lang] || val.fr}</li>`
    }
  }).join(' ');

  const bookElement = document.querySelectorAll('.side-bar__book') || [];
  bookElement.forEach((val) => {
    val.addEventListener('click', (e) => {
      const bookSelected = e.target.getAttribute('data-index') || '1';
      store.set('book', bookSelected);
      store.set('chapter', '1');
      loadVerses({ bookSelected, loadChapters: true });
    })
  });
}

const loadVerses = ({
  bookSelected = store.get('book'),
  chapterSelected = store.get('chapter'),
  loadChapters = false
} = {}) => {
  const bible = bibleMap[store.get('bible') || 'fr'];
  const book = bible.books[bookSelected] || bible.books['1'];
  const chapters = Object.keys(book.chapters) || [];
  verseTitle.innerHTML = `${book.book_name} ${chapterSelected}`;
  const verses = Object.values(book.chapters[chapterSelected] || book.chapters['1']);
  if (loadChapters) {
    chaptersContainer.innerHTML =  chapters.map((val, index) => {
      const i = index + 1;
      return `<li data-index="${i}" class="chapter">${val}</li>`
    }).join(' ');
  
    const chapterElement = document.querySelectorAll('.side-chapters__list > .chapter') || [];
    chapterElement.forEach((val) => {
      val.addEventListener('click', (e) => {
        const selected = e.target.getAttribute('data-index') || '1';
        store.set('chapter', selected);
        loadVerses({ chapterSelected: selected })
      });
    });
  }
  favorites = store.get('favorites') || {};

  versesContainer.innerHTML = verses.map((val, index) => {
    const i = index + 1;
    const book = store.get('book');
    const chapter = store.get('chapter');
    const verse = i;
    const entry = `${book}-${chapter}-${verse}`;
    return `
      <li data-index="${i}" class="verse">
        ${i}. ${val}
        <button
          class="verse-favorite fa fa-star${favorites[entry]? ' active': ''}"
          data-index="${i}"
          data-entry="${entry}"
        ></button>
        <button
          class="verse-tag fa fa-tags"
          data-index="${i}"
          onclick="verseTagClicked('${entry}')"
        ></button>
     </li>
    `
  }).join(' ');

  const verseFavorites = document.querySelectorAll('.verse-favorite') || [];
  verseFavorites.forEach((val) => {
    val.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-entry');
      favorites = store.get('favorites') || {};
      if (e.target.classList.contains('active')) {
        if (favorites[index]) {
          delete favorites[index];
          store.set('favorites', favorites);
        }
        e.target.classList.remove('active');
         
      } else {
        favorites[index] = { tags: [], date: formatDate(new Date()) };
        store.set('favorites', favorites);
        showTagModel(index);
        e.target.classList.add('active');
      }
    })
  })
}

window.verseTagClicked = function (entry) {
  showTagModel(entry);
}


module.exports = {
  loadBooks,
  loadVerses,
};
