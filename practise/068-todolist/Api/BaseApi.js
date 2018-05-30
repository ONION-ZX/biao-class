window.BaseApi = BaseApi;

function BaseApi() {
  this.default_list = [];
  this.default_max_id = 0;
  this.reverse_direction = false;
  this.on_sync = null;
}

BaseApi.prototype.$add = add;
BaseApi.prototype.$remove = remove;
BaseApi.prototype.$update = update;
BaseApi.prototype.$read = read;
BaseApi.prototype.$find = find;
BaseApi.prototype.sync_to   = sync_to;
BaseApi.prototype.sync_from = sync_from;
BaseApi.prototype.load_data = load_data;
// BaseApi.prototype.$get_item = get_item;

function load_data() {
  this.sync_from();
}

function add(row) {
    this.max_id = this.max_id + 1;
    row.id = this.max_id;
    if(this.reverse_direction)
      this.list.push(row);
    else
      this.list.unshift(row);
    this.sync_to();
    store.set(this._model_name + '-max_id', this.max_id);
}

function remove(id) {
  var index = find_index_by_id(this.list, id);

  if (index < 0)
    return;

  this.list.splice(index, 1);
  this.sync_to();
}

function update(id, new_row) {
  var index = find_index_by_id(this.list, id);

  if (index < 0)
    return;

  delete new_row.id;

  var old_row = this.list[index];
  this.list[index] = Object.assign({}, old_row, new_row);
  this.sync_to();
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

function sync_from () {
  var old_list = store.get(this._model_name + '-list');
  if (!old_list || !old_list.length) {
    this.list = this.default_list;
  } else {
    this.list = old_list;
  }

  this.max_id  = store.get(this._model_name + '-max_id') || this.default_max_id;
}

function sync_to () {
  store.set(this._model_name + '-list', this.list || this.default_list);
  store.set(this._model_name + '-max_id', this.max_id || this.default_max_id);
  if (this.on_sync)
    this.on_sync(this.list, this.max_id);
}
