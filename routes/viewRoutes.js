const express = require('express');
const router = express.Router();
const viewControllers = require('../contollers/viewsController');
const authController = require('../contollers/authController');
const bookingController = require('../contollers/bookingController');

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewControllers.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewControllers.getTour);
router.get('/login', authController.isLoggedIn, viewControllers.getLoginForm);
router.get('/me', authController.protect, viewControllers.getAccount);
router.get('/my-tours', authController.protect, viewControllers.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewControllers.updateUserData
);

module.exports = router;
