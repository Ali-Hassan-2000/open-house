const express = require('express');
const router = express.Router();

const Listing = require('../models/listing');

router.get('/', async (req, res) => {
  try {
    const populatedListings = await Listing.find({}).populate('owner');
    //console.log('Populated Listings:', populatedListings);
    
    res.render('listings/index.ejs', {
        listings: populatedListings,
    });
  
    } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
    res.render('listings/new.ejs');
});

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id;
  await Listing.create(req.body);
  res.redirect('/listings');
});

router.get('/:listingId', async (req, res) => {
  try {
    const populatedListings = await Listing.findById(req.params.listingId).populate('owner');

    res.render('listings/show.ejs', {
      listing: populatedListings,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:listingId', async (req, res) => {
  try{
    const deleteListing = await Listing.findById(req.params.listingId);
    
    if (deleteListing.owner.equals(req.session.user._id)) { // only owner can delete its listing
      
      await deleteListing.deleteOne();
      res.redirect('/listings');

    } else {
      res.send("You don't have permission to do that.");
    }
  
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/:listingId/edit', async (req, res) => {
  try {
    const currentListing = await Listing.findById(req.params.listingId);
    res.render('listings/edit.ejs', {
      listing: currentListing,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:listingId', async (req, res) => {
  try{
    const currentListing = await Listing.findById(req.params.listingId);
    await currentListing.updateOne(req.body);
    res.redirect('/listings');
  }
  catch (error){
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;