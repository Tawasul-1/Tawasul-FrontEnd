import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style-pages/plan.css";

// Monthly and Yearly plans
const monthlyPlans = [
  {
    title: "Starter plan",
    price: "$29/mo",
    cards: "Up to 200 Card",
    description: "For Small Teams Or Early-Stage network owners getting started",
    features: ["Email Notification", "Basic Payment Management", "Email Support"],
  },
  {
    title: "Pro plan",
    price: "$99/mo",
    cards: "Up to 1000 Card",
    description: "For Small Teams Or Early-Stage network owners getting started",
    features: ["Email Notification", "Basic Payment Management", "Email Support"],
    popular: true,
  },
  {
    title: "Enterprise",
    price: "$150/mo",
    cards: "Up to 2000 Card",
    description: "For Small Teams Or Early-Stage network owners getting started",
    features: ["Email Notification", "Basic Payment Management", "Email Support"],
  },
];

const yearlyPlans = [
  {
    title: "Starter plan",
    price: "$290/yr",
    cards: "Up to 2000 Card",
    description: "For teams looking for long-term value",
    features: ["Email Notification", "Priority Support", "Advanced Analytics"],
  },
  {
    title: "Pro plan",
    price: "$990/yr",
    cards: "Up to 10,000 Card",
    description: "Best for growing networks with scaling needs",
    features: ["Multi-user Access", "Premium Features", "Phone & Email Support"],
    popular: true,
  },
  {
    title: "Enterprise",
    price: "$1,500/yr",
    cards: "Unlimited Cards",
    description: "Enterprise-level infrastructure and support",
    features: ["Dedicated Manager", "24/7 Support", "Custom Integrations"],
  },
];

const Plan = () => {
  const [isYearly, setIsYearly] = useState(false);
  const plans = isYearly ? yearlyPlans : monthlyPlans;

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section
        className="hero-section text-center text-white py-5"
        style={{
          backgroundImage: "url('/bg2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-overlay py-5 px-3">
          <h2 className="fw-bold display-6">
            <span className="text-gray">Flexible</span> Plane for every stage of Growth
          </h2>

          {/* Toggle Buttons */}
          <div className="mt-4 btn-group custom-toggle-group" role="group">
            <button
              className={`btn text1 ${!isYearly ? "active-btn" : ""}`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`btn text1 ${isYearly ? "active-btn" : ""}`}
              onClick={() => setIsYearly(true)}
            >
              Yearly
            </button>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <div className="container marg pb-5">
        <div className="row justify-content-center">
          {plans.map((plan, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                className={`card h-100 shadow-sm position-relative ${
                  plan.popular ? "custom-border-primary" : ""
                }`}
                style={{ borderRadius: "30px" }}
              >
                {plan.popular && (
                  <span className="badge custom-bg-primary position-absolute top-0 end-0 m-3 text-white">
                    Popular
                  </span>
                )}
                <div className="card-body text-center">
                  <h5 className="card-title text-muted">{plan.title}</h5>
                  <h2 className="fw-bold">{plan.price}</h2>
                  <p className="text-muted small">{plan.description}</p>
                  <h6 className="text-start fw-semibold">Features :-</h6>
                  <ul className="list-unstyled text-start">
                    <li>✔ {plan.cards}</li>
                    {plan.features.map((f, i) => (
                      <li key={i}>✔ {f}</li>
                    ))}
                  </ul>
                  <button
                    className={`btn w-100 mt-3 ${
                      plan.popular ? "btn-primary" : "btn-outline-primary custom-outline-btn"
                    }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Plan;
