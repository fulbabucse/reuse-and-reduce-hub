import React, { useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ bookingData }) => {
  const [cardError, setCardError] = useState("");
  const [loading, SetLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState("");
  const [transectionId, setTransectionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const {
    buyerName,
    email,
    price,
    location,
    phoneNumber,
    _id,
    product,
    product_image,
    brand_name,
    bookingId,
    seller_email,
  } = bookingData;

  console.log(bookingData);

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCardError("");

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setSucceeded("");
    SetLoading(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            address: {
              city: location,
            },
            name: buyerName,
            email,
            phone: phoneNumber,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        name: buyerName,
        phone: phoneNumber,
        location,
        email,
        product,
        product_image,
        brand_name,
        price,
        transectionId: paymentIntent.id,
        paymentId: _id,
        paymentMethod,
        seller_email,
      };
      fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
        },
        body: JSON.stringify(paymentInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            setSucceeded("Congrats! Complete your payment");
            setTransectionId(paymentIntent.id);
            SetLoading(false);
            fetch(`http://localhost:5000/products/${bookingId}`, {
              method: "PATCH",
              headers: {
                authorization: `Bearer ${localStorage.getItem(
                  "reuseReduceToken"
                )}`,
              },
            })
              .then((res) => res.json())
              .then(() => {
                fetch(`http://localhost:5000/bookings/${bookingId}`, {
                  method: "PATCH",
                  headers: {
                    authorization: `Bearer ${localStorage.getItem(
                      "reuseReduceToken"
                    )}`,
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    navigate("/dashboard/my-orders");
                  })
                  .catch((err) => console.error(err));
                navigate("/dashboard/my-orders");
              })
              .catch((err) => console.error(err));
            toast.success("Congrats! Complete your payment");
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="inline-block mt-2 px-4 py-1 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-lg leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
          type="submit"
          disabled={!stripe || !clientSecret || loading}
        >
          Pay
        </button>
      </form>
      <p className="mt-2 text-red-500 font-medium">{cardError}</p>
      {succeeded && (
        <>
          <p className="text-semibold text-gray-700">{succeeded}</p>
          <p className="text-semibold text-gray-700">
            TransectionID: {transectionId}
          </p>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
