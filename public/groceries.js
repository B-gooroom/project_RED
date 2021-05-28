// const url = new URL(window.location);
// const queryString = url.searchParams;
// const q = queryString.get('q');
// const orderName = queryString.get('orderName') || 'name';
// const orderType = queryString.get('orderType') || 'asc';
// if (document.getElementById(orderName + '-' + orderType)) {
//   document.getElementById(orderName + '-' + orderType).classList.add('active');
// }

const groceriesCreate = function () {
  const grocery = {
    name: document.getElementsByName('grocery-name')[0].value,
    enter: moment().format('YYYY-MM-DD'),
    expire: moment().add(14, 'days').format('YYYY-MM-DD')
  };
  axios.post('https://be-gooroom-default-rtdb.firebaseio.com/groceries.json', grocery).then(function (response) {
    console.log('Done groceriesCreate', response.data);
    groceriesRead();
  });
};

const itemsCreate = function (index) {
  // const item = {
  //   name: document.getElementsByName('groceries-name')[index].innerHTML,
  //   enter: document.getElementsByName('groceries-enter')[index].innerHTML,
  //   expire: document.getElementsByName('groceries-expire')[index].value
  // };
  debugger
  const groceryUpdate = {}
  groceryUpdate[document.getElementsByName('groceries-key')[index].value] = {
    name: document.getElementsByName('groceries-name')[index].innerHTML,
    enter: document.getElementsByName('groceries-enter')[index].innerHTML,
    expire: document.getElementsByName('groceries-expire')[index].value
  };
  axios.patch('https://be-gooroom-default-rtdb.firebaseio.com/items.json', groceryUpdate).then(function (response) {
    console.log('Done itemsCreate', response.data);
  });
};

const groceriesRead = function () {
  axios.get('https://be-gooroom-default-rtdb.firebaseio.com/groceries.json').then(function (response) {
    console.log('Done groceriesRead', response.data);
    let groceries = response.data;
    const tbody = document.getElementById('tbody-groceries');
    tbody.innerHTML = '';
    for (let key in groceries) {
      const grocery = groceries[key];
      grocery.k = key
    }
    groceries = _.orderBy(groceries, orderName, orderType);
    console.log(groceries);
    let index = 0;
    for (let key in groceries) {
      debugger
      const grocery = groceries[key];
      const tr = document.getElementById('tr-template-groceries').cloneNode(true);
      tbody.appendChild(tr);
      document.getElementsByName('groceries-name')[index].innerHTML = grocery.name;
      document.getElementsByName('groceries-enter')[index].innerHTML = grocery.enter;
      document.getElementsByName('groceries-expire')[index].value = grocery.expire;
      document.getElementsByName('groceries-key')[index].value = grocery.k;
      document.getElementsByName('groceries-expire')[index].index = index;
      document.getElementsByName('groceries-delete')[index].index = index;
      document.getElementsByName('items-create')[index].index = index;
      index++;
    }
  });
};

const groceriesDelete = function (index) {
  const key = document.getElementsByName('groceries-key')[index].value;
  axios.delete('https://be-gooroom-default-rtdb.firebaseio.com/groceries/' + key + '.json').then(function (response) {
    console.log('Done groceriesDelete', response.data);
    groceriesRead();
  });
};

const groceriesUpdate = function (index) {
  const groceryUpdate = {}
  groceryUpdate[document.getElementsByName('groceries-key')[index].value] = {
    name: document.getElementsByName('groceries-name')[index].innerHTML,
    enter: document.getElementsByName('groceries-enter')[index].innerHTML,
    expire: document.getElementsByName('groceries-expire')[index].value

  };
  axios.patch('https://be-gooroom-default-rtdb.firebaseio.com/groceries.json', groceryUpdate).then(function (response) {
    console.log('Done groceriesUpdate', response.data);
    groceriesRead();
  });
};
groceriesRead();
// itemsRead('groceries');