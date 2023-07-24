import React, { useState } from "react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
const SubscriptionForm = ({priceId}) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  if (!stripe || !elements) return "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (clientSecret == "") {
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("cardNumber"),
      });

      console.log(paymentMethod);

      const { data, status } = await axios.post(
        "http://localhost:5000/create-subscription",
        { paymentMethod , priceId}
      );
      if (status == 200) {
        console.log(data);
        setClientSecret(data.clientSecret);
        if (true) {
          const confirmation = await stripe.confirmCardPayment(
            data.clientSecret,
            {
              payment_method: {
                card: elements.getElement("cardNumber"),
                // You may add billing details here if needed
              },
            }
          );
          console.log(confirmation);
        } else {
          console.log(data.paymentIntentStatus);
        }
      } else {
      }
    } else {
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement("cardNumber"),
          // You may add billing details here if needed
        },
      });

      console.log(confirmation);
    }
  };
  return (
    <div >
      <form onSubmit={handleSubmit} >
        {/* <CardElement /> */}

        <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
          <div
            className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
            style={{ maxWidth: "600px" }} onClick={e=>e.stopPropagation()}
          >
            <div className="w-full pt-1 pb-5"> 
              <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                <i className="mdi mdi-credit-card-outline text-3xl"></i>
              </div>
            </div>
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">
                Secure payment info
              </h1>
            </div>
            <div className="mb-3 flex -mx-2">
              <div className="px-2">
                <label
                  htmlFor="type1"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-500"
                    name="type"
                    id="type1"
                    checked readOnly
                  />
                  <img
                    src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                    className="h-8 ml-3"
                  />
                </label>
              </div>
              {/* <div className="px-2">
                <label htmlFor="type2" className="flex items-center cursor-pointer">
                    <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2"/>
                    <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-8 ml-3"/>
                </label>
            </div> */}
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Card number</label>
              <div>
                <CardNumberElement className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" />
              </div>
            </div>

            <div className="mb-3 flex gap-4">
              <div>
                <label className="font-bold text-sm mb-2 ml-1">
                  Expiry Month
                </label>
                <div>
                  {/* <CardCvcElement  className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" /> */}
                  <CardExpiryElement className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-bold text-sm mb-2 ml-1">
                  Security code
                </label>
                <div>
                  <CardCvcElement className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">
                Name on card
              </label>
              <div>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="John Smith"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-10">
              <div className="flex gap-3">
                <div>

              <label className="font-bold text-sm mb-2 ml-1">Address</label>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Address"
                  type="text"
                  />
                  </div>

                  <div>
                    
                <label className="font-bold text-sm mb-2 ml-1">Pincode</label>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Pincode"
                  type="text"
                  />
                  </div>
              </div>
            </div>

            <div>
              <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
              </button>
            </div>
          </div>
        </div>

        {/* <button>SUbmit</button> */}
      </form>
    </div>
  );
};

export default SubscriptionForm;
