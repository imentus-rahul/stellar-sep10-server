const { getChallenge } = require('../../services/sep10/auth.service');

const challenge = (req, res, next) => {
  try {
    const account = req.query.account;
    const homeDomain = req.query.home_domain;
    const webAuthDomain = req.query.web_auth_domain;

    if (!account) {
      return res.status(400).json({
        error: 'Required parameter is mising'
      });
    }

    const tx = getChallenge(account, homeDomain, webAuthDomain);

    res.status(200).json({
      transaction: tx.transaction,
      network_passphrase: tx.network_passphrase
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

module.exports = challenge;
