const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalPrice: { type: Number },
});

module.exports = mongoose.model("Cart", cartSchema);
