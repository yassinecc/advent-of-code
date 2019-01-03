class Cell {
  constructor(name) {
    this.name = name;
    this.isAvailable = false;
    this.isProcessing = false;
    this.isDone = false;
    this.parents = [];
    this.children = [];
    this.metadata = [];
  }

  updateStatus() {
    this.isAvailable = !this.parents.some(parent => !parent.isDone);
  }
}

module.exports = Cell;
