function TodoModel(list,max_id) {
  this.max_id = max_id || 1;
  this.list = list || [];
}

TodoModel.prototype.add = add;
TodoModel.prototype.remove = remove;
TodoModel.prototype.update = update;
TodoModel.prototype.read = read;

var todo_list = [
  { // 0
    id: 100,
    name: '买菜',
    remind_at: '2020...',
    completed: false,
  },
  { // 1
    id: 101,
    name: '洗菜',
    remind_at: '2020-10-01 20:20:02',
    completed: false,
  },
];

function add(row) {
  this.max_id = this.max_id + 1;
  row.id = this.max_id;
  todo_list.push(row);
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

var todo = new TodoModel(todo_list,101);

todo.remove(101);
todo.update(100,{
  id:1,
  completed: true,
  yo: 1,
});

console.log(todo.read());
