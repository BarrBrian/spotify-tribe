const fetch = require('node-fetch');
const UserSettings = require('../models/mainModel.js')
const multiparty = require('multiparty')

const settingsController = {};



settingsController.createInitialSettings = (req, res, next) => {
  
  console.log('Checking Settings DB for', res.locals.username);
  
  UserSettings.exists({ username: res.locals.username })
    .then(exists => {
      console.log(`does ${res.locals.username} exisit?`, exists);
      if(exists) return next();
      
      console.log('They don\'t exist so we will add them');

      const initialSettings = {
        username: res.locals.username,
        profile_layout: [
          { widget_name : 'TopArtists', options: {} },
          { widget_name: 'TopRecentSongs', options: {}}
        ]
      }

      UserSettings.create(initialSettings)
        .then(() => {
          console.log('user added');
          return next()
        })
    })
    .catch(err => next({
      message: {err: 'error in settingsController.createInitialSettings'},
      log: `error in settingsController.createInitialSettings ERROR: ${err}`
    }))
}
  

settingsController.updateSettings = (req, res, next) => {

  const newSettings = {
    profile_layout: [
      { widget_name : req.body.widgetOne, options: {} },
      { widget_name: req.body.widgetTwo, options: {}}
    ]
  }

  if(req.body.featuredPlayerUri){
    newSettings.featured_playlist = {
      active: true,
      uri: req.body.featuredPlayerUri,
    }
  }else{
    newSettings.featured_playlist ={
      active: false,
      uri: null,
    }
  }

  console.log( {...newSettings } )
  console.log(req.params.username);

  UserSettings.updateOne({ username : req.params.username }, { $set: { ...newSettings } } )
    .then(() => next())
    .catch(err => next({
      message: {err: 'error in settingsController.updateSettings'},
      log: `error in settingsController.updateSettings ERROR: ${err}`
    }))

};


  



settingsController.retrieveSettings = (req, res, next) => {
  UserSettings.findOne( { username : req.params.username } )
    .then(data => {
      res.locals.userSettings = data;
      console.log(data);
      return next();
    })
    .catch(err => next({
      message: {err: 'error in settingsController.retrieveSettings'},
      log: `error in settingsController.retrieveSettings ERROR: ${err}`
    }))
    
    
}

module.exports = settingsController;