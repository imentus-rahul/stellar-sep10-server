require('dotenv').config();

const express = require('express');

const { config } = require('./config/config');

function enableCors(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

const app = express();

app.use(enableCors);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(require('./routes'));

app.listen(config.PORT);
