const express = require('express');
const router = express.Router();
const viewControllers = require('../contollers/viewsController');
const authController = require('../contollers/authController');

router.use(authController.isLoggedIn);

router.get('/', viewControllers.getOverview);
router.get('/tour/:slug', viewControllers.getTour);
router.get('/login', viewControllers.getLoginForm);

module.exports = router;