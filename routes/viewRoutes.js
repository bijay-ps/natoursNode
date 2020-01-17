const express = require('express');
const router = express.Router();
const viewControllers = require('../contollers/viewsController');

router.get('/', viewControllers.getOverview);
router.get('/tour', viewControllers.getTour);

module.exports = router;
