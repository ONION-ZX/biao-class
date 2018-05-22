class Task extends Base {
  constructor(max_id, list) {
    super(max_id, list);
  }

  add() {
    console.log('my add');
    this.$add();
  }

  remove() {
    console.log('my remove');
    this.$remove();
  }

  update() {
    console.log('my update');
    this.$update();
  }

  read() {
    console.log('my read');
    this.$read();
  }
}
