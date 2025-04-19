const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const uploadRoutes = require('./upload.routes');
const recipeRoutes = require('./recipe.routes');
const donationRoutes = require('./donation.routes');
const userRoutes = require('./user.routes');
const ngoRoutes = require('./ngo.routes');

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/recipe', recipeRoutes);
router.use('/donation', donationRoutes);
router.use('/user', userRoutes);
router.use('/ngo', ngoRoutes);

module.exports = router;