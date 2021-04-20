const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// mongoose DB url
const CONNECTION_URL = '';

const PORT = 3000;
const app = express();

const mainRouter = require('./routes/mainRouter.js');

// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, () => console.log('Connected to Database')))
//   .catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false); // @what is this for?

app.use(express.static(__dirname + '/../public'));


app.get('/', (req, res) => {
  console.log(path.resolve(__dirname + '/../public/index.html'))
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

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