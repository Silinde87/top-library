//DOM Element
let formBook = document.getElementById('form-book');

//Click functionalities
document.getElementById('btn-form').addEventListener('click', submitForm);

//Adds submit form functionality without refreshing page.
//Also validate inputs, creates de book and adds it to the library.
//Finally, resets form and hide the modal and updates the list.
function submitForm(event) {
  event.preventDefault();

  let titleForm = document.getElementById('title');
  let authorForm = document.getElementById('author');
  let languageForm = document.getElementById('language');
  let publishDateForm = document.getElementById('publishDate');
  let numPagesForm = document.getElementById('pages');
  let isReadForm = document.getElementById('readed');

  let fields = [titleForm, authorForm, languageForm, publishDateForm, numPagesForm];

  if (!validateForm(fields)) return false;

  let bookForm = new Book(titleForm.value, authorForm.value, languageForm.value, new Date(publishDateForm.value), numPagesForm.value, isReadForm.checked);
  addBookToLibrary(bookForm);

  formBook.reset();
  $('#formModal').modal('hide');

  showBooks();
  Array.from(document.getElementsByClassName('is-valid')).forEach((el) => el.classList.remove('is-valid'));
}

//Validates all fields from form when submit.
function validateForm(fieldsForm) {
  let flag = true;
  fieldsForm.forEach(field => {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');

    if (field.value === '' ||
        field.id === 'pages' && field.value < 1 ||
        field.id === 'publishDate' && isNaN(new Date(field.value).getTime()) || new Date(field.value).getFullYear().toString().length > 4 ||
        (field.id === 'author' || field.id === 'language') && /[^A-Za-zÀ-ú -]/.test(field.value)) {
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
});