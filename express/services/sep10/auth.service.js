const { Utils, Keypair, Server } = require('stellar-sdk');
const { config } = require('../../config/config');
const jwt = require('jsonwebtoken');

const server = new Server(config.STELLAR_HORIZON);
const keypair = Keypair.fromSecret(config.SINGING_SECRET_KEY);

const getChallenge = (
  account,
  homeDomain = new URL(config.HOME_DOMAIN).host,
  webAuthDomain = new URL(config.WEB_DOMAIN).host
) => {
  // TODO: handle client domain and move timeout and memoId to controller

  // add 5 minutes
  const timeout = 5 * 60000;
  // generate random memo ID
  const memoId = Math.floor(Math.random() * 10000000).toString();

  const transaction = Utils.buildChallengeTx(
    keypair,
    account,
    homeDomain,
    timeout,
    config.STELLAR_NETWORK,
    webAuthDomain,
    memoId
  );

  return {
    transaction: transaction,
    network_passphrase: config.STELLAR_NETWORK
  };
};

const verifyChallenge = async (transaction) => {
  const { clientAccountID, tx, memo } = Utils.readChallengeTx(
    transaction,
    config.SINGING_PUBLIC_KEY,
    config.STELLAR_NETWORK,
    new URL(config.HOME_DOMAIN).host,
    new URL(config.WEB_DOMAIN).host
  );
  try {
    const account = await server.loadAccount(clientAccountID);

    Utils.verifyChallengeTxThreshold(
      transaction,
      config.SINGING_PUBLIC_KEY,
      config.STELLAR_NETWORK,
      account.thresholds.med_threshold,
      account.signers,
      new URL(config.HOME_DOMAIN).host,
      new URL(config.WEB_DOMAIN).host
    );
  } catch (err) {
    if (err.name !== 'NotFoundError') {
      throw new Error('Invalid signature');
    }
    Utils.verifyChallengeTxSigners(
      transaction,
      config.SINGING_PUBLIC_KEY,
      config.STELLAR_NETWORK,
      [clientAccountID],
      new URL(config.HOME_DOMAIN).host,
      new URL(config.WEB_DOMAIN).host
    );
  }
  return { clientAccountID, tx, memo };
};

const getToken = (account, tx, memo) => {
  const iss = `${config.HOME_DOMAIN}/auth`;
  const iat = Date.now();
  const exp = iat + 10 * 60000; // 10 minutes
  const sub = account;
  const jti = tx.hash().toString('hex');
  const token = jwt.sign(
    {
      iss: iss,
      sub: sub,
      iat: iat,
      exp: exp,
      jti: jti
    },
    config.JWT_SECRET
  );
  return token;
};

module.exports = {
  getChallenge,
  verifyChallenge,
  getToken
};
