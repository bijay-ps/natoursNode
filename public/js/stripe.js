/*eslint-disable*/
import axios from 'axios';
const stripe = Stripe('pk_test_87dKqryf2hxygp5MGblJhPTj00ZQUdeBvv');

export const bookTour = async (tourId) => {
  try {
    // 1. Get the session from server
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log('session: ', session);
    // 2. Create checkout form and charge credit card
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }

};
