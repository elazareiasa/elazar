var url = "http://localhost:3000/tasks/";
var xhr = new XMLHttpRequest();
var tbTaskTxt = document.getElementById("tbTaskTxt");
var tasksElm = document.getElementById("tasksElm");
var id = tasksElm.childNodes.length +1;
var btnAdd = document.getElementById("btnAdd");

btnAdd.onclick = function () {
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({task:tbTaskTxt.value}));
  addTask(id, tbTaskTxt.value);
}

function addTask(id, newTask) {
  
  var div = document.createElement('div');
  var task = document.createElement('p');
  var span = document.createElement('span');
  span.setAttribute('id', id);
  span.setAttribute('class', 'remove');
  span.onclick = remove;
  span.innerHTML = 'x';
  task.innerHTML = newTask;
  div.appendChild(task);
  div.appendChild(span);
  tasksElm.appendChild(div);
}

function remove() {
  xhr.open("DELETE", url+this.id);
  xhr.send(null);
  this.parentNode.remove();
}

window.onload = function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var tasks = JSON.parse(xhr.responseText);
      for(var obj of tasks) {
        addTask(obj.id, obj.task);
      }
    }
  };
}





btnAdd.getElementsByTagName