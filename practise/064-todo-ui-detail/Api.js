window.Api = Api;

function Api(list, max_id) {
  this.max_id = max_id || 1;
  this.list = list;
  this.list = [
    { // 0
      id: 100,
      title: '买菜',
      remind_at: '2020...',
      completed: false,
    },
    { // 1
      id: 101,
      title: '洗菜',
      remind_at: '2020-10-01 20:20:02',
      completed: false,
    },
  ];
}

Api.prototype.add = add;
Api.prototype.remove = remove;
Api.prototype.update = update;
Api.prototype.read = read;

/*增*/
function add(row) {
  // if (strings.replace(/(^s*)|(s*$)/g, "").length ==0)
  if(!row.title || row.title.indexOf(" ") !== -1)
    return;
  this.max_id = this.max_id + 1;
  row.id = this.max_id;
  this.list.push(row);
}

function remove(id) {
  var index = find_index_by_id(this.list, id);

  if (index < 0)
    return;

  this.list.splice(index, 1);
}

function update(id, new_row) {
  var index = find_index_by_id(this.list, id);

  if (index < 0)
    return;

  delete new_row.id;

  var old_row = this.list[index];
  this.list[index] = Object.assign({}, old_row, new_row);
}


/*查*/
function read(id) {
  if (id)
    return find_by_id(this.list, id);

  return this.list;
}

function find_index_by_id(arr, id) {
  return arr.findIndex(function (row) {
    return row.id == id;
  });
}

function find_by_id(arr, id) {
  return arr.find(function (row) {
    return row.id == id;
  });
}
