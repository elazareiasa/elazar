var urlServ = "http://localhost:3000/image/"
var urlRob = "https://robohash.org/"
var xhr = new XMLHttpRequest();
var showRobot = document.getElementById("showRobot");
var savedRobots = document.getElementById("savedRobots");
var btName = document.getElementById("btName");
var btnShow = document.getElementById("btnShow");

btnShow.onclick = function () {
  showRobot.innerHTML = ''
  var span = document.createElement('span');
  span.setAttribute('id', 'save');
  span.innerText = '+';
  var img = document.createElement('img');
  img.setAttribute("src",urlRob+btName.value);
  showRobot.appendChild(span);
  showRobot.appendChild(img);
  span.onclick = addRobotToFavorits; 
}

function addRobotToFavorits() {
  var favorit = document.createElement('div');
    var comment = document.createElement('i');
    var remove = document.createElement('i');
    favorit.setAttribute("class","imgWrapper");
    comment.setAttribute('class',"fas fa-pencil-alt");
    comment.setAttribute('id',"comment");
    remove.setAttribute('class',"far fa-trash-alt");
    remove.setAttribute('id',"remove");
    
    remove.onclick = function () {
      this.parentElement.remove();
    }

    comment.onclick = function () {
      modal = document.getElementById('modal');
      modal.setAttribute('display','none')
      // var imgDescribe = document.createElement('div');
      // imgDescribe.setAttribute('id', 'imgDescribe');
    }

    favorit.appendChild(this.parentElement.lastChild);
    favorit.appendChild(comment);
    favorit.appendChild(remove);
    savedRobots.appendChild(favorit);

    // savedRobots.appendChild(this.parentElement.lastChild);
    showRobot.innerHTML = ''
    xhr.open('POST', urlServ, true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send(JSON.stringify({name:btName.value,url:urlRob+btName.value}));
}

window.onload = function () {
  xhr.open('GET', urlServ, true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200){
      
      var robots = JSON.parse(xhr.responseText);

      for(var robot of robots) {
        var img = document.createElement('img');
        img.setAttribute("src",robot.url); 
        var favorit = document.createElement('div');
        var comment = document.createElement('i');
        var remove = document.createElement('i');
        favorit.setAttribute("class","imgWrapper");
        comment.setAttribute('class',"fas fa-pencil-alt");
        comment.setAttribute('id',"comment");
        remove.setAttribute('class',"far fa-trash-alt");
        remove.setAttribute('id',"remove");

        xhr.open('DELETE', urlServ+robot.id, true);
        remove.onclick = function () {
          // var xhr = new XMLHttpRequest();         
          xhr.send();
          this.parentElement.remove();
        };

        comment.onclick = function () {
          
        };
        favorit.appendChild(img);
        favorit.appendChild(comment);
        favorit.appendChild(remove);
        savedRobots.appendChild(favorit);
      }
    }
  }
  xhr.send();
}




