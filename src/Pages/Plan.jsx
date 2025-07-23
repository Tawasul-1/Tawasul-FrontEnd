import React from "react";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const plans = [
  {
    key: "premium",
    title: "Premium (Monthly)",
    price: "$9.99/mo",
    highlight: true,
  },
  {
    key: "basic",
    title: "Basic (Free)",
    price: "$0/mo",
    highlight: false,
  },
];

function PlanModal({ isOpen, onClose, onSelectPlan }) {
  const { currentLanguage } = useLanguage();
  if (!isOpen) return null;

  const planFeatures = [
    {
      key: "trial",
      label: getTranslation("plans.trial", currentLanguage),
      free: getTranslation("plans.trial_value", currentLanguage),
      premium: getTranslation("plans.trial_premium_value", currentLanguage),
      isText: true,
    },
    {
      key: "access_all",
      label: getTranslation("plans.access_all", currentLanguage),
      free: true,
      premium: true,
    },
    {
      key: "ai_assist",
      label: getTranslation("plans.ai_assist", currentLanguage),
      free: true,
      premium: true,
    },
    {
      key: "learning_tests",
      label: getTranslation("plans.learning_tests", currentLanguage),
      free: true,
      premium: true,
    },
    {
      key: "basic_set",
      label: getTranslation("plans.basic_set", currentLanguage),
      free: getTranslation("plans.basic_set_value", currentLanguage),
      premium: getTranslation("plans.basic_set_premium_value", currentLanguage),
      isText: true,
    },
    {
      key: "add_cards",
      label: getTranslation("plans.add_cards", currentLanguage),
      free: false,
      premium: true,
    },
    {
      key: "remove_cards",
      label: getTranslation("plans.remove_cards", currentLanguage),
      free: false,
      premium: true,
    },
  ];

  return (
    <>
      <style>{`
        .plan-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 2000;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .plan-modal::-webkit-scrollbar {
          width: 10px;
        }
        .plan-modal::-webkit-scrollbar-thumb {
          background: #e3e6f0;
          border-radius: 8px;
        }
        .plan-modal::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 8px;
        }
        .plan-modal {
          scrollbar-width: thin;
          scrollbar-color: #e3e6f0 #f8f9fa;
        }
      `}</style>
      <div className="plan-modal-overlay">
        <div
          className="plan-modal bg-white shadow-lg rounded-4"
          style={{
            maxWidth: 800,
            width: "100%",
            maxHeight: "70vh",
            position: "relative",
            borderRadius: "1.5rem",
            padding: "3rem 2rem",
            boxShadow: "0 8px 32px rgba(23,48,103,0.15)",
            border: "1.5px solid #e3e6f0",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#666",
              zIndex: 1,
            }}
            aria-label="Close"
          >
            ×
          </button>
          <h3 className="fw-bold text-center mb-4">
            {getTranslation("plans.feature", currentLanguage)}
          </h3>
          {/* Scrollable content area */}
          <div
            className="plan-modal-scroll flex-grow-1"
            style={{
              overflowY: "auto",
              maxHeight: "80%", // Scrollbar for 80% of modal height
              minHeight: "300px",
              paddingRight: "1rem",
            }}
          >
            {/* Plan Cards */}
            <div className="d-flex flex-column flex-md-row justify-content-center gap-4 mb-4">
              {plans.map((plan) => (
                <div key={plan.key} className="flex-fill d-flex" style={{ minWidth: 260, maxWidth: 350 }}>
                  <div
                    className={`card shadow-sm border-2 rounded-4 w-100 d-flex flex-column ${
                      plan.highlight ? "border-primary" : "border-secondary"
                    }`}
                    style={{ borderRadius: "1.5rem", borderWidth: 2, minHeight: 0 }}
                  >
                    <div className="card-body d-flex flex-column h-100 p-4">
                      <h5 className="card-title fw-bold mb-2 text-start">{plan.title}</h5>
                      <h2 className="fw-bold mb-3 text-start" style={{ color: plan.highlight ? "#173067" : "#888" }}>{plan.price}</h2>
                      <p className="mb-4 text-start" style={{ fontSize: "1.05rem" }}>
                        {plan.key === "premium"
                          ? getTranslation("plans.premium_summary", currentLanguage)
                          : getTranslation("plans.free_summary", currentLanguage)}
                      </p>
                      <div className="d-flex flex-grow-1 align-items-end">
                        <button
                          className={`btn w-100 ${plan.highlight ? "btn-primary" : "btn-outline-primary"}`}
                          style={{ minHeight: 48 }}
                          onClick={() => onSelectPlan && onSelectPlan(plan.key)}
                        >
                          {plan.highlight
                            ? getTranslation("plans.premium", currentLanguage)
                            : getTranslation("plans.free", currentLanguage)}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Comparison Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered text-center align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>{getTranslation("plans.feature", currentLanguage)}</th>
                    <th>{getTranslation("plans.free", currentLanguage)}</th>
                    <th>{getTranslation("plans.premium", currentLanguage)}</th>
                  </tr>
                </thead>
                <tbody>
                  {planFeatures.map((row) => (
                    <tr key={row.key}>
                      <td className="text-start">{row.label}</td>
                      <td>
                        {row.isText ? (
                          row.free
                        ) : row.free === true ? (
                          <FaCheckCircle color="green" size={20} />
                        ) : (
                          <FaTimesCircle color="red" size={20} />
                        )}
                      </td>
                      <td>
                        {row.isText ? (
                          row.premium
                        ) : row.premium === true ? (
                          <FaCheckCircle color="green" size={20} />
                        ) : (
                          <FaTimesCircle color="red" size={20} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanModal;