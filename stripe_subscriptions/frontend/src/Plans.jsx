import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SubscriptionForm from "./SubscriptionForm";

const stripePromise = loadStripe(
  "pk_test_51M4ns1SBx6KtlGUSdnIZL9ehhRylPddDkOoWuIl1DGLDHXm9FR4C3CSjNB9KOWgVLSJiKNbylvPl8s3s7dDtYJg200FK52NvMb"
);
const Plans = () => {

  const [plans, setPlans] = useState([
    {
      name: "Start",
      price: 0.0,
      features: ["starter 100 MB", "Avg performance", "limited shares"],
      type: "M",
      desc: "Start your journey",
      priceId : "abc"
    },
    {
      name: "Premium",
      price: 0.0,
      features: ["starter 100 MB", "Avg performance", "limited shares"],
      type: "m",
      priceId : ""
    },
  ]);
  const [planTypes, setPlanTypes] = useState(
    plans.filter((e) => e.type == "M")
  );

  const [buy, setBuy] = useState({visible :false , priceId : ""});

  const changePlanTypes = (e, type) => {
    if (type == "M") {
      setPlans(plans.filter((e) => e.type == "M"));
    } else if (type == "Y") {
      setPlans(plans.filter((e) => e.type == "Y"));
    }
    console.log(planTypes);
  };

  const closeBuy = (e) =>{
    setBuy({visible: false, priceId : "", plan : null})
  }
  const openBuy = (e, priceId, plan) =>{
    setBuy(prev=>{return {visible : !prev.visible, priceId :priceId}})
}

  return (
    <>
      {buy.visible && (<div onClick={closeBuy} className="fixed top-0 bottom-0 left-0 right-0 z-10 " >

        <Elements stripe={stripePromise} >
          <SubscriptionForm priceId={buy.priceId} plan={buy.plan} />
        </Elements>
      </div>
      ) }
    
        <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto" > 
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
            </p>
            <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
              <button
                className="py-1 px-4 bg-indigo-500 text-white focus:outline-none"
                onClick={(e) => changePlanTypes(e, "M")}
              >
                Monthly
              </button>
              <button
                className="py-1 px-4 focus:outline-none"
                onClick={(e) => changePlanTypes(e, "Y")}
              >
                Annually
              </button>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {plans.map((element) => {
              return (
                <CardComponent
                  name={element.name}
                  price={element.price}
                  features={element.features}
                  description={element.desc}
                  setBuy={openBuy}
                  priceId={element.priceId}
                  key={element.priceId}
                />
              );
            })}
          </div>
        </div>
      </section>
    
      
      
    </>
  );
};

const CardComponent = ({
  name,
  price,
  features,
  description,
  buttonColor = null,
  specialTag = null,
  priceId,
  setBuy,
 
}) => {
  if (name != "Start" && !buttonColor) buttonColor = "indigo";

  return (
    <div className="p-4 xl:w-1/4 md:w-1/2 w-full" >
      <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
        <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
          {name}
        </h2>
        <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
          <span>${price}</span>
          <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
        </h1>

        {features.map((element) => {
          return <FeatureComponent feature={element} />;
        })}
        <button
          className={`flex items-center mt-auto text-white  border-0 py-2 px-4 w-full focus:outline-none ${
            !buttonColor
              ? "bg-gray-400 hover:bg-gray-500"
              : `bg-${buttonColor}-400 hover:bg-${buttonColor}-500`
          } rounded`} onClick={e=>setBuy(e,priceId)}
        >
          Button
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-auto"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        <p className="text-xs text-gray-500 mt-3">{description}</p>
      </div>
    </div>
  );
};

const FeatureComponent = ({ feature }) => {
  return (
    <p className="flex items-center text-gray-600 mb-2" key={feature}>
      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          className="w-3 h-3"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </span>
      {feature}
    </p>
  );
};



export default Plans;
