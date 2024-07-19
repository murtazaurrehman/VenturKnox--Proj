const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    // Check if user exists
    const user = await User.query().findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

   // Compare passwords
   const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
     return res.status(401).json({ message: 'Invalid email or password' });
   }

   // JWT token and middleware logic removed temporarily

   res.json({ message: 'Login successful, but token generation is disabled temporarily.' });
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: 'Server error' });
 }
};