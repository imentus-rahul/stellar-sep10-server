const {
  getToken,
  verifyChallenge
} = require('../../services/sep10/auth.service');

const token = async (req, res, next) => {
  try {
    const { transaction } = req.body;
    if (!transaction) {
      return res.status(400).json({
        error: 'Required fields is missing'
      });
    }
    const { clientAccountID, tx, memo } = await verifyChallenge(transaction);

    const token = getToken(clientAccountID, tx, memo);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

module.exports = token;
