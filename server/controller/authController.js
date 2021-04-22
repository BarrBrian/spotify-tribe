require('dotenv').config();
const db = require('../models/pgPool');
const spotifyCallbackURI = 'http://localhost:3000/callback';
const spotifyClientId = '8f48d471fce74b5db4b386614dc36903';
const spotifySecret = process.env.SPOTIFY_SECRET;
const fetch = require('node-fetch');

const authController = {};

authController.getAuthToken = (req, res, next) => {
  console.log('getting access token');

  fetch('https://accounts.spotify.com/api/token' + 
    '?grant_type=authorization_code' + 
    '&code=' + encodeURIComponent(req.query.code) + 
    '&redirect_uri=' + encodeURIComponent(spotifyCallbackURI) +
    '&client_id=' + encodeURIComponent(spotifyClientId) + 
    '&client_secret=' + encodeURIComponent(spotifySecret),
    { method: 'POST',
      headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
    })
    .then(data => data.json())
    .then(d => {
      console.log(d);
      // I need to add timezone math to this table later for reauth checks
      const accessParams = [d.access_token, d.token_type, d.scope, d.expires_in, d.refresh_token];
      const accessQuery = `INSERT INTO users 
      (access_token, token_type, scope, token_life_seconds, refresh_token)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, access_token;`;
      return db.query(accessQuery, accessParams)
    })
    .then(queryResult =>{
      res.locals.userId = queryResult.rows[0].id;
      res.locals.authToken = queryResult.rows[0].access_token
      console.log(res.locals);
      return next();
    })
    .catch(err => next({
      message: {err: 'error in authController.getAuthToken'},
      log: `error in authController.getAuthToken ERROR: ${err}`
    }))
};

authController.getUserInfo = (req, res, next) => {
  console.log('getting user info')
  fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${res.locals.authToken}`
    }
  })
  .then(data => data.json())
  .then(u => { 
    console.log(u);
    res.locals.username = u.id;
    const updateParams = [u.id, u.display_name, u.email, u.external_urls.spotify, u.href, u.uri, res.locals.userId];
    const updateQuery = `UPDATE users 
    SET username = $1, display_name = $2, email = $3, spotify_url = $4, 
    api_href = $5, uri = $6, token_set_time = ${~~(Date.now() / 1000)}
    WHERE id = $7
    RETURNING *;`;
    
    return db.query(updateQuery,updateParams)
  })
  .then(() => next())
  .catch(err => next({
    message: {err: 'error in authController.getUserInfo'},
    log: `error in authController.getUserInfo ERROR: ${err}`
  }))
}

authController.getSpotifyTokenFromDB = (req, res, next) => {
  const queryParams = [req.query.user]
  const query = `SELECT access_token, refresh_token, token_life_seconds, token_set_time
  FROM users WHERE username = $1`

  return db.query(query, queryParams)
    .then(data => {
      const { access_token, refresh_token, token_life_seconds, token_set_time } = data.rows[0]
      const timeNow = ~~(Date.now() / 1000)
      if (token_set_time + token_life_seconds < timeNow){
        res.locals.refreshToken = refresh_token;
        authController.getAuthToken(req, res, next);
      } 
      else {
        res.locals.authToken = access_token;
        next();
      }
    })
    .catch(err => next({
      message: {err: 'error in authController.getSpotifyTokenFromDB'},
      log: `error in authController.getSpotifyTokenFromDB ERROR: ${err}`
    }))

}


module.exports = authController;