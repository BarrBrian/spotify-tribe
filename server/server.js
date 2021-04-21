const express = require('express');
const path = require('path');
const fetch = require('node-fetch')
const mongoose = require('mongoose');
const cors = require('cors')
const db = require('./models/pgPool');
require('dotenv').config();

// mongoose DB url
const CONNECTION = '';

const PORT = 3000;
const app = express();

const applicationDomation = 'http://localhost:' + PORT

const mainRouter = require('./routes/mainRouter.js');
const spotifyClientId = '8f48d471fce74b5db4b386614dc36903';
const spotifySecret = process.env.SPOTIFY_SECRET;
const scopes = 'user-read-email user-top-read user-read-recently-played user-follow-modify user-read-currently-playing user-library-read';
const spotifyCallbackURI = applicationDomation + '/callback';

// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, () => console.log('Connected to Database')))
//   .catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false); // @what is this for?

app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.get('/', (req, res) => {
  // console.log(path.resolve(__dirname, '../public/index.html'))
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});



app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + spotifyClientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(spotifyCallbackURI));
});

// app.get('/')

app.get('/callback', (req, res) => {
  console.log(req.query.code);
  fetch('https://accounts.spotify.com/api/token' + 
    '?grant_type=authorization_code' + 
    '&code=' + encodeURIComponent(req.query.code) + 
    '&redirect_uir=' + encodeURIComponent(spotifyCallbackURI) +
    '&client_id=' + encodeURIComponent(spotifyClientId) + 
    '&client_secret=' + encodeURIComponent(spotifySecret),
    { method: 'POST',
      headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
    })
    .then(data => data.json())
    .then(d => {
      const expirationDate = (Date.now() / 1000) + d.expires_in
      console.log(expirationDate);
      const accessParams = [d.access_token, d.token_type, d.scope, d.expires_in, expirationDate, d.refresh_token]
      const accessQuery = `INSERT INTO users 
      (access_token, token_type, scope, token_life_seconds, expiration_date, refresh_token)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, access_token`
      return db.query(accessQuery, accessParams)
    })
    .then ()
  res.json({})

});

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  access_token VARCHAR(1000) NOT NULL,
  token_type VARCHAR(20) DEFAULT 'bearer',
  scope VARCHAR(2000) NOT NULL, 
  token_life_seconds int, 
  expiration_date DATE,
  refresh_token VARCHAR(1000)
  )
  


// app.get('/api/callback', (req, res) => {
//   res.render('/Users/bb/Documents/Dev_Work/Codesmith/projects/project-s/public/index.html', {message: 'the API call reverted'})
// })

app.use('/api', mainRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message); 
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));