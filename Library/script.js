const LibraryKey = 'libraryBooks'
editingIndex = -1
function loadLibrary() {
  const storedLibrary = localStorage.getItem(LibraryKey)
  if (storedLibrary) {
    const library = JSON.parse(storedLibrary)
    library.forEach((book) => {
      addBookToList(book)
    })
  }
}

function saveLibrary() {
  const libraryItems = document.querySelectorAll('.book-item')
  const library = []

  libraryItems.forEach((item) => {
    const title = item
      .querySelector('strong:nth-of-type(1)')
      .nextSibling.nodeValue.trim()
    const author = item
      .querySelector('strong:nth-of-type(2)')
      .nextSibling.nodeValue.trim()
    const pages = item
      .querySelector('strong:nth-of-type(3)')
      .nextSibling.nodeValue.trim()
    const isRead =
      item
        .querySelector('strong:nth-of-type(4)')
        .nextSibling.nodeValue.trim() === 'Yes'

    library.push({
      title: title,
      author: author,
      pages: pages,
      readingStatus: isRead,
    })
  })
  console.log(library)
  localStorage.setItem(LibraryKey, JSON.stringify(library))
}

function openForm() {
  document.getElementById('addBook').style.display = 'block'
}

function closeForm() {
  document.getElementById('addBook').style.display = 'none' //
  editingIndex = -1
}

function addBookToList(book) {
  const bookContainer = document.querySelector('.book-container')
  const bookItem = document.createElement('div')
  bookItem.className = 'book-item'
  bookItem.innerHTML = `
          <strong>Title:</strong> ${book.title} <br />
          <strong>Author:</strong> ${book.author} <br />
          <strong>Pages:</strong> ${book.pages} <br />
          <strong>Read:</strong> ${book.readingStatus ? 'Yes' : 'No'}
          <div>
              <button class="edit-button" onclick="editBook(this)">Edit</button>
              <button class="delete-button" onclick="deleteBook(this)">Delete</button>
          </div>`
  bookContainer.appendChild(bookItem)
}

document
  .getElementById('addBookForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('read').checked

    const newBook = {
      author: author,
      title: title,
      pages: pages,
      readingStatus: isRead,
    }

    if (editingIndex === -1) {
      addBookToList(newBook)
    } else {
      const bookItems = document.querySelectorAll('.book-item')
      const bookItem = bookItems[editingIndex]
      bookItem.querySelector('strong:nth-of-type(1)').nextSibling.nodeValue =
        title
      bookItem.querySelector('strong:nth-of-type(2)').nextSibling.nodeValue =
        author
      bookItem.querySelector('strong:nth-of-type(3)').nextSibling.nodeValue =
        pages
      bookItem.querySelector('strong:nth-of-type(4)').nextSibling.nodeValue =
        isRead ? 'Yes' : 'No'
      editingIndex = -1
    }

    saveLibrary()
    this.reset()

    closeForm()
  })

function editBook(button) {
  const bookItem = button.closest('.book-item') // Get the closest .book-item
  if (!bookItem) return // If bookItem is not found, exit the function

  // Fetching text directly, no need for nextSibling if you are using strong tags
  const title = bookItem
    .querySelector('strong:nth-of-type(1)')
    .innerText.replace('Title:', '')
    .trim()
  const author = bookItem
    .querySelector('strong:nth-of-type(2)')
    .innerText.replace('Author:', '')
    .trim()
  const pages = bookItem
    .querySelector('strong:nth-of-type(3)')
    .innerText.replace('Pages:', '')
    .trim()
  const isRead =
    bookItem
      .querySelector('strong:nth-of-type(4)')
      .innerText.replace('Read:', '')
      .trim() === 'Yes'

  // Populate the form with the current book details
  document.getElementById('title').value = title
  document.getElementById('author').value = author
  document.getElementById('pages').value = pages
  document.getElementById('read').checked = isRead

  // Set the editing index to the current book index
  editingIndex = [...document.querySelectorAll('.book-item')].indexOf(bookItem)

  // Open the form popup
  openForm() // This function will set the form display to block
}

function deleteBook(button) {
  const bookItem = button.closest('.book-item') // Get the closest .book-item
  if (!bookItem) return // If bookItem is not found, exit the function

  bookItem.remove() // Remove the book item from the list

  // Save the updated library to local storage
  saveLibrary()
}

window.onload = function () {
  loadLibrary()
}
