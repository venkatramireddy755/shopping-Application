const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderId: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the customer
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the product
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderStatus: { type: String, default: 'Pending' }, // Status could be "Pending", "Shipped", "Delivered", etc.
    deliveryDetails: {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
