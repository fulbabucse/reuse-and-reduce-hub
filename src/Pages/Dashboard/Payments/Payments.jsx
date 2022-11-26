import React from "react";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const Payments = () => {
  const bookingData = useLoaderData();
  return (
    <div className="mt-3">
      <Helmet>
        <title>Payment - Admin Reuse and Reduce</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-baseColor">
          Please Pay ${bookingData.price} for your {bookingData.product} order
        </h1>
      </div>
      <div className="w-96 mx-auto mt-4">
        <Elements stripe={stripePromise}>
          <CheckoutForm bookingData={bookingData} />
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
