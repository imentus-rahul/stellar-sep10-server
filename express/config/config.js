const { Networks } = require('stellar-sdk');

const SINGING_PUBLIC_KEY = process.env.SINGING_PUBLIC_KEY;
const SINGING_SECRET_KEY = process.env.SINGING_SECRET_KEY;
const HOME_DOMAIN = process.env.HOME_DOMAIN;
const WEB_DOMAIN = process.env.WEB_DOMAIN;
const STELLAR_NETWORK = Networks[process.env.STELLAR_NETWORK];
const STELLAR_HORIZON = process.env.STELLAR_HORIZON;
// TODO: load from end and expire time need to add
const JWT_SECRET = 'SEP-10';

const PORT = process.env.PORT;

const config = {
  SINGING_PUBLIC_KEY,
  SINGING_SECRET_KEY,
  HOME_DOMAIN,
  WEB_DOMAIN,
  STELLAR_NETWORK,
  STELLAR_HORIZON,
  JWT_SECRET,
  PORT
};

module.exports = {
  config
};
