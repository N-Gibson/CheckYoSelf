class ToDo {
  constructor(id, title, urgent, tasks) {
    this.id = id
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = tasks || [];
  }

  saveToStorage(listArray) {
    localStorage.setItem('ToDoListArray', JSON.stringify(listArray))
  }

  deleteFromStorage(cardIndex) {
    listArray.splice(cardIndex, 1);
    this.saveToStorage(listArray);
  }

  updateToDo(listArray) {
    this.urgent = !this.urgent;
    this.saveToStorage(listArray);
  }

  updateTask(listArray) {
   this.saveToStorage(listArray);
  }
}

class TaskItem {
  constructor(id, task, completed) {
    this.id = id;
    this.task = task;
    this.completed = completed;
  }
}