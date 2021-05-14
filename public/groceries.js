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

const groceriesRead = function () {
  axios.get('https://be-gooroom-default-rtdb.firebaseio.com/groceries.json').then(function (response) {
    console.log('Done groceriesRead', response.data);
    const groceries = response.data;
    const tbody = document.getElementById('tbody-groceries');
    tbody.innerHTML = '';
    let index = 0;
    for (let key in groceries) {
      const grocery = groceries[key];
      const tr = document.getElementById('tr-template-groceries').cloneNode(true);
      tbody.appendChild(tr);
      document.getElementsByName('groceries-name')[index].innerHTML = grocery.name;
      document.getElementsByName('groceries-enter')[index].innerHTML = grocery.enter;
      document.getElementsByName('groceries-expire')[index].value = grocery.expire;
      document.getElementsByName('groceries-key')[index].value = key;
      document.getElementsByName('groceries-expire')[index].index = index;
      document.getElementsByName('groceries-delete')[index].index = index;
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