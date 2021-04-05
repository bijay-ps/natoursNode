/*eslint-disable*/
import axios from 'axios';
const stripe = Stripe('sk_test_QHp39KkY5MhVFDPWHwUPZQfV00ZHsTYMcD');

export const bookTour = async (tourId) => {
  // 1. Get the session from server
  const session = await axios(
    `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
  );
  console.log('session: ', session);
  // 2. Create checkout form and charge credit card
};
