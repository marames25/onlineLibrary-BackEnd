// let currentBook = null;

// function isBookInStorage(key) {
//   const storage = JSON.parse(localStorage.getItem(key)) || [];
//   return storage.some((b) => b && b.id === currentBook.id);
// }

// function updateStorage(key, add) {
//   let storage = JSON.parse(localStorage.getItem(key)) || [];
//   if (add) {
//     storage.push(currentBook);
//   } else {
//     storage = storage.filter((b) => b && b.id !== currentBook.id);
//   }
//   localStorage.setItem(key, JSON.stringify(storage));
// }

// function handleClick(
//   key,
//   button,
//   addedText,
//   defaultText,
//   bookElement,
//   countLabel,
//   container
// ) {
//   if (!currentBook) return;

//   const alreadyAdded = isBookInStorage(key);

//   if (alreadyAdded) {
//     const confirmRemove = confirm(
//       `This book is already ${addedText.toLowerCase()}. Do you want to remove it?`
//     );
//     if (confirmRemove) {
//       updateStorage(key, false);
//       bookElement.remove();
//       const updatedStorage = JSON.parse(localStorage.getItem(key)) || [];
//       countLabel.textContent = `(${updatedStorage.length})`;

//       if (updatedStorage.length === 0) {
//         container.innerHTML = `<p>No borrowed books yet.</p>`;
//       }
//     }
//   } else {
//     updateStorage(key, true);
//     button.textContent = addedText;

//     const updatedStorage = JSON.parse(localStorage.getItem(key)) || [];
//     countLabel.textContent = `(${updatedStorage.length})`;
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const username = localStorage.getItem('username');
//   if (username) {
//     const usernameElement = document.getElementById('profile-username');
//     if (usernameElement) {
//       usernameElement.textContent = username;
//     }
//   }

//   const container = document.getElementById('books-container');
//   const countLabel = document.getElementById('borrowed-count');

//   const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
//   countLabel.textContent = `(${borrowedBooks.length})`;

//   if (borrowedBooks.length === 0) {
//     container.innerHTML = `<p>No borrowed books yet.</p>`;
//     return;
//   }

//   container.innerHTML = '';
//   borrowedBooks.forEach((book) => {
//     const bookHTML = `
//       <div class="book" data-id="${book.id}">
//         <img src="${book.cover}" class="book-cover" />
//         <div class="book-side">
//           <div class="title">
//             <h2>${book.title}</h2>
//             <button>
//               <img src="Imgs/Style=linear.png" class="star-icon" />
//             </button>
//           </div>
//           <h4 class="author">${book.author}</h4>
//           <p class="description">${book.description}</p>
//           <div class="id"><p>ID: ${book.id}</p></div>
//           <div class="btns">
//             <button class="View-details" onclick="detailsBook(this)">View Details</button>
//             <button class="borrowed-btn">Borrowed</button>
//           </div>
//         </div>
//       </div>
//     `;

//     container.insertAdjacentHTML('beforeend', bookHTML);

//     const lastBook = container.lastElementChild;
//     const starIcon = lastBook.querySelector('.star-icon');
//     const borrowBtn = lastBook.querySelector('.borrowed-btn');
//     const bookId = book.id;

//     borrowBtn.addEventListener('click', () => {
//       currentBook = book;
//       handleClick(
//         'borrowed',
//         borrowBtn,
//         'Borrowed',
//         'Borrow',
//         lastBook,
//         countLabel,
//         container
//       );
//     });

//     // ✨ Handle favorite star
//     const favBooks = JSON.parse(localStorage.getItem('favBooks')) || [];
//     const isFav = favBooks.some((b) => b && b.id === bookId);
//     if (isFav) {
//       starIcon.src = 'Imgs/Style=bold.png';
//     }

//     starIcon.addEventListener('click', () => {
//       let favBooks = JSON.parse(localStorage.getItem('favBooks')) || [];
//       const isFav = favBooks.some((b) => b && b.id === bookId);

//       if (isFav) {
//         favBooks = favBooks.filter((b) => b && b.id !== bookId);
//         starIcon.src = 'Imgs/Style=linear.png';
//       } else {
//         favBooks.push(book);
//         starIcon.src = 'Imgs/Style=bold.png';
//       }

//       localStorage.setItem('favBooks', JSON.stringify(favBooks));
//     });
//   });
// });

// function detailsBook(button) {
//   const bookElement = button.closest('.book');
//   const bookId = Number(bookElement.getAttribute('data-id'));

//   const popup = document.getElementById('edit-popup');
//   const books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

//   currentBook = books.find((b) => b.id === bookId);

//   if (!currentBook) return;

//   document.getElementById('edit-title').textContent = currentBook.title;
//   document.getElementById('edit-author').textContent = currentBook.author;
//   document.getElementById('edit-description').textContent =
//     currentBook.description;
//   document.getElementById('edit-cover').src = currentBook.coverImg;

//   document.getElementById('edit-form').setAttribute('data-book-id', bookId);

//   popup.style.display = 'block';
// }

// function closePopup() {
//   const popup = document.getElementById('edit-popup');
//   popup.style.display = 'none';
// }
