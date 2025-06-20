document.addEventListener('DOMContentLoaded', () => {
  // Handle borrow/return button
  document.querySelectorAll('.book form[action$="borrow/"]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const bookId = formData.get('book_id');
      const button = form.querySelector('button');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
          },
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          if (data.action === 'borrowed') {
            button.textContent = 'Borrowed';
            button.className = 'disabled-borrow';
          } else {
            button.textContent = 'Borrow Book';
            button.className = 'borrow';
          }
        }
      } catch (error) {
        console.error('Borrow error:', error);
      }
    });
  });

  // Handle favorite toggle
  document.querySelectorAll('.fav-form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const bookId = formData.get('book_id');
      const button = form.querySelector('.fav-button');
      const img = button.querySelector('img');
      const isAdding = form.action.includes('favorite/add');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
          },
          body: formData,
        });

        const data = await response.json();

        if (data.status === 'added') {
          form.action = form.action.replace('favorite/add', 'favorite/remove');
          img.src = '/static/Imgs/Style=bold.png';
        } else if (data.status === 'removed') {
          form.action = form.action.replace('favorite/remove', 'favorite/add');
          img.src = '/static/Imgs/Style=linear.png';
        }
      } catch (error) {
        console.error('Favorite error:', error);
      }
    });
  });
});
