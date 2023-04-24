const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database hosted on the cloud
mongoose.connect('mongodb+srv://sg7401:HackMS23@cluster1.cooabcp.mongodb.net/Partner_Info?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create a schema for user login credentials
const userSchema = new mongoose.Schema({
  messages: String
});

// Create a model for the "Items" collection within the "Partner_Info" database
const User = mongoose.model('forum', userSchema, 'forum');

// User.create({
//   messages: "View available inventory, place orders, set pick-up times and more through the portal"
// }).then(() => {
//   console.log('Data inserted successfully!');
// })
// .catch(err => {
//   console.error('Error inserting data:', err);
// });

//Define a GET endpoint for handling user login requests
app.get('/forum', async (req, res) => {
    const messages = req.query.messages;
  
    // Look for a user with the specified credentials in the "Items" collection
    const user = await User.findOne({ messages });
  
    if (user) {
      console.log('Valid Details');
      res.send('Valid Details');
    } else {
      console.log('Invalid details');
      res.send('Invalid details');
    }
  });
  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
