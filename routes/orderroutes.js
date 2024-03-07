const express = require('express');
const OrderModel = require('../model/order');
const app = express.Router();

app.use(express.json());

// Route to create a new order
app.post('/createorder', async (req, res) => {
  try {
    const { userId, petcode } = req.body;

    // Validate userId and petcode before proceeding
    // You might want to add additional validation logic here

    const newOrder = new OrderModel({
      user: userId,
      petcode,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get orders by userId
app.get('/orders/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Validate userId before proceeding
      // You might want to add additional validation logic here
  
      const orders = await OrderModel.find({ user: userId }).populate('user', 'username');
  
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// // Route to get all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await OrderModel.find().populate('user', 'username'); // Populate user details

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Additional routes or modifications based on your requirements

module.exports = app;
