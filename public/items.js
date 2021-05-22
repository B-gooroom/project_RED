const url = new URL(window.location);
const queryString = url.searchParams;
const q = queryString.get('q');
const orderName = queryString.get('orderName') || 'name';
const orderType = queryString.get('orderType') || 'asc';
document.getElementById(orderName + '-' + orderType).classList.add('active');

const itemsRead = function () {
  axios.get('https://be-gooroom-default-rtdb.firebaseio.com/items.json').then(function (response) {
    console.log('Done itemsRead', response.data);
    let items = response.data;
    const tbody = document.getElementById('tbody-items');
    tbody.innerHTML = '';
    for (let key in items) {
      const item = items[key];
      item.k = key
    }
    items = _.orderBy(items, orderName, orderType);
    console.log(items)
    let index = 0;
    let count = 0;
    for (let key in items) {
      const item = items[key];
      if (moment().format('YYYY-MM-DD') > item.expire) count++;
      if (q && item.name.indexOf(q) < 0) continue;
      const tr = document.getElementById('tr-template-items').cloneNode(true);
      tbody.appendChild(tr);
      document.getElementsByName('items-number')[index].innerHTML = index + 1;
      document.getElementsByName('items-name')[index].innerHTML = item.name;
      document.getElementsByName('items-enter')[index].innerHTML = item.enter;
      document.getElementsByName('items-expire')[index].innerHTML = item.expire;
      document.getElementsByName('items-key')[index].value = item.k;
      document.getElementsByName('items-expire')[index].index = index;
      document.getElementsByName('items-update')[index].index = index;
      document.getElementsByName('items-delete')[index].index = index;
      index++;
    }
    document.getElementById('menu-items-couter').innerHTML = count
  });
};

const itemsDelete = function (index) {
  const key = document.getElementsByName('items-key')[index].value;
  axios.delete('https://be-gooroom-default-rtdb.firebaseio.com/items/' + key + '.json').then(function (response) {
    console.log('Done itemsDelete', response.data);
    itemsRead();
  });
};

const itemsUpdate = function () {
  const itemUpdate = {}
  itemUpdate[document.getElementsByName('items-key')[window.index].value] = {
    name: document.getElementsByName('item-name')[0].value,
    enter: document.getElementsByName('item-enter')[0].value,
    expire: document.getElementsByName('item-expire')[0].value

  };
  axios.patch('https://be-gooroom-default-rtdb.firebaseio.com/items.json', itemUpdate).then(function (response) {
    console.log('Done itemsUpdate', response.data);
    itemsRead();
    modalToggle();
  });
};
itemsRead();