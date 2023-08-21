
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


$(document).ready(function () {
  let data = [];
  let currentPage = 1;

  // Fetch data from URL using jQuery
  $.getJSON('https://jsonplaceholder.typicode.com/todos', function (jsonData) {
      data = jsonData;
      showItems(currentPage);
      showPageNumbers();
  }).fail(function (error) {
      console.error('Error:', error);
  });

  // Function to display items based on page number
  const showItems = pageNumber => {
      const itemsList = $('#items');
      itemsList.empty();

      const startIndex = (pageNumber - 1) * 10;
      const endIndex = Math.min(startIndex + 10, data.length);

      for (let i = startIndex; i < endIndex; i++) {
          const item = data[i];
          const completedClass = item.completed ? 'done' : 'noDone';
          const checked = item.completed;

          const li = `
              <li class="items__li ${completedClass}">
                  <p>${item.title}</p>
                  <input type="checkbox" class="checkbox" ${checked ? "checked" : ""}>
                  <button class="items__btn ${checked ? 'enabled' : 'disable'}" data-id="${item.id}">Delete</button>
              </li>`;
          itemsList.append(li);
      }

      attachDeleteHandlers();
      attachCheckboxHandlers();
  };

  // Function to display page numbers
  const showPageNumbers = () => {
      const itemsNumber = $('.items__number');
      itemsNumber.empty();

      const pageCount = Math.ceil(data.length / 10);
      for (let i = 1; i <= pageCount; i++) {
          const pageNumber = `<span class="items__span">${i}</span>`;
          itemsNumber.append(pageNumber);
      }

      $('.items__span').click(function () {
          currentPage = parseInt($(this).text());
          showItems(currentPage);
      });
  };

  // Function to add a new item
  const addNewItem = () => {
      const inputValue = $('#new-text-input').val().trim();
      if (inputValue) {
          const newItem = {
              userId: 1,
              id: data.length + 1,
              title: inputValue,
              completed: false
          };
          data.unshift(newItem);
          $('#new-text-input').val('');
          showItems(currentPage);
          showPageNumbers();
      }
  };

  // Function to attach delete handlers
  const attachDeleteHandlers = () => {
      $('.items__btn').click(function () {
          const itemId = parseInt($(this).data('id'));
          data = data.filter(item => item.id !== itemId);
          showItems(currentPage);
          showPageNumbers();
      });
  };

  // Function to attach checkbox handlers
  const attachCheckboxHandlers = () => {
      $('.checkbox').change(function () {
          const dataIndex = currentPage * 10 - 10 + $('.checkbox').index(this);
          data[dataIndex].completed = this.checked;
          showItems(currentPage);
      });
  };

  // Attach event listener for adding new item
  $('#submit').click(function (event) {
      event.preventDefault();
      addNewItem();
  });

  // Initial display of items and page numbers
  showItems(currentPage);
  showPageNumbers();
});
