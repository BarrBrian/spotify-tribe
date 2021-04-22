const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const db = require('./models/pgPool');
require('dotenv').config();

const PORT = 3000;
const app = express();

const appRootDomain = 'http://localhost:' + '8080';

const apiRouter = require('./routes/mainRouter.js');
const spotifyRouter = require('./routes/spotifyRouter.js');
const settingsRouter = require('./routes/settingsRouter.js');

const spotifyClientId = '8f48d471fce74b5db4b386614dc36903';
const scopes = 'user-read-email user-top-read user-read-recently-played user-follow-modify user-read-currently-playing user-library-read';
const spotifyCallbackURI = 'http://localhost:3000/callback';

const authController = require('./controller/authController.js');
const settingsController = require('./controller/settingsController');


app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors());

app.use('/api/spotify', spotifyRouter);
app.use('/api', apiRouter);
app.use('/settings', settingsRouter);

app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + spotifyClientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(spotifyCallbackURI));
});

app.get('/callback', 
  authController.getAuthToken, 
  authController.getUserInfo, 
  settingsController.createInitialSettings, 
  (req, res) => {
  console.log(res.locals.username, 'Successfully Authorized in DB');
  const profileUrl = appRootDomain + '/profile/' + res.locals.username
  res.redirect(profileUrl);
})

app.use('/*', (req, res) => {
  // res.redirect(appRootDomain)
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

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