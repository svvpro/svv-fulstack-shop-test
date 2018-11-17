const express = require('express');
const passport = require('passport');
const router = express.Router();
const orderCtrl = require('../controllers/order');

router.get('/', passport.authenticate('jwt', { session: false }), orderCtrl.getAllOrders);
router.post('/', passport.authenticate('jwt', { session: false }), orderCtrl.createOrder);

module.exports = router;