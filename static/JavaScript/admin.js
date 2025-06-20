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
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  fetch(`${deleteBookBaseURL}${bookId}/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken,
      'X-Requested-With': 'XMLHttpRequest',
    },
  }).then((response) => {
    if (response.ok) {
      bookElement.remove();
    } else {
      alert('Failed to delete book.');
    }
  });
}

function editBook(button) {
  const bookCard = button.closest('.book');

  const bookId = bookCard.getAttribute('data-id');
  const title = bookCard.querySelector('h2').innerText;
  const author = bookCard.querySelector('.auther').innerText;
  const description = bookCard.querySelector('.description').innerText;

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

document
  .getElementById('add-book-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const csrfToken = document.querySelector(
      '[name=csrfmiddlewaretoken]'
    ).value;

    fetch(addBookURL, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const bookHTML = `
        <div class="book" data-id="${data.id}">
          <img src="${data.cover_url}" class="book-cover" />
          <div class="book-side">
            <div class="title">
              <h2>${data.title}</h2>
              <button class="edit-book" onclick="editBook(this)">
                <img src="/static/Imgs/editing.png" class="edit-icon" />
              </button>
            </div>
            <h4 class="auther">${data.author}</h4>
            <p class="description">${data.description}</p>
            <div class="id"><p>ID: ${data.id}</p></div>
            <form method="post" action="/delete-book/${data.id}/" id="delete-form-${data.id}">
              <input type="hidden" name="csrfmiddlewaretoken" value="${csrfToken}" />
              <button type="submit" class="remove" onclick="event.preventDefault(); deleteBook(this)">Delete Book</button>
            </form>
          </div>
        </div>`;
        document
          .querySelector('.books-container')
          .insertAdjacentHTML('beforeend', bookHTML);

        closeAddBookPopup();
        form.reset();
      });
  });



document.getElementById('edit-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  fetch(editBookURL, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken,
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const bookElement = document.querySelector(`.book[data-id="${data.id}"]`);
      if (!bookElement) return;

      bookElement.querySelector('h2').innerText = data.title;
      bookElement.querySelector('.auther').innerText = data.author;
      bookElement.querySelector('.description').innerText = data.description;
      const coverImg = bookElement.querySelector('.book-cover');
      coverImg.src = data.cover_url;

      closePopup();
    });
});
