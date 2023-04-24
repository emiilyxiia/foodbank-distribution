const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database hosted on the cloud
mongoose.connect('mongodb+srv://sg7401:HackMS23@cluster1.cooabcp.mongodb.net/Partner_Info?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create a schema for user login credentials
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Create a model for the "Login" collection within the "Partner_Info" database
const User = mongoose.model('logins', userSchema);

// Define a GET endpoint for handling user login requests
app.get('/logins', async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  // Look for a user with the specified email and password in the "Login" collection
  const user = await User.findOne({ email, password });

  if (user) {
    console.log('Login successful');
    res.send('Login successful');
  } else {
    console.log('Invalid email or password');
    res.send('Invalid email or password');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
