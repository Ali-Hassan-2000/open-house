const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');


router.get('/profile', async (req, res) => {
  try {
    console.log('user: ', req.session.user);
    res.send('Profile page');
  } catch (error) {
    console.log(error);
  }
});





module.exports = router;