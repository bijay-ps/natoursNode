const express = require('express');
const router = express.Router();
const viewControllers = require('../contollers/viewsController');
const authController = require('../contollers/authController');

router.get('/', viewControllers.getOverview);
router.get('/tour/:slug', authController.protect, viewControllers.getTour);
router.get('/login', viewControllers.getLoginForm);

module.exports = router;
