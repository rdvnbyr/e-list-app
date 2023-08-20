
export class Product {
  constructor(product) {
    const {name, price, description} = product;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}