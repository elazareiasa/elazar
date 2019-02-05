(function () { 
  const btnAddFish = document.getElementById("btnAddFish");
  const aquarium = document.getElementById("aquarium");
  const selectFish = document.getElementById("selectFish");
  const speed = document.getElementById("speed");

  btnAddFish.onclick = function () {
    const fish = new Fish(selectFish.value, speed.value);
    fish.render(aquarium);
  }

  class Fish {
    constructor(type, speed) {
      this.type = type;
      this.speed = parseInt(100/speed);
    }

    render(aquarium) {
      let fishWrapper = document.createElement('div');
      fishWrapper.className = 'fishWrapper';
      let fish = document.createElement('img');
      let x = 0;
      fish.src = this.type;
      fish.className = 'fish';
      fish.style.top = (aquarium.offsetHeight-200)*Math.random()+'px';
      fishWrapper.appendChild(fish);
      aquarium.appendChild(fishWrapper);

      let leftToRight = true;
      setInterval(function(){        
        if(leftToRight && x<+aquarium.offsetWidth-200){
          fish.style.left = ++x+'px';
        }
        else {
          fish.className = 'fish flip';
          leftToRight = false;
          fish.style.left = --x+'px';
          if(x===0){
            fish.className = 'fish';
            leftToRight = true;
          }
        }
       }, this.speed);
    }
  }
})();