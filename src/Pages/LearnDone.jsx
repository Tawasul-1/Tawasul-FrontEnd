import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const LearnDone = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const { currentLanguage, isRTL } = useLanguage();

  // Translations object
  const translations = {
    en: {
      title: "🎉 Excellent Job!",
      message: "Now you learned this item, you can use it in the board.",
      redirect: "Redirecting to Items in"
    },
    ar: {
      title: "🎉 عمل رائع!",
      message: "الآن بعد أن تعلمت هذا العنصر، يمكنك استخدامه في اللوحة.",
      redirect: "سيتم التوجيه إلى العناصر خلال"
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate(-2);;
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#e6f2ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        direction: isRTL ? "rtl" : "ltr"
      }}
    >
      <h1 style={{ color: "#173067", fontSize: "2.5rem", marginBottom: "1rem" }}>
        {translations[currentLanguage].title}
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#333" }}>
        {translations[currentLanguage].message}
      </p>

      {/* Countdown timer */}
      <p style={{ fontSize: "1.1rem", color: "#555" }}>
        {translations[currentLanguage].redirect} {count} {currentLanguage === 'ar' ? 'ثواني' : 'seconds'}...
      </p>
    </div>
  );
};

export default LearnDone;
