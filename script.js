//Storage for books and counters
let library = [];
let booksCount = 0;
let readCount = 0;
let notReadCount = 0;

//DOM Elements
let tableBooks = document.getElementById('table-books');

//Constructor
function Book(title, author, language, publishDate, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.language = language;
  this.publishDate = publishDate;
  this.numPages = numPages;
  this.isRead = isRead;
}

//PROTOTYPE: Takes a book as a parameter and change swap isRead value
Book.prototype.changeReadStatus = function () {
  this.isRead = !this.isRead;
}

//Adds Click functionality to certain buttons.
document.addEventListener('click', changeIsReadColor);
document.addEventListener('click', removeBookFromLibrary);

//Takes a book as a parameter and adds it to the library array
function addBookToLibrary(book) {
  library.push(book);
}

//Removes a book from the library
function removeBookFromLibrary(e) {
  if (e.target.classList.value.includes('remove-button')) {
    let index = e.target.closest('tr').dataset.id
    library.splice(index, 1);
    showBooks();
  }
}

function editBookFromLibrary(index, book){
  library.splice(index, 1, book);
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

      if(book.hasOwnProperty(property)){
        switch (property) {
          case 'publishDate':
            cellElement.innerHTML = book[property].toLocaleDateString();
            break;
          case 'isRead':
            let round = document.createElement('div');
            round.setAttribute('id', 'is-readed');
            showIsReadColor(round, book[property]);
            cellElement.appendChild(round);
            break;          
          default:
            cellElement.innerHTML = book[property];
        }
      }else continue;
      fileElement.appendChild(cellElement);
    }
    //Appending edit and delete button to each row
    fileElement.insertAdjacentHTML(
      'beforeend', 
      '<i class="far fa-edit edit-button" data-toggle="modal" data-target="#formModal"></i>');
    fileElement.insertAdjacentHTML('beforeend', '<i class="far fa-trash-alt remove-button"></i>')

    document.getElementById('table-books').appendChild(fileElement);
  });
  updateDisplayCountBooks();
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

//Call change read status and swap color button at DOM
function changeIsReadColor(e) {
  if (e.target.id == 'is-readed') {
    let indexToChange = e.target.closest('tr').dataset.id;
    library[indexToChange].changeReadStatus();
    let domElem = e.target;
    let isBookRead = library[indexToChange].isRead;
    showIsReadColor(domElem, isBookRead);    
  } else return;
}

//Changes color when called.
function showIsReadColor(elem, isRead) {
  elem.classList = ''
  isRead ? elem.classList.add('readed') : elem.classList.add('not-readed');
  updateDisplayCountBooks()
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
showBooks();