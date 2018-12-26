// index.js
import booksJSON from '../mocks/books.js';
import frenchBibleJSON from '../mocks/french_bible.js'
const books = Object.values(booksJSON);
const booksNamesContainer = document.querySelector('#side-bar__books');
const versesContainer = document.querySelector('.verses');
const verseTitle = document.querySelector('.verse-title');

const loadBooksNames = (search = '') => {
  booksNamesContainer.innerHTML =  books.map((val, index) => {
    const i = index + 1;
    if (search) {
      if (val.en.toLowerCase().includes(search.toLocaleLowerCase())) {
        return `<li data-index="${i}" class="side-bar__book">${val.en}</li>` 
      }
    } else {
      return `<li data-index="${i}" class="side-bar__book">${val.en}</li>`
    }
  }).join(' ');

  const bookElement = document.querySelectorAll('.side-bar__book') || [];
  bookElement.forEach((val) => {
    val.addEventListener('click', (e) => {
      console.log(e, e.target.getAttribute('data-index'), 'clicked')
    })
  })
}

const loadVerses = (selectedBook = '1', selectedChapter = '1') => {
  const book = frenchBibleJSON.books[selectedBook] || frenchBibleJSON.books['1'];
  const chapters = book.chapters;
  verseTitle.innerHTML = book.book_name;
  const verses = Object.values(book.chapters[selectedChapter] || book.chapters['1']);
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


export default {
  loadBooksNames,
  loadVerses,
};
