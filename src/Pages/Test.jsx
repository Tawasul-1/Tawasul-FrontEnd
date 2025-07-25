import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsVolumeUp } from "react-icons/bs";
import TestService from "../api/services/TestService";

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

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        const testData = await TestService.getTest(cardId, level);
        console.log("test", testData);
        
        setOptions(testData.cards || []);
        setCorrectCardId(testData.correct_card_id || cardId);
        setQuestion(testData.question || `Where is the ${testData.cards?.find(c => c.id == cardId)?.title_en}?`);
      } catch (err) {
        setError("Failed to load test. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [cardId, level]);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const handleOptionClick = (selectedCardId) => {
    const isCorrect = selectedCardId == correctCardId;
    
    setLampColor(isCorrect ? "green" : "red");
    
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
        alignItems: "center"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #173067",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
        <p style={{ marginTop: "1rem" }}>Loading test...</p>
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
        alignItems: "center"
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
          Retry
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
      padding: "1rem"
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
        }}
        onClick={() => speak(question)}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <span style={{ fontSize: "1.7rem", fontWeight: "bold", marginRight: "10px" }}>
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
                alt={card.title_en}
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
              {card.title_en}
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
