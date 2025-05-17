document
  .querySelectorAll('button.borrow, button.disabled-borrow')
  .forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      if (button.classList.contains('disabled-borrow')) {
        // Already borrowed, maybe ignore click or alert
        return;
      }

      const bookId = button.getAttribute('data-index');

      fetch('/books/borrow/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': getCookie('csrftoken'), // csrf helper below
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: `book_id=${bookId}`,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            if (data.action === 'borrowed') {
              button.classList.remove('borrow');
              button.classList.add('disabled-borrow');
              button.textContent = 'Borrowed';
            } else if (data.action === 'returned') {
              button.classList.remove('disabled-borrow');
              button.classList.add('borrow');
              button.textContent = 'Borrow Book';
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Action failed. Please try again.');
        });
    });
  });

// Helper function to get CSRF token cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
