  
const express = require('express');
const router = express.Router();
const settingsController = require('../controller/settingsController.js');

router.post('/:username', settingsController.updateSettings, (req, res) => {
  
  res.status(200).redirect(`/settings/${req.params.username}`);
});

router.get('/get/:username', settingsController.retrieveSettings, (req, res) => {

  res.status(200).json(res.locals.userSettings);
})


module.exports = router;