function find_and_delete(arr, element) {
  var shit_index = arr.indexOf(element);
  //如果删除失败 直接返回
  if (shit_index == -1)
    return false;

  arr.splice(shit_index, 1);
  return true;
}

module.exports = {
  find_and_delete: find_and_delete,
}
