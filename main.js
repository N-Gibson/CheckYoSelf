// Global Variables
var listArray = JSON.parse(localStorage.getItem('ToDoListArray')) || [];
var taskArray = [];
var taskIndex = null;
var ul = document.querySelector('.aside__ul');
var plusButton = document.querySelector('.aside__div__img-plus');
var taskTitle = document.getElementById('title-input');
var taskItem = document.getElementById('task-item');
var aside = document.querySelector('aside');
var main = document.querySelector('main');
var makeTaskButton = document.querySelector('.aside__button-list');
var clearButton = document.querySelector('.aside__button-clear');
var prompt = document.querySelector('.prompt-message');

// Functions On Page Load
reinstantiateTasks();
persistToDos();
promptList();

// Event Listeners
aside.addEventListener('click', deleteLi);
main.addEventListener('click', mainHandler);
plusButton.addEventListener('click', newLi);
makeTaskButton.addEventListener('click', taskButtonHandler)
clearButton.addEventListener('click', clearAll);

// Handler Functions
function mainHandler() {
  urgent(event);
  checkTask(event);
  deleteCard(event);
}

function taskButtonHandler() {
  if(taskTitle.value === '' || ul.hasChildNodes() === false) {
    return;
  } else {
  instantiateCard();
  emptyInput(taskTitle);
  emptyUl();
  promptList();
  }
}

function clearAll() {
  if(taskTitle.value === '' && ul.hasChildNodes() === false) {
    return;
  } else {
    emptyInput(taskTitle);
    emptyUl();
  }
}

// Functions
function newLi() {
  if(taskItem.value === '') {
    return;
  } else {
  var li = new TaskItem(Date.now(), taskItem.value, false);
  ul.insertAdjacentHTML('beforeend', `<li data-id=${li.id} data-completed=${li.completed} class="aside__li">
  <img class="aside__ul-img" src="images/delete.svg">
  <p class="aside__ul-p">${taskItem.value}</p> 
</li>`)
  taskArray.push(li);
  emptyInput(taskItem);
  }
}

function deleteLi(event) {
  if(event.target.closest('.aside__ul-img')) {
    event.target.closest('.aside__li').remove();
    liIndex();
    classArrayIndex(taskArray);
    emptyInput(taskItem);
  }
}

function liIndex() {
  if(event.target.closest('.aside__ul-img')) {
    for(var i = 0; i < taskArray.length; i++) {
      if(taskArray[i].id === event.target.parentElement.dataset.id) {
        taskArray.splice(i, 1);
      }
    }
  }
}

function newTask(card, toDo) {
  var urgent = card.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';

  main.insertAdjacentHTML('afterbegin', `<article class="card" data-id=${card.id} data-urgent=${card.urgent}>
  <header class="card__header">${card.title}</header>
    <ul class="card__div-appended">
      ${addListItems(toDo, card)}
    </ul>
  <footer class="card__footer">
    <div class="footer__urgent-div">
      <img class="card__urgent" src="${urgent}" alt=""/>
      <p class="card__urgent-text">URGENT</p>
    </div>
    <div class="footer__delete-div">
      <img class="card__delete" src="images/delete.svg" alt=""/>
      <p class="card__delete-text">DELETE</p>
    </div>
  </footer>
</article>`)
}

function addListItems(taskArray, card) {
  var ul = '';
  
  for (var i = 0; i < taskArray.length; i++) {
    var checked = card.tasks[i].completed ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
    var classToItalicize = card.tasks[i].completed ? 'italicized-text' : 'nothing';
    ul +=
    `<li class="card-li" data-id=${taskArray[i].id} data-completed=${taskArray[i].completed}>
      <img class="card__checkbox-inactive" src=${checked}>
      <p class=${classToItalicize}>${taskArray[i].task}</p>
    </li>`
    }
   return ul;
  };
// }

function instantiateCard() {
  var toDo = new ToDo(Date.now(), taskTitle.value, false, taskArray)

  listArray.push(toDo);
  toDo.saveToStorage(listArray);
  newTask(toDo, taskArray);
  taskArray = [];
}

function reinstantiateTasks() {
  var newArray = [];

  for(var i = 0; i < listArray.length; i++) {
    var oldToDo = new ToDo(listArray[i].id, listArray[i].title, listArray[i].urgent, listArray[i].tasks);
    newArray.push(oldToDo);
  }
  listArray = newArray; 
}

function checkTask(event) {
  var checkBox = event.target.closest('.card__checkbox-inactive');
  var cardIndex = findIndex(event);

  if(checkBox) {
    classArrayId(cardIndex);
  }

  var index = parseInt(taskIndex);
  var notChecked = 'images/checkbox.svg';
  var checked = 'images/checkbox-active.svg';
  var p = event.target.nextElementSibling;

  if(checkBox && listArray[cardIndex].tasks[index].completed === false) {
    checkBox.src = checked;
    listArray[cardIndex].tasks[index].completed = true;
    listArray[cardIndex].updateTask(listArray);
    p.classList.add('italicized-text');
  } else if(checkBox && listArray[cardIndex].tasks[index].completed === true) {
    checkBox.src = notChecked;
    listArray[cardIndex].tasks[index].completed = false;
    listArray[cardIndex].updateTask(listArray);
    p.classList.remove('italicized-text');
  } else {
    return;
  }
}

function urgent(event) {
  var urgentButton = event.target.closest('.card__urgent');
  var cardIndex = findIndex(event)
  var notUrgent = 'images/urgent.svg';
  var urgent = 'images/urgent-active.svg';

  if(urgentButton && listArray[cardIndex].urgent === false) {
    urgentButton.src = urgent;
    listArray[cardIndex].urgent = true;
    listArray[cardIndex].updateToDo(listArray);
    toggleUrgency(cardIndex, event);
  } else if(urgentButton && listArray[cardIndex].urgent === true) {
    urgentButton.src = notUrgent;
    listArray[cardIndex].urgent = false;
    toggleUrgency(cardIndex, event);
    listArray[cardIndex].updateToDo(listArray);
  } else {
    return;
  }
}

function toggleUrgency(cardIndex, event) {
  var card = event.target.closest('.card');
  var cardHeader = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling;
  var cardFooter = event.target.parentElement.parentElement;
  var cardUrgentText = event.target.nextElementSibling;

  if(listArray[cardIndex].urgent === true) {
    card.classList.add('article__card-urgent');
    cardHeader.classList.add('card__header-urgent');
    cardFooter.classList.add('card__footer-urgent');
    cardUrgentText.classList.add('card__urgent-text-urgent');
    listArray[cardIndex].updateToDo(listArray);
  } else {
    card.classList.remove('article__card-urgent');
    cardHeader.classList.remove('card__header-urgent');
    cardFooter.classList.remove('card__footer-urgent');
    cardUrgentText.classList.remove('card__urgent-text-urgent');
    listArray[cardIndex].updateToDo(listArray);
  }
}

function emptyInput(input) {
  input.value = '';
}

function emptyUl() {
  ul.innerHTML = '';
}

function persistToDos() {
  for(var i = 0; i < listArray.length; i++) {
    newTask(listArray[i], listArray[i].tasks);
  }
  persistUrgency();
}

function persistUrgency() {
  var card = document.querySelectorAll('.card');

  for(var i = 0; i < card.length; i++) {
    if(card[i].dataset.urgent === 'true') {
      card[i].classList.add('article__card-urgent');
      card[i].firstElementChild.classList.add('card__header-urgent');
      card[i].lastElementChild.classList.add('card__footer-urgent');
      card[i].lastElementChild.firstElementChild.lastElementChild.classList.add('card__urgent-text-urgent');
    } 
  }
}

function findId(event) {
  var target = event.target.closest('.card');

  if(listArray.length > 0 && target) {
    return parseInt(target.dataset.id);
  }
}

function findIndex(event) {
  var targetId = findId(event);

  for(var i = 0; i < listArray.length; i++) {
    if(targetId === listArray[i].id){
      return i;
    }
  }
}

function classArrayId(index) {
  var target = event.target.closest('.card__checkbox-inactive');
  var storage = [];

    if(target && listArray.length > 0){
      var listOfTasks = listArray[index].tasks
      for(var i = 0; i < listOfTasks.length; i++) {
        storage.push(listOfTasks[i].id)
      }
    }
    classArrayIndex(storage)
}

function classArrayIndex(storageArr) {
  var li = event.target.closest('li');
  var target = event.target.closest('.card__checkbox-inactive');

  for(var i = 0; i < storageArr.length; i++) {
    if(target && storageArr[i] === parseInt(li.dataset.id)) {
      taskIndex = i;
    }
  }
}

function deleteCard(event) {
  var card = event.target.closest('.card');
  var cardDelete = event.target.closest('.card__delete');
  var cardIndex = findIndex(event);

  for(var i = 0; i < listArray[cardIndex].tasks.length; i++) {
    if(cardDelete && listArray[cardIndex].tasks[listArray[cardIndex].tasks.length - 1].completed === true && listArray[cardIndex].tasks[0].completed === true) {
      card.remove();
      listArray[cardIndex].deleteFromStorage(cardIndex);
      promptList();
    } else {
      promptList();
      return;
    }
  }
}

function promptList() {
  if(listArray.length !== 0) {
    prompt.style.display = 'none';
  } else {
    prompt.style.display = 'visible';
  }
}