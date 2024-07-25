const express = require('express');
const Menu = require('../models/Menu');

const router = express.Router();

// Route to get the menu item
router.get('/', async (req, res) => {
  try {
    const menuItem = await Menu.query().first();
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to create or update the menu item
router.post('/', async (req, res) => {
  const { item_name, price, description } = req.body;

  if (!item_name || !price) {
    return res.status(400).json({ message: 'Item name and price are required' });
  }

  try {
    let menuItem = await Menu.query().first();
    if (menuItem) {
      menuItem = await Menu.query().patchAndFetchById(menuItem.item_id, { item_name, price, description });
      res.status(200).json({ message: 'Menu item updated successfully', menuItem });
    } else {
      menuItem = await Menu.query().insert({ item_name, price, description });
      res.status(201).json({ message: 'Menu item created successfully', menuItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to partially update the menu item
router.patch('/', async (req, res) => {
  const { item_name, price, description } = req.body;

  if (!item_name && !price && !description) {
    return res.status(400).json({ message: 'At least one field (item_name, price, or description) is required for update' });
  }

  try {
    const menuItem = await Menu.query().first();
    if (menuItem) {
      const updatedItem = await Menu.query().patchAndFetchById(menuItem.item_id, { item_name, price, description });
      res.status(200).json({ message: 'Menu item partially updated successfully', updatedItem });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete the menu item
router.delete('/', async (req, res) => {
  try {
    const menuItem = await Menu.query().first();
    if (menuItem) {
      await Menu.query().deleteById(menuItem.item_id);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
