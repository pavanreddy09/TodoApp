let form = document.querySelector("form");
let inputtext = document.getElementById("inputtext");
let inputdate = document.getElementById("inputdate");
let textdes = document.querySelector("textarea");

let list = document.querySelector(".list");

let tasks = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createTask();
  emptyField();
});

// creating task and storing in local storage
let createTask = () => {
  tasks.push({
    task: inputtext.value,
    date: inputdate.value,
    description: textdes.value,
    completed: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTask();
};

// display tasks in html
let addTask = () => {
  list.innerHTML = " ";
  tasks.map((val, index) => {
    if (val.completed === true) {
      return (list.innerHTML += `<div class="taskbox active" id=${index}>
            <div class="tasktext underline">
            <h4>${val.task}</h4>
            <p>${val.date}</p>
            <h4>${val.description}</h4>
            </div>
            <div class="taskbutton">
            <div>
            <button onclick="progress(this)"class="progress pcolor">Mark as Incomplete!</button>
            </div>
            <div class="hide">
            <button onclick="editTask(this)" class="edit">Edit</button>
            <button onclick="deleteTask(this)" class="del">Delete</button>
            </div>
            </div>
            </div>`);
    } else {
      return (list.innerHTML += `<div class="taskbox" id=${index}>
            <div class="tasktext">
            <h4>${val.task}</h4>
            <p>${val.date}</p>
            <h4>${val.description}</h4>
            </div>
            <div class="taskbutton">
            <div>
            <button onclick="progress(this)" class="progress">Mark as Complete!</button>
            </div>
            <div>
            <button onclick="editTask(this)" class="edit">Edit</button>
            <button onclick="deleteTask(this)" class="del">Delete</button>
            </div>
            </div>
            </div>`);
    }
  });
};

//IIFE
(() => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    addTask();
  })();

let emptyField = () => {
  inputtext.value = "";
  inputdate.value = "";
  textdes.value = "";
};

// delete Task
let deleteTask = (e) => {
  e.parentElement.parentElement.parentElement.remove();
  tasks.splice(e.parentElement.parentElement.parentElement.id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Edit task
let editTask = (e) => {
  let selected = e.parentElement.parentElement.parentElement;
  inputtext.value = selected.children[0].children[0].innerHTML;
  inputdate.value = selected.children[0].children[1].innerHTML;
  textdes.value = selected.children[0].children[2].innerHTML;
  deleteTask(e);
};

// task progress
let progress = (e) => {
  e.parentElement.nextElementSibling.classList.toggle("hide");

  e.parentElement.parentElement.parentElement.classList.toggle("active");
  if (tasks[e.parentElement.parentElement.parentElement.id].completed == true) {
    tasks[e.parentElement.parentElement.parentElement.id].completed = false;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    tasks[e.parentElement.parentElement.parentElement.id].completed = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  if (e.innerHTML == "Mark as Complete!") {
    e.innerHTML = "Mark as Incomplete!";
  } else {
    e.innerHTML = "Mark as Complete!";
  }
  e.classList.toggle("pcolor");

  let selected = e.parentElement.parentElement.parentElement;
  selected.children[0].classList.toggle("underline");
};
