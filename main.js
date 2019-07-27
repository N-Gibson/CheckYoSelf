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
persistToDos();
// Event Listeners
aside.addEventListener('click', deleteLi);
main.addEventListener('click', mainHandler);
plusButton.addEventListener('click', newLi);
makeTaskButton.addEventListener('click', taskButtonHandler)

// Handler Functions
function mainHandler() {
  
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

  main.insertAdjacentHTML('afterbegin', `<article class="card" data-id=>
  <header class="card__header">${card.title}</header>
  <div class="card__div">
    <img class="card__checkbox-inactive" src='images/checkbox.svg'/>
    <p class="card__p">Idea 1</p>
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

function instantiateCard() {
  var toDo = new ToDo(Date.now(), taskTitle.value, false, taskArray)

  listArray.push(toDo);
  toDo.saveToStorage(listArray);
  newTask(toDo)
  taskArray = [];
}

function emptyInput(input) {
  input.value = '';
}

function persistToDos() {
  var newArray = listArray.map(list => newTask(list));
  listArray = newArray;
}