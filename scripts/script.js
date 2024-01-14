import {newBook} from './newBook.js';

let userData;

const readBooksSpan = document.getElementById('read-books');
const totalPagesSpan = document.getElementById('total-pages');
const addBookBtn = document.getElementById('add-book-btn');
const bookModalWrapper = document.querySelector('.book-modal-wrapper');
const bookForm = document.querySelector('.book-form');
const bookList = document.querySelector('.book-list');

window.onload = () => {
  console.log("Loaded!")

  userData = JSON.parse(localStorage.getItem('library-app'));
  console.log(userData)

  if(userData === null) {
    userData = {
      userName: 'Pedro',
      readBooks: 0,
      totalPages: 0,
      books: []
    }
    localStorage.setItem('library-app', JSON.stringify(userData));
  }

  readBooksSpan.textContent = userData.readBooks;
  totalPagesSpan.textContent = userData.totalPages;

  
}



addBookBtn.addEventListener('click', () => {
  bookModalWrapper.classList.toggle('active');
})

bookModalWrapper.addEventListener('click', (e) => {
  if(e.target.className === 'book-modal-overlay') {
    bookModalWrapper.classList.toggle('active');
  }
})



function submitNewBook (e) {
  e.preventDefault();

  const a = newBook(e.target[0].value, e.target[1].value, e.target[2].value)
  
  bookList.appendChild(a.bookCard);
  e.target.reset()
  bookModalWrapper.classList.toggle('active');

  console.log(e)
}

bookForm.addEventListener('submit', submitNewBook);



