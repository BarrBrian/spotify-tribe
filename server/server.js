const express = require('express');
const path = require('path');
const fetch = require('node-fetch')
const mongoose = require('mongoose');
const cors = require('cors')

// mongoose DB url
const CONNECTION_URL = '';

const PORT = 3000;
const app = express();

const applicationDomation = 'http://localhost:' + PORT

const mainRouter = require('./routes/mainRouter.js');
const spotifyClientId = '8f48d471fce74b5db4b386614dc36903'
const scopes = 'user-read-email user-top-read user-read-recently-played user-follow-modify user-read-currently-playing user-library-read';

// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, () => console.log('Connected to Database')))
//   .catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false); // @what is this for?
app.use(cors())
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.get('/', (req, res) => {
  console.log(path.resolve(__dirname, '../public/index.html'))
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});



app.get('/login', (req, res) => {
  // console.log('hello login');
  res.redirect('https://www.google.com');

  // res.redirect('https://accounts.spotify.com/authorize' +
  //   '?response_type=code' +
  //   '&client_id=' + spotifyClientId +
  //   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  //   '&redirect_uri=' + encodeURIComponent(applicationDomation + '/callback'));
});

// app.get('/')

app.get('/callback', (req, res) => {
  console.log('we hear you dawg');
  console.log(req.body);
  res.json({})

});

app.get('/api/callback', (req, res) => {
  res.render('/Users/bb/Documents/Dev_Work/Codesmith/projects/project-s/public/index.html', {message: 'the API call reverted'})
})

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