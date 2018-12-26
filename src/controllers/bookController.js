// index.js
const booksJSON = require('../mocks/books');
const frenchBibleJSON = require('../mocks/french_bible');
const books = Object.values(booksJSON);
const booksNamesContainer = document.querySelector('#side-bar__books');
const chaptersContainer = document.querySelector('#side-chapters>.chapters')
const versesContainer = document.querySelector('.verses');
const verseTitle = document.querySelector('.verse-title');

let selected = {
  book: "1",
  chapter: ""
};

const loadBooks = (search = '') => {
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
      const bookSelected = e.target.getAttribute('data-index') || '1';
      selected.book = bookSelected;
      loadVerses({ bookSelected });
    })
  });
}

const loadVerses = ({ bookSelected = '1', chapterSelected = '1', loadChapters = false } = {}) => {
  const book = frenchBibleJSON.books[bookSelected] || frenchBibleJSON.books['1'];
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
