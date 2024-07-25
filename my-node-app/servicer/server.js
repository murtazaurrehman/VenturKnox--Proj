const express = require('express');
const knex = require('knex')(require('./knexfile').development);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await knex('users').select('*');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to add a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    await knex('users').insert({ name, email });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
