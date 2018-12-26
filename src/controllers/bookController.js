// index.js
const Store = require('../utils/store');
const booksJSON = require('../mocks/books');
const englishBibleJSON = require('../mocks/english_bible');
const frenchBibleJSON = require('../mocks/french_bible');
const lingalaBibleJSON = require('../mocks/lingala_bible');
const swahiliBibleJSON = require('../mocks/swahili_bible');
const books = Object.values(booksJSON);
const booksNamesContainer = document.querySelector('#side-bar__books');
const chaptersContainer = document.querySelector('#side-chapters>.chapters')
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
  booksNamesContainer.innerHTML =  books.map((val, index) => {
    const i = index + 1;
    if (keywords) {
      if (val.en.toLowerCase().includes(keywords.toLocaleLowerCase())) {
        return `<li data-index="${i}" class="side-bar__book">${val.en}</li>` 
      }
    } else {
      return `<li data-index="${i}" class="side-bar__book">${val.en}</li>`
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
  
    const chapterElement = document.querySelectorAll('.chapters>.chapter') || [];
    chapterElement.forEach((val) => {
      val.addEventListener('click', (e) => {
        const selected = e.target.getAttribute('data-index') || '1';
        store.set('chapter', selected);
        loadVerses({ chapterSelected: selected })
      });
    });
  }

  versesContainer.innerHTML =  verses.map((val, index) => {
    const i = index + 1;
    return `<li data-index="${i}" class="verse">${i}. ${val}</li>`
  }).join(' ');

  // const verseElement = document.querySelectorAll('.verse') || [];
  // verseElement.forEach((val) => {
  //   val.addEventListener('click', (e) => {
  //     console.log(e, e.target.getAttribute('data-index'), 'clicked')
  //   })
  // })
}


module.exports = {
  loadBooks,
  loadVerses,
};
