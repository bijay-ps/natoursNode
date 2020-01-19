const express = require('express');
const router = express.Router();
const viewControllers = require('../contollers/viewsController');

router.get('/', viewControllers.getOverview);
router.get('/tour/:slug', viewControllers.getTour);

module.exports = router;
