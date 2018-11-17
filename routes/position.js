const express = require('express');
const router = express.Router();
const passport = require('passport');
const positionCtrl = require('../controllers/position');

router.get('/:categoryId', passport.authenticate('jwt', { session: false }), positionCtrl.getPositionsByCategoryId);
router.post('/', passport.authenticate('jwt', { session: false }), positionCtrl.createPosition);
router.patch('/:id', passport.authenticate('jwt', { session: false }), positionCtrl.updatePosition);
router.delete('/:id', passport.authenticate('jwt', { session: false }), positionCtrl.deletePosition);


module.exports = router;