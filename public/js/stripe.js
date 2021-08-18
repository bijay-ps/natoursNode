/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe('pk_test_87dKqryf2hxygp5MGblJhPTj00ZQUdeBvv');

export const bookTour = async (tourId) => {
  try {
    // 1. Get the session from server
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // 2. Create checkout form and charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
