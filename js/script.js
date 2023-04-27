let countID = localStorage.getItem('CountID') || 0;
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

function RederTask(){
    savedTasks.forEach((task) => {
      if(!task.completed){
        CreateTask(task.name, task.id, false);
      }
    });

    savedTasks.forEach((task) => {
      if(task.completed){
        CreateTask(task.name, task.id, true);
      }
    });
}

RederTask();

document.getElementById("AddButton").addEventListener('click', () => {
  Taskname = document.getElementById("InputName")
  if (Taskname.value != "") {
    CreateTask(Taskname.value, countID)
    savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push({name: Taskname.value, id: countID, completed: false});
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    localStorage.setItem('CountID', ++countID);
    Taskname.value = ""
    location.reload() 
  }
})

function CreateTask(name, id, completed) {
  Task = document.createElement("div")
  Task.classList.add("Task")
  Task.id = id
  if(completed){
    Task.classList.add("completed")
  }

  Title = document.createElement("font")
  Title.appendChild(document.createTextNode(name))
  Task.appendChild(Title)

  Actions = document.createElement("div")
  Actions.classList.add("actions")

  CloseButton = document.createElement("button")
  CloseIcon = document.createElement('i')
  CloseIcon.classList.add("fa-solid");  
  CloseIcon.classList.add("fa-trash");  
  CloseButton.appendChild(CloseIcon)
  CloseButton.onclick = function () {
      DeleteTaks(id);
  };

  Conclusion = document.createElement("button")
  ConclusionIcon = document.createElement('i')
  ConclusionIcon.classList.add("fa-solid")
  ConclusionIcon.classList.add("fa-check")
  Conclusion.appendChild(ConclusionIcon)
  Conclusion.onclick = function () {
      ConcluirTasks(id);
  };

  Actions.appendChild(CloseButton)
  Actions.appendChild(Conclusion)
  Task.appendChild(Actions)

  document.getElementById("Tasks").appendChild(Task)
}

function DeleteTaks(id) {
  Task = document.getElementById(id)
  Task.parentNode.removeChild(Task)
  
  const updatedTasks = savedTasks.filter((task) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  savedTasks = JSON.parse(localStorage.getItem('tasks'))
}

function ConcluirTasks(id){
  Task = document.getElementById(id)
  Task.classList.add('completed')

  const updatedTasks = savedTasks.map((task) => {
    if (task.id == id) {
      return { ...task, completed: 'true'};
    }else{
      return task
    }
  });
  console.log(updatedTasks)
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  location.reload()
}