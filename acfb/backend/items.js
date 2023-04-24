const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database hosted on the cloud
mongoose.connect('mongodb+srv://sg7401:HackMS23@cluster1.cooabcp.mongodb.net/Partner_Info?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create a schema for user login credentials
const userSchema = new mongoose.Schema({
  item: String,
  description: String,
  pkg_info : String,
  storage : String,
  qty_avail : Number,
  unit_price : Number,
  limit : Number,
  min : Number,
  nutrition : Number
});

// Create a model for the "Items" collection within the "Partner_Info" database
const User = mongoose.model('items', userSchema, 'items');

// User.create({
//   item: "33452",
//   description: "Olive oil",
//   pkg_info: "2lb",
//   storage: "DR",
//   qty_avail: 67,
//   unit_price: 2.50,
//   limit: 7,
//   min: 0,
//   expire_date : "09/20/23",
//   nutrition : 2
// }).then(() => {
//   console.log('Data inserted successfully!');
// })
// .catch(err => {
//   console.error('Error inserting data:', err);
// });

//Define a GET endpoint for handling user login requests
app.get('/items', async (req, res) => {
  const item = req.query.item;
  const description = req.query.description;
  const pkg_info = req.query.pkg_info;
  const storage = req.query.storage;
  const qty_avail = req.query.qty_avail;
  const unit_price = req.query.unit_price;
  const limit = req.query.limit;
  const min = req.query.min;
  const nutrition = req.query.nutrition;

  // Look for a user with the specified credentials in the "Items" collection
  const user = await User.findOne({ item, description, pkg_info, storage, qty_avail, 
    unit_price, limit, min, nutrition});

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
