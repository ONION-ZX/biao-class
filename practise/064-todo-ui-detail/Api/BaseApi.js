window.BaseApi = BaseApi;

function BaseApi(list) {
  if(!list)
    throw 'list is required';

  this.list = list;
}

BaseApi.prototype.add = add;
BaseApi.prototype.remove = remove;
BaseApi.prototype.update = update;
BaseApi.prototype.read = read;

function add(row) {
  this.max_id = this.max_id + 1;
  row.id = this.max_id;
  this.list.push(row);
}

function remove(id) {
  var index = find_index_by_id(this.list,id);

  if(index < 0)
    return;
  this.list.splice(index,1);
}

function update(id,new_row) {
  var index = find_index_by_id(this.list,id);

  if(index < 0)
    return;

  delete new_row.id;

  var old_row = this.list[index];
  this.list[index] = Object.assign({},old_row,new_row);
}

function read(id) {
  if(id)
    return find_by_id(this.list,id);
  return this.list;
}

function find_index_by_id(arr,id) {
  return arr.findIndex(function(row) {
    return row.id == id;
  });
}

function find_by_id(arr,id) {
  return arr.find(function(row) {
    return row.id == id;
  });
}
