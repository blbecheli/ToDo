
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


$(document).ready(function() {
    let data = [];
    let currentPage = 1;
    let ctrlAnimation = 1;
  
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      method: 'GET',
      dataType: 'json'
    })
    .done(function(jsonData) {
      data = jsonData;
      showItems(currentPage);
      showPageNumbers();
    })
    .fail(function(error) {
      console.error('Error:', error);
    });
  
    const showItems = pageNumber => {
      const itemsList = $('#items');
      itemsList.empty();
  
      const startIndex = (pageNumber - 1) * 10;
      const endIndex = startIndex + 10;
      let time = ctrlAnimation === 1 ? 1 : -11;
  
      for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const item = data[i];
        const completedClass = item.completed ? 'done' : 'noDone';
        const checked = item.completed;
  
        const li = `
          <li class="items__li ${completedClass}" style="animation: slideInFromRight ${time}s ease-in-out">
            <p>${item.title}</p>
            <input type="text" class="items__input noVisible" value="${item.title}">
            <input type="checkbox" class="checkbox" ${checked ? "checked" : ""}>
            <button class="items__btn ${checked ? 'enabled' : 'disable'}" id="${item.id}">Delete</button>
          </li>`;
        itemsList.append(li);
        time += 0.1;
      }
      ctrlAnimation = 1;
      attachDeleteHandlers();
      attachCheckboxHandlers();
      edit();
    };
  
    const showPageNumbers = () => {
      const itemsNumber = $('.items__number');
      itemsNumber.empty();
  
      const pageCount = Math.ceil(data.length / 10);
  
      for (let i = 1; i <= pageCount; i++) {
        const pageNumber = `<span class="items__span">${i}</span>`;
        itemsNumber.append(pageNumber);
      }
  
      $('.items__span').click(function(event) {
        currentPage = parseInt($(event.target).text());
        showItems(currentPage);
      });
    };
  
    const addNewItem = () => {
      const input = $('#new-text-input');
      const inputValue = input.val().trim();
      if (inputValue) {
        const newItem = {
          userId: 1,
          id: data.length + 1,
          title: inputValue,
          completed: false
        };
        data.unshift(newItem);
        input.val('');
        ctrlAnimation = 0;
        showItems(currentPage);
        showPageNumbers();
        edit();
      }
    };
  
    const attachDeleteHandlers = () => {
      $('.items__btn').click(function() {
        ctrlAnimation = 0;
        const itemId = parseInt($(this).attr('id'));
        data = data.filter(item => item.id !== itemId);
        showItems(currentPage);
        showPageNumbers();
      });
    };
  
    const attachCheckboxHandlers = () => {
      $('.checkbox').change(function() {
        ctrlAnimation = 0;
        const dataIndex = currentPage * 10 - 10 + $('.checkbox').index(this);
        data[dataIndex].completed = $(this).prop('checked');
        showItems(currentPage);
      });
    };
  
    const edit = () => {
      const pText = $('.items__li p');
      const inputText = $('.items__input');
      const btnId = $('.items__btn');
      let idBtn;
      let inputindex;
  
      pText.click(function() {
        const index = pText.index(this);
        pText.addClass('noVisible');
        inputText.eq(index).removeClass('noVisible').focus();
        idBtn = btnId.eq(index).attr('id');
        inputindex = index;
      });
  
      $(document).click(function(event) {
        pText.each(function(index, e) {
          const item = $(e).parent();
          if (!item.is(event.target) && item.has(event.target).length === 0) {
            inputText.eq(index).addClass('noVisible');
            $(e).removeClass('noVisible');
          }
        });
  
        if (inputText.eq(inputindex).val() !== data[idBtn - 1].title) {
          data[idBtn - 1].title = inputText.eq(inputindex).val();
          idBtn = '';
          inputindex = '';
          ctrlAnimation = 0;
          showItems(currentPage);
        }
      });
    };
  
    $('#submit').click(function(event) {
      event.preventDefault();
      addNewItem();
    });
  
    showItems(currentPage);
    showPageNumbers();
  });
  