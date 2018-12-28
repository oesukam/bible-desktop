// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const bookController = require('./src/controllers/bookController.js');

bookController.loadBooks();
bookController.loadVerses({ loadChapters: true });

