const express = require('express');
const router = express.Router();
const viewControllers = require('../contollers/viewsController');
const authController = require('../contollers/authController');

router.get('/', authController.isLoggedIn, viewControllers.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewControllers.getTour);
router.get('/login', authController.isLoggedIn, viewControllers.getLoginForm);
router.get('/me', authController.protect, viewControllers.getAccount);

module.exports = router;
