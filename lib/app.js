const express = require('express');
const app = express();
require('../lib/models/register-plugins');

// middleware
const morgan = require('morgan');
const ensureAuth = require('./middleware/ensure-auth');
const checkConnection = require('./middleware/check-connection');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// test route
app.get('/hello', (req, res) => {
  res.send('hello express');
});

app.use(checkConnection);

// API ROUTES
const auth = require('./routes/auth');
const lang = require('./routes/languages');
const me = require('./routes/me');
app.use('/api/auth', auth);
app.use('/api/me', ensureAuth(), me);
app.use('/api/languages', ensureAuth(), lang);


// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;