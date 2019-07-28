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

  deleteFromStorage() {

  }

  updateToDo(listArray) {
    localStorage.setItem('ToDoListArray', JSON.stringify(listArray))
  }

  updateTask() {

  }
}

class TaskItem {
  constructor(id, task, completed) {
    this. id = id;
    this.task = task;
    this.completed = completed;
  }
}