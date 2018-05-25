window.BaseApi = BaseApi;

function BaseApi(list, max_id) {
  this.max_id = max_id || 1;
  this.list = list;
}

BaseApi.prototype.$add = add;
BaseApi.prototype.$remove = remove;
BaseApi.prototype.$update = update;
BaseApi.prototype.$read = read;
BaseApi.prototype.$find = find;
// BaseApi.prototype.$get_item = get_item;

function add(row) {
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

  /*删除更新数据中的id，防止id被覆盖（id用于绝对定位，一旦生成不可修改）*/
  delete new_row.id;

  var old_row = this.list[index];
  this.list[index] = Object.assign({}, old_row, new_row);
}

//拿到所有数据
function read() {
  return this.list;
}

//通过id找一行数据
function find(id) {
  return find_by_id(this.list, id);
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
