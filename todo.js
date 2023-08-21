
//Get items list by id

//Create a function addTaskToList to append task to the list
// create li for each task
// add classes for styling
// append to ul each task

// Load tasks using loop and calling function addTaskToList

//Get submit button by id

// Add event listener on submit button to add new tasks by clicking it

// fetch data from jsonplaceholder
// https://jsonplaceholder.typicode.com/todos

/*
- Add event listener to task list
- Check if icon delete or icon edit was clicked
- If icon delete clicked, remove parent element
- If icon edit clicked, hide span, show input and add span text to input
- For edit icon, add event listener to press enter key, to update and show span text and hide input
*/


// Initialize variables
let data = [];  // Store fetched data
let currentPage = 1;  // Current page number

// Fetch data from URL
fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData; // Store fetched data
    showItems(currentPage); // Display items for the current page
    showPageNumbers(); // Display page numbers
  })
  .catch(error => console.error('Error:', error));

// Function to display items based on page number
const showItems = pageNumber => {
  const itemsList = document.querySelector('#items');
  itemsList.innerHTML = ''; // Clear previous items

  const startIndex = (pageNumber - 1) * 10;
  const endIndex = startIndex + 10;

  // Loop through items to create and display HTML elements
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const item = data[i];
    const completedClass = item.completed ? 'done' : 'noDone';
    const checked = item.completed;

    const li = `
      <li class="items__li ${completedClass}">
        <p>${item.title}</p>
        <input type="checkbox" id="checkbox" name="checkbox" ${checked ? "checked" : ""}>
        <button class="items__btn ${checked ? 'enabled' : 'disable'}" id="${item.id}">Delete</button>
      </li>`;
    itemsList.innerHTML += li; // Append the new item to the list
  }

  attachDeleteHandlers(); // Attach handlers to delete buttons
  attachCheckboxHandlers(); // Attach handlers to checkboxes
};

// Function to display page numbers
const showPageNumbers = () => {
  const itemsNumber = document.querySelector('.items__number');
  itemsNumber.innerHTML = ''; // Clear previous page numbers

  const pageCount = Math.ceil(data.length / 10); // Calculate number of pages
  // Loop through pages to create and display page number elements
  for (let i = 1; i <= pageCount; i++) {
    const pageNumber = `<span class="items__span">${i}</span>`;
    itemsNumber.innerHTML += pageNumber; // Append page number to the list
  }

  const pageSpans = document.querySelectorAll('.items__span');
  pageSpans.forEach(span => {
    // Attach click event listener to each page number
    span.addEventListener('click', event => {
      currentPage = parseInt(event.target.textContent); // Update current page
      showItems(currentPage); // Display items for the new page
    });
  });
};

// Function to add a new item
const addNewItem = () => {
  const input = document.querySelector('#new-text-input');
  const inputValue = input.value.trim();
  if (inputValue) {
    const newItem = {
      userId: 1,
      id: data.length + 1,
      title: inputValue,
      completed: false
    };
    data.unshift(newItem); // Add new item to the beginning
    input.value = ''; // Clear input field
    showItems(currentPage); // Update the displayed items
    showPageNumbers(); // Update the displayed page numbers
  }
};

// Function to attach delete handlers
const attachDeleteHandlers = () => {
  const deleteButtons = document.querySelectorAll('.items__btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.id);
      data = data.filter(item => item.id !== itemId); // Remove item from data
      showItems(currentPage); // Update the displayed items
      showPageNumbers(); // Update the displayed page numbers
    });
  });
};

// Function to attach checkbox handlers
const attachCheckboxHandlers = () => {
  const checkboxes = document.querySelectorAll('#checkbox');
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      const dataIndex = currentPage * 10 - 10 + index;
      data[dataIndex].completed = checkbox.checked; // Update completion status
      showItems(currentPage); // Update the displayed items
    });
  });
};

// Attach event listener for adding new item
document.querySelector('#submit').addEventListener('click', event => {
  event.preventDefault();
  addNewItem();
});

// Initial display of items and page numbers
showItems(currentPage);
showPageNumbers();
