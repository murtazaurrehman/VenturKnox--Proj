const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Route to create a new order
router.post('/', async (req, res) => {
  const { table_number, order_status, taken_by, taken_at } = req.body;

  if (table_number === undefined || !order_status || taken_by === undefined) {
    return res.status(400).json({ message: 'Table number, order status, and taken by are required' });
  }

  try {
    const newOrder = await Order.query().insert({
      table_number,
      order_status,
      taken_by,
      taken_at
    });
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to cancel an order
router.patch('/cancel/:order_id', async (req, res) => {
  const { order_id } = req.params;

  try {
    const order = await Order.query().findById(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.query().patchAndFetchById(order_id, { order_status: 'canceled' });
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update an order
router.patch('/:order_id', async (req, res) => {
  const { order_id } = req.params;
  const { table_number, order_status, taken_by, taken_at } = req.body;

  if (!table_number && !order_status && taken_by === undefined && !taken_at) {
    return res.status(400).json({ message: 'At least one field (table_number, order_status, taken_by, taken_at) is required for update' });
  }

  try {
    const order = await Order.query().findById(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updatedOrder = await Order.query().patchAndFetchById(order_id, { table_number, order_status, taken_by, taken_at });
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get an order by ID
router.get('/:order_id', async (req, res) => {
  const { order_id } = req.params;

  try {
    const order = await Order.query().findById(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.query();
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
