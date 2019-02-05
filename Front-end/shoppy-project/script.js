window.onload = function (){
  var urlServer = 'http://localhost:3000/';
  var cartArr = JSON.parse(localStorage.getItem('chosenProducts')) || [] ;
  var header = {'Content-type': 'application/json'};
  var items = document.getElementById('items');
  var tbody = document.getElementById('tbody');
  var totalPrice = document.getElementById('totalPrice');
  var btnOrder = document.getElementById('btnOrder');
  var sum = 0;

  showItems();
  renderCart();

  function showItems() {
    sendRequest('GET',urlServer+'products',null,null,function(result) {
      var products = JSON.parse(result);
      for(var product of products) {
        renderProduct(product);
      }
    });
  }

  function renderProduct(product) {
    var div = document.createElement('div');
    var img = document.createElement('img');
    var small = document.createElement('small');
    var span = document.createElement('span');
    var button = document.createElement('button');

    div.className = 'item';
    div.id = product.id;
    img.src = product.image;
    small.className = 'title';
    small.innerText = product.name;
    span.className = 'price';
    span.innerText = '$' + product.price;
    button.className = 'btnAdd';
    button.innerText = 'Add to cart';
    button.onclick = function () {
      addToCart(product);
      saveToLocalStorage();
      renderCart();
    };

    div.appendChild(img);
    div.appendChild(small);
    div.appendChild(span);
    div.appendChild(button);
    items.appendChild(div);

  }

  function addToCart(product) {
    var productObj = {'id':product.id,'name':product.name,'price':product.price,'quantity':1};
    for(var obj of cartArr) {
      if(obj.id == productObj.id) {
        obj.quantity = +obj.quantity + 1;
        return;
      }
    }
    cartArr.push(productObj); 
  }

  function saveToLocalStorage() {
    localStorage.setItem('chosenProducts', JSON.stringify(cartArr));
  }

  function renderCart() {
    tbody.innerHTML = '';
    
    for(var product of cartArr) {
      renderRow(product);
    }

    var items = document.getElementsByClassName('details');
    sum = 0;
    for(var item of items){
      sum += +item.lastChild.innerText.slice(1);
    }

    totalPrice.innerText = 'total price: $' + sum;
    
  }

  function renderRow(product) {
    var row = tbody.appendChild(document.createElement('tr'));
    row.className = 'details';

    var name = row.appendChild(document.createElement('td'));
    name.innerText = product.name;

    var quantity = row.appendChild(document.createElement('td'));
    quantity.innerText = product.quantity;

    var price = row.appendChild(document.createElement('td'));
    price.innerText = '$' + product.price;

    var total = row.appendChild(document.createElement('td'));
    total.innerText = '$' + (+product.price)*(+product.quantity);

  }

  btnOrder.onclick = function () {
    var productIds = [];
    
    for(var product of cartArr) {
      for(var i = 1; i <= product.quantity; ++i){
        productIds.push(product.id);
      }
    }
    var body = {productIds,'totalPrice': sum};
    sendRequest('POST',urlServer+'orders',header,body);
    cartArr = [];
    localStorage.clear();
    tbody.innerHTML = '';    
    totalPrice.innerText = 'total price: $0';
  };

  function sendRequest(httpMethod, url, headers, body, cb) {

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (cb) cb(xhr.responseText);
    };

    xhr.open(httpMethod, url);

    if (headers) {
      for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
    
    xhr.send(JSON.stringify(body));
  }
};