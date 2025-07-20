import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageChange}
      className="btn btn-outline-primary btn-sm"
      style={{
        minWidth: "60px",
        fontSize: "0.875rem",
        padding: "0.375rem 0.75rem",
        borderRadius: "0.375rem",
        border: "1px solid #0d6efd",
        backgroundColor: "transparent",
        color: "#0d6efd",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#0d6efd";
        e.target.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "#0d6efd";
      }}
    >
      {currentLanguage === "en" ? "العربية" : "English"}
    </button>
  );
}

export default LanguageSwitcher; 