const express = require('express');
const router = express.Router();
const passport = require('passport');
const analiticsCtrl = require('../controllers/analitics');

router.get('/overview', passport.authenticate('jwt', { session: false }),  analiticsCtrl.overview);
router.get('/analitics', passport.authenticate('jwt', { session: false }),analiticsCtrl.analitics);

module.exports = router;