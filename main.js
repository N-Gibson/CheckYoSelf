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
// prompt();
// Event Listeners
aside.addEventListener('click', deleteLi);
main.addEventListener('click', mainHandler);
plusButton.addEventListener('click', newLi);
makeTaskButton.addEventListener('click', taskButtonHandler)
clearButton.addEventListener('click', clearAll);

// Handler Functions
function mainHandler() {
  urgent(event);
  deleteCard(event);
  checkTask(event);
  // findIndex(event)
}

function taskButtonHandler() {
  if(taskTitle.value === '' || ul.hasChildNodes() === false) {
    return;
  } else {
  // debugger;
  // create the li's (which happens on click of +)
  // make the new card instantiation
  instantiateCard();
  emptyInput(taskTitle);
  emptyUl();
  // Push the list items into the class array
  // Save to storage 
  // Append the card to the dom
  // newTask();
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
  ul.insertAdjacentHTML('beforeend', ` <li data-id=${li.id} class="aside__li">
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
    emptyInput(taskItem);
  }
}

function newTask(card, arg) {
  var urgent = card.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';

  main.insertAdjacentHTML('afterbegin', `<article class="card" data-id=${card.id}>
  <header class="card__header">${card.title}</header>
    <ul class="card__div-appended">
      ${addListItems(arg, card)}
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
  var checked = card.tasks.completed ? 'images/checkbox-active.svg' : 'images/checkbox.svg'

  for (var i = 0; i < taskArray.length; i++) {
    // var completedStatus = listedTasks.tasks[i].completed ? 'checkbox-active.svg' : 'checkbox.svg';
    // var completedParagraphStyle = listedTasks.tasks[i].completed ? 'main__article__task-completed' : 'main__article__task-not-completed';
      ul +=
    `<li class="card-li" data-id=${taskArray[i].id}>
      <img class="card__checkbox-inactive" src=${checked}/>
      <p>${taskArray[i].task}</p>
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

// function reinstantiateList() {
//   var holder = []
//   if(localStorage.length === 0) {
//     return;
//   } else {
//   for(var i = 0; i < listArray.length; i++) {
//     var oldTasks = new TaskItem(listArray[i].id, listArray[i].task, listArray[i].completed);
//     holder.push(oldTasks)
//   }
//   taskArray = holder;
//   console.log(taskArray);
//   reinstantiateCard();
//   }
// }

// function reinstantiateCard() {
//   if(localStorage.length === 0) {
//     return;
//   } else {
//     for(var i = 0; i < listArray.length; i++) {
//       var newCard = new ToDo(listArray[i].id, listArray[i].title, listArray[i].urgent, taskArray);
//       listArray.push(newCard);
//       }
//     }

//   // persistToDos();
//   newCard.saveToStorage(listArray);
//   newTask(newCard);
//   taskArray = [];
// }
function checkTask(event) {
  // debugger;
  var checkBox = event.target.closest('.card__checkbox-inactive');
  var cardIndex = findIndex(event);
  if(checkBox) {
    classArrayId(cardIndex);
  }
  var index = parseInt(taskIndex);
  var notChecked = 'images/checkbox.svg';
  var checked = 'images/checkbox-active.svg';
  if(checkBox && listArray[cardIndex].tasks[index].completed === false) {
    checkBox.src = checked;
    listArray[cardIndex].tasks[index].completed = true;
    // run function to change styles
    listArray[cardIndex].updateToDo(listArray);
    console.log('complete true', listArray[cardIndex].tasks[index]);
  } else if(checkBox && listArray[cardIndex].tasks[index].completed === true) {
    checkBox.src = notChecked;
    listArray[cardIndex].tasks[index].completed = false;
    // run function to change styles
    listArray[cardIndex].updateToDo(listArray);
    console.log('complete false', listArray[cardIndex].tasks[index]);
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
    toggleUrgency(cardIndex);
    listArray[cardIndex].updateToDo(listArray);
  } else if(urgentButton && listArray[index].urgent === true) {
    urgentButton.src = notUrgent;
    listArray[index].urgent = false;
    toggleUrgency(index);
    listArray[index].updateToDo(listArray);
  } else {
    return;
  }
}

function toggleUrgency(index) {
  var card = document.querySelector('article');
  var cardHeader = document.querySelector('.card__header');
  var cardFooter = document.querySelector('.card__footer');
  var cardUrgentText = document.querySelector('.card__urgent-text');
  if(listArray[index].urgent === true) {
    card.classList.add('article__card-urgent');
    cardHeader.classList.add('card__header-urgent');
    cardFooter.classList.add('card__footer-urgent');
    cardUrgentText.classList.add('card__urgent-text-urgent');
  } else {
    card.classList.remove('article__card-urgent');
    cardHeader.classList.remove('card__header-urgent');
    cardFooter.classList.remove('card__footer-urgent');
    cardUrgentText.classList.remove('card__urgent-text-urgent');
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
}

// Can be replaced!!!!!!!!!!!!!!!!
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
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function classArrayId(index) {
  var target = event.target.closest('.card__checkbox-inactive');
  var storage = [];
    if(target && listArray.length > 0){
      var listOfTasks = listArray[index].tasks
      for(var i = 0; i < listOfTasks.length; i++) {
        // classArrayIndex(listOfTasks[i].id, index)
        storage.push(listOfTasks[i].id)
      }
    }
    classArrayIndex(storage)
    // return parseInt(target.dataset.id);
}

// function classArrayIndex(passedId, passedIndex) {
//   for(var i = 0; i < listArray[passedIndex].tasks.length; i++) {
//     if(passedId === listArray[passedIndex].tasks[i].id) {
//       return console.log(i)
//     }
//   }
// }

function classArrayIndex(storageArr) {
  var li = event.target.closest('li');
  var target = event.target.closest('.card__checkbox-inactive');
  for(var i = 0; i < storageArr.length; i++) {
    if(target && storageArr[i] === parseInt(li.dataset.id)) {
      taskIndex = i;
    }
  }
  console.log(taskIndex);
}

function deleteCard(event) {
  var card = event.target.closest('.card');
  var cardDelete = event.target.closest('.card__delete');
  var cardIndex = findIndex(event);
  for(var i = 0; i < listArray.length; i++) {
    console.log(listArray[cardIndex].tasks[i].completed);
  }
}

function prompt() {
  if(listArray.length < 1) {
    main.insertAdjacentHTML('afterbegin', `<p class='prompt-message'>Add a TO <span class='prompt-span'>DO'</span> LIST</p>`)
  } else if(listArray.length >= 1) {
    prompt.remove();
  }
}