const fetch = require('node-fetch');

const spotifyController = {};

spotifyController.apiRequest = (req, res, next) => {
  //this is unsafe because it allows outsiders to write custom queries. But it's much faster for MVP
  console.log('requesting...', req.query.q);
  fetch(req.query.q, {
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${res.locals.authToken}`
    }
  })
  .then(data => data.json())
  .then(data => {
    res.locals.data = data;
    return next()
  })
}

module.exports = spotifyController;