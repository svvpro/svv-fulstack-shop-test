const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const router = express.Router();
const categoryCtrl = require('../controllers/category');

router.get('/', passport.authenticate('jwt', { session: false }), categoryCtrl.getAllCategories);
router.get('/:id', passport.authenticate('jwt', { session: false }), categoryCtrl.getCategoryById);
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), categoryCtrl.createCategory);
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), categoryCtrl.updateCategory);
router.delete('/:id', passport.authenticate('jwt', { session: false }), categoryCtrl.deleteCategory);

module.exports = router;