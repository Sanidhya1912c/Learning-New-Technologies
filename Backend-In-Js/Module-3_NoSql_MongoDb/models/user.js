const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartPorductIndex = this.cart.items.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartPorductIndex >= 0) {
    newQuantity = this.cart.items[cartPorductIndex].quantity + 1;
    updatedCartItems[cartPorductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (productId) {
  const cartPorductIndex = this.cart.items.findIndex(
    (cp) => cp.productId.toString() === productId.toString()
  );
  const cartProductItem = this.cart.items[cartPorductIndex];

  console.log("cart item ", cartProductItem);

  const updatedCartItems = [...this.cart.items];
  if (cartPorductIndex >= 0) {
    if (cartProductItem.quantity > 1) {
      updatedCartItems[cartPorductIndex].quantity =
        cartProductItem.quantity - 1;
    } else {
      updatedCartItems.splice(cartPorductIndex, 1);
    }
  }

  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.addOrder = function () {
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
