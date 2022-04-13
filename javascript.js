// Get the DOM nodes
const btnNewBook = document.querySelector('#btn-newbook');
const bookTable = document.querySelector('#book-table');
const form1 = document.querySelector('#form-1');

// Event listeners
btnNewBook.addEventListener('click', addBookToLibrary);

// Library objects
let myLibrary = [];

// Constructor
function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = myLibrary.length;
}

// Write a function that loops through the array and displays each book on the page. 
function addBookToLibrary() {
    // Check the form for values
    let titleValue = document.querySelector('#book-title').value;
    let authorValue = document.querySelector('#book-author').value;
    let e = document.querySelector("#book-read");
    let readValue = e.options[e.selectedIndex].value;

    if (titleValue != '' && authorValue != '') {
        const newBook = new Book(
            titleValue,
            authorValue,
            readValue
        );
    
        myLibrary.unshift(newBook);
    
        form1.reset();
    
        updateTable();
    } else {
        alert('Please enter a Book Title and an Author Name');
    }

}

function deleteBookFromLibrary(e) {
    // Delete from library array
    let index = e.target.parentNode.parentNode.rowIndex;
    myLibrary.splice(index-1, 1);

    updateTable();
}

function toggleStatus(e) {
    let index = e.target.parentNode.parentNode.rowIndex;
    if (myLibrary[index-1].read == 'true') {
        myLibrary[index-1].read = 'false';
    } else {
        myLibrary[index-1].read = 'true';
    }

    updateTable();
}

function updateTable() {
    clearTable();

    for (let i = 0; i < myLibrary.length; i++) {
        let newRow = document.createElement('tr');
        newRow.classList.add('book-row');

        let newTitle = document.createElement('td');
        newTitle.textContent = myLibrary[i].title;
        newRow.appendChild(newTitle);

        let newAuthor = document.createElement('td');
        newAuthor.textContent = myLibrary[i].author;
        newRow.appendChild(newAuthor);

        let newStatusData = document.createElement('td');
        let newStatusButton = document.createElement('button');
        if (myLibrary[i].read == 'true') {
            newStatusButton.textContent = 'READ';
            newStatusButton.classList.add('read-true')
        } else {
            newStatusButton.textContent = 'NOT READ';
            newStatusButton.classList.add('read-false')
        }
        newStatusButton.classList.add('btn-status');
        newStatusButton.addEventListener('click', toggleStatus);
        newStatusData.appendChild(newStatusButton);
        newRow.appendChild(newStatusData);

        let newDeleteData = document.createElement('td');
        let newDeleteButton = document.createElement('button');
        newDeleteButton.textContent = 'DELETE';
        newDeleteButton.classList.add('btn-delete');
        newDeleteButton.addEventListener('click', deleteBookFromLibrary);
        newDeleteData.appendChild(newDeleteButton);
        newRow.appendChild(newDeleteData);

        bookTable.appendChild(newRow);
    }
}

function clearTable() {
    let tableChildren = bookTable.querySelectorAll('.book-row');
    for (let i = 0; i < tableChildren.length; i++) {
        bookTable.removeChild(tableChildren[i]);
    }
}

const tolkien = new Book(
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    'true'
);
const gladwell = new Book(
    'Outliers',
    'Malcolm Gladwell',
    'true'
);
const caroll = new Book(
    'Alice in Wonderland',
    'Lewis Caroll',
    'false'
);
const chomsky = new Book(
    'Hegemony or Survival',
    'Noam Chomsky',
    'false'
);

myLibrary.push(tolkien);
myLibrary.push(gladwell);
myLibrary.push(caroll);
myLibrary.push(chomsky);
updateTable();