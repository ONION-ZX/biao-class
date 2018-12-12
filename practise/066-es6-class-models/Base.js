class Base {
  constructor(max_id, list) {
    this.max_id = max_id || 1;
    this.list = list;
  }
  yo() {
    console.log('YO.');
  }
  
  $add() {
    console.log('base add');
  }
  
  $remove() {
    console.log('base remove');
  }
  
  $update() {
    console.log('case update');
  }
  
  $read() {
    console.log('base read');
  }  
}
