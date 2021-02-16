//Storage for the books
let library = [];
let booksCount;
let readCount;
let notReadCount;
let tableBooks = document.getElementById('table-books');

//Constructor
function Book(title, author, language, publishDate, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.language = language;
  this.publishDate = publishDate;
  this.numPages = numPages;
  this.isRead = isRead;
  this.info = () => {
    let readOutput = isRead ? 'readed' : 'not readed yet'
    return `${this.title} by ${this.author}, ${this.numPages} pages, writed in ${this.language} at ${this.publishDate.toLocaleDateString()}, ${readOutput}`
  }
}

//Takes a book as a parameter and change swap isRead value
Book.prototype.changeReadStatus = function () {
  this.isRead = !this.isRead;
}

//Takes a book as a parameter and adds it to the library array
function addBookToLibrary(book) {
  library.push(book);
}

//Removes a book from the library
function removeBookFromLibrary(index) {
  library.splice(index, 1);
}

//Function that loops through the array and display each book on page
function showBooks() {
  //Cleaning the table before start adding data
  document.getElementById('table-books').innerHTML = ''

  //Iterating over array library
  let i = 0;
  library.forEach(book => {
    let fileElement = document.createElement('tr');
    //Setting a data-attribute to each file. Same as array index.
    fileElement.dataset.id = i++;

    //Iterating over book object properties
    for (const property in book) {
      let cellElement = document.createElement('td');

      if (property == 'publishDate') {
        cellElement.innerHTML = book[property].toLocaleDateString();
      } else {
        cellElement.innerHTML = book[property];
      }
      //Exit condition. Not showing function properties from book
      if (property == 'info' || property == 'changeReadStatus') continue;
      fileElement.appendChild(cellElement);
    }
    document.getElementById('table-books').appendChild(fileElement);
  });
}

//Update books counters
function countBooks() {
  booksCount = library.length;
  readCount = library.filter(book => book.isRead).length;
  notReadCount = library.filter(book => !book.isRead).length;
}
//Shows the updated counters book at DOM.
function updateDisplayCountBooks() {
  countBooks();
  document.getElementById('books-count').innerHTML = booksCount;
  document.getElementById('read-count').innerHTML = readCount;
  document.getElementById('not-read-count').innerHTML = notReadCount;
}



//Adding some dummy data
let book1 = new Book(
  'Eloquent Javascript, 3rd Edition: A Modern Introduction to Programming',
  'Marijn Haverbeke', 'Spanish', new Date('1954-1-14'), 187, true);
let book2 = new Book(
  'Think Like a Programmer: An Introduction to Creative Problem Solving',
  'V. Anton Spraul ', 'English', new Date('2009-3-3'), 293, false);
let book3 = new Book(
  'The Principles of Object-Oriented JavaScript',
  'Nicholas C. Zakas', 'German', new Date('2020-1-23'), 89, true);
let book4 = new Book(
  'Clean Code: A Handbook of Agile Software Craftsmanship',
  'Robert C. Martin', 'Spanish', new Date('2015-3-10'), 165, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

//Some tests
updateDisplayCountBooks();
showBooks();
removeBookFromLibrary(0);
showBooks();