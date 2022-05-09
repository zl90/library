/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
// Get the DOM nodes
const btnNewBook = document.querySelector("#btn-newbook");
const bookTable = document.querySelector("#book-table");
const form1 = document.querySelector("#form-1");
const title = document.querySelector("#book-title");
const author = document.querySelector("#book-author");
const read = document.querySelector("#book-read");

// Library objects
const myLibrary = [];

// Constructor
function Book(bookTitle, bookAuthor, bookRead) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.read = bookRead;
  this.id = myLibrary.length;
}

// Form Constraints
title.maxLength = 50;
author.maxLength = 50;

// Events
title.addEventListener("input", () => validateTitle);
author.addEventListener("input", () => validateAuthor);

const validateTitle = () => {
  // Form validation using the Constraint Validation API
  if (title.validity.tooLong) {
    title.setCustomValidity(
      `Title too long. Max ${title.maxLength} characters. You've entered ${title.value.length}.`
    );
    title.reportValidity();
  } else {
    title.setCustomValidity("");
  }
};

const validateAuthor = () => {
  // Form validation using the Constraint Validation API
  if (author.validity.tooLong) {
    author.setCustomValidity(
      `Author name too long. Max ${author.maxLength} characters. You've entered ${author.value.length}.`
    );
    author.reportValidity();
  } else {
    author.setCustomValidity("");
  }
};

// Write a function that loops through the array and displays each book on the page.
function addBookToLibrary() {
  // Form validation using the Constraint Validation API
  const readValue = read.options[read.selectedIndex].value;

  if (!title.validity.valueMissing && !author.validity.valueMissing) {
    const newBook = new Book(title.value, author.value, readValue);
    myLibrary.unshift(newBook);
    form1.reset();
    updateTable();
  } else {
    if (author.validity.valueMissing) {
      author.setCustomValidity("Please enter an author name!");
      author.reportValidity();
    } else {
      author.setCustomValidity("");
    }
    if (title.validity.valueMissing) {
      title.setCustomValidity("Please enter a book title!");
      title.reportValidity();
    } else {
      title.setCustomValidity("");
    }
  }
}

function deleteBookFromLibrary(e) {
  // Delete from library array
  const index = e.target.parentNode.parentNode.rowIndex;
  myLibrary.splice(index - 1, 1);

  updateTable();
}

function toggleStatus(e) {
  const index = e.target.parentNode.parentNode.rowIndex;
  if (myLibrary[index - 1].read === "true") {
    myLibrary[index - 1].read = "false";
  } else {
    myLibrary[index - 1].read = "true";
  }

  updateTable();
}

function updateTable() {
  clearTable();

  for (let i = 0; i < myLibrary.length; i++) {
    const newRow = document.createElement("tr");
    newRow.classList.add("book-row");

    const newTitle = document.createElement("td");
    newTitle.textContent = myLibrary[i].title;
    newRow.appendChild(newTitle);

    const newAuthor = document.createElement("td");
    newAuthor.textContent = myLibrary[i].author;
    newRow.appendChild(newAuthor);

    const newStatusData = document.createElement("td");
    const newStatusButton = document.createElement("button");
    if (myLibrary[i].read === "true") {
      newStatusButton.textContent = "READ";
      newStatusButton.classList.add("read-true");
    } else {
      newStatusButton.textContent = "NOT READ";
      newStatusButton.classList.add("read-false");
    }
    newStatusButton.classList.add("btn-status");
    newStatusButton.addEventListener("click", toggleStatus);
    newStatusData.appendChild(newStatusButton);
    newRow.appendChild(newStatusData);

    const newDeleteData = document.createElement("td");
    const newDeleteButton = document.createElement("button");
    newDeleteButton.textContent = "DELETE";
    newDeleteButton.classList.add("btn-delete");
    newDeleteButton.addEventListener("click", deleteBookFromLibrary);
    newDeleteData.appendChild(newDeleteButton);
    newRow.appendChild(newDeleteData);

    bookTable.appendChild(newRow);
  }
}

function clearTable() {
  const tableChildren = bookTable.querySelectorAll(".book-row");
  for (let i = 0; i < tableChildren.length; i++) {
    bookTable.removeChild(tableChildren[i]);
  }
}

// Event listeners
btnNewBook.addEventListener("click", addBookToLibrary);

const tolkien = new Book("The Lord of the Rings", "J.R.R. Tolkien", "true");
const gladwell = new Book("Outliers", "Malcolm Gladwell", "true");
const caroll = new Book("Alice in Wonderland", "Lewis Caroll", "false");
const chomsky = new Book("Hegemony or Survival", "Noam Chomsky", "false");

myLibrary.push(tolkien);
myLibrary.push(gladwell);
myLibrary.push(caroll);
myLibrary.push(chomsky);
updateTable();
