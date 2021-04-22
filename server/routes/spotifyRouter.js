  
const express = require('express');
const router = express.Router();
const spotifyController = require('../controller/spotifyController');
const authController = require('../controller/authController.js');

router.get('/', authController.getSpotifyTokenFromDB, spotifyController.apiRequest, (req, res) => {
  // console.log(res.locals.data);
  res.status(200).json(res.locals.data);
});



module.exports = router;