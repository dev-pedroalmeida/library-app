const readBooksSpan = document.getElementById('read-books');
const totalPagesSpan = document.getElementById('total-pages');

function Book (title, author, pages, isRead, readPages) {
  this.bookTitle = title;
  this.bookAuthor = author;
  this.bookPages = parseInt(pages);
  this.readPages = parseInt(readPages);
  this.bookIsRead = isRead;
}

export function newBook (title, author, pages, isRead) {
  let readPages = 0;
  if(isRead) {
    readPages = pages;
  }

  const book = new Book(title, author, pages, isRead, readPages);

  let usrData = JSON.parse(localStorage.getItem('library-app'));

  const bookPosition = usrData.books.push(book) - 1;

  if(isRead) {
    usrData.readBooks++;
    usrData.totalPages += book.readPages;

    readBooksSpan.textContent = usrData.readBooks;
    totalPagesSpan.textContent = usrData.totalPages;
  }

  localStorage.setItem('library-app', JSON.stringify(usrData));

  const bookCard = createBookCard(book.bookTitle, book.bookAuthor, book.bookIsRead, book.bookPages, book.readPages, bookPosition);
  
  return bookCard;
}

export function createBookCard(title, author, isRead, pages, readPages, bookPosition) {
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

  const bookProgressSpan = document.createElement('span');
  bookProgressSpan.textContent = (isRead ? 'Progress (read)' : 'Progress (reading)');

  bookProgress.appendChild(bookProgressSpan);

  bookCard.appendChild(bookProgress);

  const bookCurrent = document.createElement('div');
  bookCurrent.classList.add('book-current');

  bookProgress.appendChild(bookCurrent);

  const bookPages = document.createElement('div');
  bookPages.classList.add('book-pages');
  bookPages.textContent = `${readPages} / ${pages}`;

  bookCurrent.appendChild(bookPages);

  const readBtn = document.createElement('button');
  readBtn.classList.add('secondary');
  readBtn.classList.add('small');
  readBtn.classList.add('add-book');
  if(isRead) {
    readBtn.setAttribute('disabled', 'true')
  }

  // const plusIcon = createPlusIcon();
  // readBtn.appendChild(plusIcon);
  
  readBtn.setAttribute('data-position', bookPosition)
  readBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const position = e.target.dataset.position;
    let usrData = JSON.parse(localStorage.getItem('library-app'));

    if(!usrData.books[position].bookIsRead) {
      usrData.books[position].readPages++;
      usrData.totalPages++;
      totalPagesSpan.textContent = usrData.totalPages;
      bookPages.textContent = `${usrData.books[position].readPages} / ${usrData.books[position].bookPages}`;
    }

    if(usrData.books[position].readPages == usrData.books[position].bookPages) {
      usrData.books[position].bookIsRead = true;
      e.target.setAttribute('disabled', 'true');
      usrData.readBooks++;
      readBooksSpan.textContent = usrData.readBooks;
      bookProgressSpan.textContent = 'Progress (read)';
    }

    localStorage.setItem('library-app', JSON.stringify(usrData));
  })

  bookCurrent.appendChild(readBtn);

  return bookCard;
}

// function createPlusIcon () {
//   const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

//   iconSvg.setAttribute('width', '16');
//   iconSvg.setAttribute('height', '16');
//   iconSvg.setAttribute('viewBox', '0 0 24 24');
//   iconSvg.setAttribute('fill', 'none');
//   iconSvg.setAttribute('stroke', 'currentColor');
//   iconSvg.setAttribute('stroke-width', '2');
//   iconSvg.setAttribute('stroke-linecap', 'round');
//   iconSvg.setAttribute('stroke-linejoin', 'round');
//   iconSvg.classList.add('feather');
//   iconSvg.classList.add('feather-plus');

//   const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//   line1.setAttribute('x1', '12');
//   line1.setAttribute('y1', '5');
//   line1.setAttribute('x2', '12');
//   line1.setAttribute('y2', '19');

//   const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//   line2.setAttribute('x1', '5');
//   line2.setAttribute('y1', '12');
//   line2.setAttribute('x2', '19');
//   line2.setAttribute('y2', '12');

//   iconSvg.appendChild(line1);
//   iconSvg.appendChild(line2);

//   return iconSvg;
// }