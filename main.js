// Global Variables
var listArray = JSON.parse(localStorage.getItem('ToDoListArray')) || [];
var taskArray = [];
var ul = document.querySelector('.aside__ul');
var plusButton = document.querySelector('.aside__div__img-plus');
var taskTitle = document.getElementById('title-input');
var taskItem = document.getElementById('task-item');
var aside = document.querySelector('aside');
var main = document.querySelector('main');
var makeTaskButton = document.querySelector('.aside__button-list');
// Functions On Page Load
// reinstantiateList();
// persistToDos();
// Event Listeners
aside.addEventListener('click', deleteLi);
main.addEventListener('click', mainHandler);
plusButton.addEventListener('click', newLi);
makeTaskButton.addEventListener('click', taskButtonHandler)

// Handler Functions
function mainHandler() {
  urgent(event);
  // findIndex(event)
}

function taskButtonHandler() {
  // debugger;
  // create the li's (which happens on click of +)
  // make the new card instantiation
  instantiateCard()
  // Push the list items into the class array
  // Save to storage 
  // Append the card to the dom
  // newTask();
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

function newTask(card) {
  var urgent = card.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';

  main.insertAdjacentHTML('afterbegin', `<article class="card" data-id=${card.id}>
  <header class="card__header">${card.title}</header>
  <div class="card__div">
    ${addListItems(taskArray)}
  </div>
  <div class="card__div">
      <img class="card__checkbox-inactive" src='images/checkbox.svg'/>
      <p class="card__p">Idea 1</p>
    </div>
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

function addListItems(taskArray) {
  var ul = '';
  for (var i = 0; i < taskArray.length; i++) {
    // var completedStatus = listedTasks.tasks[i].completed ? 'checkbox-active.svg' : 'checkbox.svg';
    // var completedParagraphStyle = listedTasks.tasks[i].completed ? 'main__article__task-completed' : 'main__article__task-not-completed';
      ul +=
    `<span data-id=${taskArray[i].id}>
      <img class="card__checkbox-inactive" src='images/checkbox.svg'/>
      <p>${taskArray[i].task}</p>
    </span>`
    }
   return ul;
  };
// }

function instantiateCard() {
  var toDo = new ToDo(Date.now(), taskTitle.value, false, taskArray)

  listArray.push(toDo);
  toDo.saveToStorage(listArray);
  newTask(toDo)
  taskArray = [];
}

function reinstantiateList(task) {
 var task = new TaskItem(task.id, task.title, task.complete);
 taskArray.push(task);
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

function urgent(event) {
  var urgentButton = event.target.closest('.card__urgent');
  var index = findIndex(event)
  var notUrgent = 'images/urgent.svg';
  var urgent = 'images/urgent-active.svg';

  if(urgentButton && listArray[index].urgent === false) {
    urgentButton.src = urgent;
    listArray[index].urgent = true;
    toggleUrgency(index);
    listArray[index].updateToDo(listArray);
  } else if(urgentButton && listArray[index].urgent === true) {
    urgentButton.src = notUrgent;
    listArray[index].urgent = false;
    toggleUrgency(index);
    listArray[index].updateToDo(listArray);
  } else {
    return
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

// function persistToDos() {
//   for(var i = 0; i < listArray.length; i++) {
//     listArray[i].tasks.forEach(task => reinstantiateList(task));
//   }
  
  // var newLists = listArray.map(list => reinstantiateCard(list))
  // listArray = newLists;
  // newTask(listArray);
// }

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