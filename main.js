// Global Variables
var listArray = JSON.parse(localStorage.getItem('ToDoListArray')) || [];
var ul = document.querySelector('.aside__ul');
var plusButton = document.querySelector('.aside__div__img-plus');
var taskItem = document.getElementById('task-item');
// Functions On Page Load

// Event Listeners
plusButton.addEventListener('click', newLi)

// Functions
function newLi() {
  var li = new TaskItem(Date.now(), taskItem.value, false);
  li
}