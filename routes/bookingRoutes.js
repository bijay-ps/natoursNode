const express = require('express');
const authController = require('../contollers/authController');
const bookingController = require('../contollers/bookingController');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
