let index;

//DOM Element
let formBook = document.getElementById('form-book');
let sortBtn = [...document.getElementsByClassName('sort-arrow')]
trashBtn = [...document.getElementsByClassName('remove-button')];

let titleForm = document.getElementById('title');
let authorForm = document.getElementById('author');
let languageForm = document.getElementById('language');
let publishDateForm = document.getElementById('publishDate');
let numPagesForm = document.getElementById('pages');
let isReadForm = document.getElementById('read');

let fields = [titleForm, authorForm, languageForm, publishDateForm, numPagesForm];

//Click functionalities
document.getElementById('btn-form').addEventListener('click', submitForm);
document.addEventListener('click', fillForm);
sortBtn.forEach(btn => btn.addEventListener('click', sortLibrary));
trashBtn.forEach(btn => btn.addEventListener('click', getIndexToDelete));

//sortBtn.addEventListener('click', sortLibrary);

//Adds submit form functionality without refreshing page.
//Also validate inputs, creates de book and adds it to the library.
//Finally, resets form and hide the modal and updates the list.
function submitForm(event) {
  event.preventDefault();

  if (!validateForm(fields)) return false;
  
  //Edit or create new book when submit button is pressed.
  let bookForm = new Book(titleForm.value, authorForm.value, languageForm.value, publishDateForm.value, numPagesForm.value, isReadForm.checked);
  if(document.getElementById('formModalLabel').innerText == 'Edit Book'){
    editBookFromLibrary(index, bookForm);
  }else{
    bookForm = new Book(titleForm.value, authorForm.value, languageForm.value, publishDateForm.value, numPagesForm.value, isReadForm.checked);
    addBookToLibrary(bookForm);
  }
  
  //Reset form and hide modal
  formBook.reset();
  $('#formModal').modal('hide');

  //Updating books list
  showBooks();  
}


//Fill the form when edit button is clicked
function fillForm(event){
  if (event.target.classList.value.includes('edit-button')) {
    index = event.target.closest('tr').dataset.id;
    titleForm.value = library[index].title;
    authorForm.value = library[index].author;
    languageForm.value = library[index].language;
    publishDateForm.value = new Date(library[index].publishDate).toISOString().substr(0,10);
    numPagesForm.value = library[index].numPages;
    isReadForm.checked = library[index].isRead;

    document.getElementById('formModalLabel').innerText = 'Edit Book';
  }
}

//Validates all fields from form when submit.
function validateForm(fieldsForm) {
  let flag = true;
  fieldsForm.forEach(field => {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');

    if (field.value === '' ||
        field.id === 'pages' && field.value < 1 ||
        field.id === 'publishDate' && field.value === '' || new Date(field.value).getFullYear().toString().length > 4 ||
        (field.id === 'author' || field.id === 'language') && /[^A-Za-zÀ-ú -.]/.test(field.value)) {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      flag = false;
    }
  });
  return flag;
}

//Clean form when cancel button is pressed
$('#formModal').on('hidden.bs.modal', function () {
  $(this).find('form').trigger('reset');
  Array.from(document.getElementsByClassName('is-valid')).forEach((el) => el.classList.remove('is-valid'));
  Array.from(document.getElementsByClassName('is-invalid')).forEach((el) => el.classList.remove('is-invalid'));
  document.getElementById('formModalLabel').innerText = 'New Book';
});