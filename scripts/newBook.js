function Book (title, author, pages) {
  this.bookTitle = title;
  this.bookAuthor = author;
  this.bookPages = pages;
}

export function newBook (title, author, pages) {
  const book = new Book(title, author, pages);

  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card')

  const bookDetails = document.createElement('div');
  bookDetails.classList.add('book-details');

  bookCard.appendChild(bookDetails);

  const bookTitle = document.createElement('div');
  bookTitle.classList.add('book-title');
  bookTitle.textContent = title;

  const bookAuthor = document.createElement('div');
  bookAuthor.classList.add('book-author');
  bookAuthor.textContent = author;

  bookDetails.appendChild(bookTitle);
  bookDetails.appendChild(bookAuthor);

  const bookProgress = document.createElement('div');
  bookProgress.classList.add('book-progress');
  bookProgress.textContent = 'Progress';

  bookCard.appendChild(bookProgress);

  const bookCurrent = document.createElement('div');
  bookCurrent.classList.add('book-current');

  bookProgress.appendChild(bookCurrent);

  const bookPages = document.createElement('div');
  bookPages.classList.add('book-pages');
  bookPages.textContent = pages;

  bookCurrent.appendChild(bookPages);

  const readBtn = document.createElement('button');
  readBtn.classList.add('secondary');
  readBtn.classList.add('small');
  readBtn.textContent = 'Not read';

  bookCurrent.appendChild(readBtn);
  
  return {bookCard, book};
}