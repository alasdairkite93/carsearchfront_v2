import React, { useState, useEffect } from 'react';
// import './Stripe.css';

const ProductDisplay = () => (

    //I could add customer details on submit
  <section>
    <div className="product">
      <Logo />
      <div className="description">
        <h3>Starter plan - Free Trial 30 Days</h3>
        <h5>£0.99 / month</h5>
      </div>
    </div>
    <form action="http://127.0.0.1:4242/create-checkout-session" method="POST">
      {/*<input type="hidden" name="lookup_key" value="price_1PCnGm2LoquNKfKzB9UtPY2K" />*/}
      <input type="hidden" name="lookup_key" value="price_1PXJmx2LoquNKfKzKqxZ4iyy" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const CustomerDetails = () => {

  //Add a customer details form
  //on submit redirect to the checkout button

}

const SuccessDisplay = ({ sessionId }) => {

  //propose adding payment logic of setting visitem here.

  return (

      //propose that on success you could do the business logic
      //You may wish to ask customers to add their details before clicking the link
    <section>
      <div className="product Box-root">
        <Logo />
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="http://127.0.0.1:4242/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function StripeApp(visitem) {

  //in this instance I would add an extra line here to collect customer details for DB
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      //You could execute the logic to create a record in the database here
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  //Propose adding collect customer details here
  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    //propose adding customer details to DB here
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    //propose deleting details here
    return <Message message={message} />;
  }
}

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14px"
    height="16px"
    viewBox="0 0 14 16"
    version="1.1"
  >
    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>
  </svg>
);