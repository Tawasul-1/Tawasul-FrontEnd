import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsVolumeUp } from "react-icons/bs";
import TestService from "../api/services/TestService";
import { useLanguage } from "../context/LanguageContext";

const Test = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const level = searchParams.get("level");
  const cardId = searchParams.get("card");
  
  const [options, setOptions] = useState([]);
  const [correctCardId, setCorrectCardId] = useState(null);
  const [question, setQuestion] = useState("");
  const [lampColor, setLampColor] = useState("#ccc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentLanguage, isRTL } = useLanguage();

  // Translations object
  const translations = {
    en: {
      loading: "Loading test...",
      error: "Failed to load test. Please try again.",
      retry: "Retry",
      defaultQuestion: (title) => `Where is the ${title}?`,
      correct: "Correct!",
      incorrect: "Try again!"
    },
    ar: {
      loading: "جارٍ تحميل الاختبار...",
      error: "فشل تحميل الاختبار. يرجى المحاولة مرة أخرى.",
      retry: "إعادة المحاولة",
      defaultQuestion: (title) => `أين ${title}؟`,
      correct: "صحيح!",
      incorrect: "حاول مرة أخرى!"
    }
  };

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        const testData = await TestService.getTest(cardId, level);
        
        setOptions(testData.cards || []);
        setCorrectCardId(testData.correct_card_id || cardId);
        
        const correctCard = testData.cards?.find(c => c.id == cardId);
        const defaultTitle = currentLanguage === 'ar' ? correctCard?.title_ar : correctCard?.title_en;
        
        setQuestion(
          testData.question || 
          translations[currentLanguage].defaultQuestion(defaultTitle || "")
        );
      } catch (err) {
        setError(translations[currentLanguage].error);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [cardId, level, currentLanguage]);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleOptionClick = (selectedCardId) => {
    const isCorrect = selectedCardId == correctCardId;
    
    setLampColor(isCorrect ? "green" : "red");
    speak(isCorrect ? translations[currentLanguage].correct : translations[currentLanguage].incorrect);
    
    if (isCorrect) {
      setTimeout(() => navigate("/learn"), 1500);
    } else {
      setTimeout(() => setLampColor("#ccc"), 1000);
    }
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: "#f0f4ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        direction: isRTL ? "rtl" : "ltr"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #173067",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
        <p style={{ marginTop: "1rem" }}>{translations[currentLanguage].loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: "#f0f4ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        direction: isRTL ? "rtl" : "ltr"
      }}>
        <p style={{ color: "#d9534f", fontWeight: "bold" }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#173067",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {translations[currentLanguage].retry}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "#f0f4ff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      direction: isRTL ? "rtl" : "ltr"
    }}>
      <div 
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "50px",
          padding: "0.75rem 1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          flexDirection: isRTL ? "row-reverse" : "row"
        }}
        onClick={() => speak(question)}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <span style={{ 
          fontSize: "1.7rem", 
          fontWeight: "bold", 
          margin: isRTL ? "0 0 0 10px" : "0 10px 0 0" 
        }}>
          {question}
        </span>
        <BsVolumeUp size={24} color="#0073e6" />
      </div>

      <div style={{
        display: "flex",
        gap: "2rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {options.map((card) => (
          <div
            key={card.id}
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "30px",
              backgroundColor: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => handleOptionClick(card.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
          >
            {card.image ? (
              <img 
                src={`http://localhost:8000${card.image}`}
                alt={currentLanguage === 'ar' ? card.title_ar : card.title_en}
                style={{ 
                  width: "80px",
                  height: "80px",
                  objectFit: "contain"
                }}
              />
            ) : (
              <span style={{ fontSize: "4rem" }}>🃏</span>
            )}
            <span style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "0.5rem" }}>
              {currentLanguage === 'ar' ? card.title_ar : card.title_en}
            </span>
          </div>
        ))}
      </div>

      <div 
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: lampColor,
          boxShadow: lampColor !== "#ccc" ? `0 0 20px ${lampColor}` : "none",
          transition: "background-color 0.3s, box-shadow 0.3s",
        }}
      />
    </div>
  );
};

export default Test;
