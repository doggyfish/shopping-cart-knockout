// A class with an array of items, provides ability to add/remove items, calculate total
define(
  ['CartItemData'],
  function(CartItemData) {
    var ShoppingCartData;
    ShoppingCartData = (
      function() {
      
        function ShoppingCartData() {
          // Items is an observable array which will notify as items
          // are added and removed from it
          this.items = ko.observableArray();
        }
      
        // Find whether the item with this product_id is already in the shopping cart
        // GENERATED by CoffeeScript
        ShoppingCartData.prototype.findItem = function(product_id) {
          var i, _i, _len, _ref;
          _ref = this.items();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i.product.id === product_id) return i;
          }
          return null;
        };
      
        ShoppingCartData.prototype.addItem = function(product) {
          var item = this.findItem(product.id);
          if ((typeof(item) === "undefined") || (item == null)) {
            // such product is not in the cart yet
            item = new CartItemData(product);
            this.items.push(item);
          } else {
            // product is in the cart, just change quantity
            item.changeQuantity(1);
          }
        };
      
        // GENERATED by CoffeeScript
        ShoppingCartData.prototype.total = function() {
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
        ShoppingCartData.prototype.increment = function(item) {
          item.changeQuantity(1);
        };
      
        // Because items need to be removed from the cart when quanity is zero
        // both increment and decrement methods are defined on the cart istead of the LineItem
        ShoppingCartData.prototype.decrement = function(item) {
          item.changeQuantity(-1);
          if (item.quantity() === 0) {
            this.items.remove(item);
          }
        };
      
        ShoppingCartData.prototype.removeAll = function(item) {
          this.items.removeAll();
        };
        
        ShoppingCartData.prototype.isEmpty = function() {
          return (this.items().length === 0);
        };

      
        return ShoppingCartData;
      }
    )();
    
    return ShoppingCartData;
  }
);