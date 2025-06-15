function addBook() {
  document.getElementById('add-book-popup').style.display = 'block';
  document.body.classList.add('no-scroll');
}

function closeAddBookPopup() {
  document.getElementById('add-book-popup').style.display = 'none';
  document.body.classList.remove('no-scroll');
}

function deleteBook(button) {
  const bookElement = button.closest('.book');
  const bookId = bookElement.getAttribute('data-id');
  const form = document.getElementById(`delete-form-${bookId}`);
  form.submit(); // Submit the form to delete the book
}

function editBook(button) {
  const bookCard = button.closest('.book');

  const bookId = bookCard.getAttribute('data-id');
  const title = bookCard.querySelector('h2').innerText;
  const author = bookCard.querySelector('.auther').innerText;
  const description = bookCard.querySelector('.description').innerText;

  // Fill the popup form
  document.getElementById('edit-book-id').value = bookId;
  document.getElementById('edit-title').value = title;
  document.getElementById('edit-author').value = author;
  document.getElementById('edit-description').value = description;

  document.getElementById('edit-cover-url').value = '';

  document.getElementById('edit-popup').style.display = 'block';
  document.body.classList.add('no-scroll');
}

function closePopup() {
  document.getElementById('edit-popup').style.display = 'none';
  document.body.classList.remove('no-scroll');
}
