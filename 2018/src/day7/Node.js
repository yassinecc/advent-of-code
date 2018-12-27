class Node {
  constructor(name) {
    this.name = name;
    this.isAvailable = false;
    this.isDone = false;
    this.parents = [];
    this.children = [];
  }

  updateStatus() {
    this.isAvailable = !this.parents.some(parent => !parent.isDone);
  }
}

module.exports = Node;
