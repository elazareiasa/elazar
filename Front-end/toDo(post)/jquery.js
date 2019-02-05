var url = "http://localhost:3000/tasks/";
var xhr = new XMLHttpRequest();
var tbTaskTxt = $("#tbTaskTxt");
var tasksElm = $("#tasksElm");
var id = tasksElm.children.length-1;

$("#btnAdd").click(function () {
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({task:tbTaskTxt.val()}));
  
  addTask(id, tbTaskTxt.val());
});

function addTask(id, newTask) { 
  var div = $('<div>')
  div.append($('<p>').text(newTask));
  div.append($('<span>', {id:id, class: 'remove'}).click(remove).text('x'));
  tasksElm.append(div);
}

function remove() {
  xhr.open("DELETE", url+this.id);
  xhr.send();
  this.parentNode.remove();
}

window.onload = function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      for(var obj of JSON.parse(xhr.responseText)) {
        addTask(obj.id, obj.task);
      }
    }
  };
}





