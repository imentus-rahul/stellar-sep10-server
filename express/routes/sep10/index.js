const { Router } = require('express');
const { getChallenge, getToken } = require('../../controllers/sep10');

const router = Router();

router.get('/', getChallenge);
router.post('/', getToken);

module.exports = router;
