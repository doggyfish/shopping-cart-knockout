// Product class is a simple Data bean
var Product;
Product = (function() {

  function Product(id, description, price) {
    this.id = id;
    this.description = description;
    this.price = price;
  }

  return Product;

})();

// Line Item in a shopping cart
var LineItem;
LineItem = (function() {

  function LineItem(product) {
    this.product = product;
    // Quantity will change as user adds items to the cart.
    // In order to get notifications about the value changes
    // this attribute needs special - e.g. observable
    this.quantity = ko.observable(1);
  }

  LineItem.prototype.changeQuantity = function(delta) {
    return this.quantity(this.quantity() + delta);
  };

  LineItem.prototype.subtotal = function() {
    return this.quantity() * this.product.price;
  };

  return LineItem;

})();

var ShoppingCart;
ShoppingCart = (function() {

  function ShoppingCart(productList) {
    // Items is an observable array which will notify as items
    // are added and removed from it
    this.items = ko.observableArray();
    this.productList = productList;
  }

  // When a product is added to a shopping cart
  // we are given only the product id
  // This method would be a method on a Product list if it weren't plain array
  // GENERATED by CoffeeScript
  ShoppingCart.prototype.findProduct = function(product_id) {
    var p, _i, _len, _ref;
    _ref = this.productList;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if (p.id === product_id) return p;
    }
    return null;
  };

  // Find whether the item with this product_id is already in the shopping cart
  // GENERATED by CoffeeScript
  ShoppingCart.prototype.findItem = function(product_id) {
    var i, _i, _len, _ref;
    _ref = this.items();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (i.product.id === product_id) return i;
    }
    return null;
  };

  ShoppingCart.prototype.addItem = function(product_id) {
    var item;
    item = this.findItem(product_id);
    if ((typeof(item) === "undefined") || (item == null)) {
      // such product is not in the cart yet
      item = new LineItem(this.findProduct(product_id));
      this.items.push(item);
    } else {
      // product is in the cart, just change quantity
      item.changeQuantity(1);
    }
  };

  // GENERATED by CoffeeScript
  ShoppingCart.prototype.total = function() {
    var item, sum, _i, _len, _ref;
    sum = 0;
    _ref = this.items();
    for (_i = 0, _len = _ref.length; _i < _len; ++_i) {
      item = _ref[_i];
      sum = sum + item.subtotal();
    }
    return sum;
  };

  // Because items need to be removed from the cart when quanity is zero
  // both increment and decrement methods are defined on the cart istead of the LineItem
  ShoppingCart.prototype.increment = function(item) {
    item.changeQuantity(1);
  };

  // Because items need to be removed from the cart when quanity is zero
  // both increment and decrement methods are defined on the cart istead of the LineItem
  ShoppingCart.prototype.decrement = function(item) {
    item.changeQuantity(-1);
    if (item.quantity() === 0) {
      this.items.remove(item);
    }
  };

  ShoppingCart.prototype.removeAll = function(item) {
    this.items.removeAll();
  };

  return ShoppingCart;

})();

// This is our all-encompassing data bean
var DataModel;
DataModel = (function() {

  function DataModel() {
    this.productList = [
      new Product("item_0", "Product 0", 100.0),
      new Product("item_1", "Product 1", 110.0),
      new Product("item_2", "Product 2", 120.0)];

    this.shoppingCart = new ShoppingCart(this.productList);
  }

  return DataModel;

})();

var dataModel;
dataModel = new DataModel();