const mongoose = require('mongoose');

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
const Login = mongoose.connection.db.collection('Login');

// Insert a new document into the "Login" collection
const email = 'johndoe@example.com';
const password = 'password123';
Login.insertOne({ email, password })
  .then(() => console.log('Document inserted'))
  .catch(err => console.error('Error inserting document:', err));

// Look for a user with the specified email and password in the "Login" collection
Login.findOne({ email, password })
  .then(user => {
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }
  })
  .catch(err => console.error('Error finding user:', err));
