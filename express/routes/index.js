const { Router } = require('express');
const sep10Auth = require('./sep10');

const router = Router();

router.use('/sep10/auth', sep10Auth);

module.exports = router;
