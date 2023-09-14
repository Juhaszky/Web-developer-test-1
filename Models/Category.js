export class Category {
  id;
  constructor(id, products) {
    this.id = id;
    this.products = products;
    this.lastAskedProductNumber = 0;
  }

  modifyLastAskedProductNumber(amount) {
    this.lastAskedProductNumber += amount;
  }
}
