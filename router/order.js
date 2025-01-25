const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Route to show order details if payment is successful
router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({ orderId }).populate('customerId').populate('productId');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order status is success
        if (order.orderStatus !== 'Success') {
            return res.status(400).json({ message: 'Payment not completed or order pending' });
        }

        res.status(200).json({ 
            orderDetails: {
                orderId: order.orderId,
                customer: order.customerId.name,  // Assuming you have a name field in your user model
                product: order.productId.name,    // Assuming product has a name field
                quantity: order.quantity,
                totalPrice: order.totalPrice,
                deliveryDetails: order.deliveryDetails
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error });
    }
});

module.exports = router;
