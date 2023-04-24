const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database hosted on the cloud
mongoose.connect('mongodb+srv://sg7401:HackMS23@cluster1.cooabcp.mongodb.net/Partner_Info?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create a schema for user login credentials
const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  zip : Number,
  rep_name : String,
  contact : Number,
  emailid : String,
  storage_cap : Number,
  no_of_successful_deliveries : Number
});

// Create a model for the "Items" collection within the "Partner_Info" database
const User = mongoose.model('partners', userSchema, 'partners');


// User.create({
//   name: "QQW",
//   location: "7777 Atlantic Avenue, Brooklyn, NY 11208",
//   zip: 11208,
//   rep_name: "JKL",
//   contact: 222333444,
//   emailid: "example2@hotmail.com",
//   storage_cap: 223,
//   no_of_successful_deliveries: 675
// }).then(() => {
//   console.log('Data inserted successfully!');
// })
// .catch(err => {
//   console.error('Error inserting data:', err);
// });

//Define a GET endpoint for handling user login requests
app.get('/partners', async (req, res) => {
  const name = req.query.name;
  const location = req.query.location;
  const zip = req.query.zip;
  const rep_name = req.query.rep_name;
  const contact = req.query.contact;
  const emailid = req.query.emailid;
  const storage_cap = req.query.storage_cap;
  const no_of_successful_deliveries = req.query.no_of_successful_deliveries;

  // Look for a user with the specified credentials in the "Items" collection
  const user = await User.findOne({ name, location, zip, rep_name, 
    contact, emailid, storage_cap, no_of_successful_deliveries});

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


