

const itemsRead = function () {
  axios.get('https://be-gooroom-default-rtdb.firebaseio.com/items.json').then(function (response) {
    console.log('Done itemsRead', response.data);
    const items = response.data;
    const tbody = document.getElementById('tbody-items');
    tbody.innerHTML = '';
    let index = 0;
    for (let key in items) {
      const item = items[key];
      const tr = document.getElementById('tr-template-items').cloneNode(true);
      tbody.appendChild(tr);
      document.getElementsByName('items-name')[index].innerHTML = item.name;
      document.getElementsByName('items-enter')[index].innerHTML = item.enter;
      document.getElementsByName('items-expire')[index].value = item.expire;
      document.getElementsByName('items-key')[index].value = key;
      document.getElementsByName('items-expire')[index].index = index;
      document.getElementsByName('items-delete')[index].index = index;
      index++;
    }
  });
};

const itemsDelete = function (index) {
  const key = document.getElementsByName('items-key')[index].value;
  axios.delete('https://be-gooroom-default-rtdb.firebaseio.com/items/' + key + '.json').then(function (response) {
    console.log('Done itemsDelete', response.data);
    itemsRead();
  });
};

const itemsUpdate = function (index) {
  const itemUpdate = {}
  itemUpdate[document.getElementsByName('items-key')[index].value] = {
    name: document.getElementsByName('items-name')[index].innerHTML,
    enter: document.getElementsByName('items-enter')[index].innerHTML,
    expire: document.getElementsByName('items-expire')[index].value

  };
  axios.patch('https://be-gooroom-default-rtdb.firebaseio.com/items.json', itemUpdate).then(function (response) {
    console.log('Done itemsUpdate', response.data);
    itemsRead();
  });
};
itemsRead();