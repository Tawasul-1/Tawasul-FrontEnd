import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { BsVolumeUp } from "react-icons/bs";
import CardService from "../api/services/CardService";
import "../Style-pages/Board.css";

const TestCard = () => {
  const { itemName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [showLevels, setShowLevels] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryId = searchParams.get("category");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await CardService.getAllCards();
        
        if (response.data && response.data.results) {
          const foundItem = response.data.results.find(
            card => card.title_en.toLowerCase() === itemName.toLowerCase()
          );
          console.log("Response data:", response.data);
          console.log("Found item:", foundItem);
          
          if (foundItem) {
            setItem(foundItem);
          } else {
            setError("Item not found");
          }
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
        setError("Failed to load cards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [itemName, categoryId]);

  const speak = () => {
    if ("speechSynthesis" in window && item) {
      const utterance = new SpeechSynthesisUtterance(item.title_en);
      speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading item...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-5 text-danger fw-bold">{error}</p>;
  }

  if (!item) {
    return <p className="text-center mt-5 text-danger fw-bold">Item not found</p>;
  }

  const levelBtnStyle = {
    backgroundColor: "#0073e6",
    color: "#fff",
    border: "none",
    padding: "0.6rem 1.5rem",
    borderRadius: "30px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f4ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      {/* Word and sound */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "60px",
          padding: "1rem 2rem",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          cursor: "pointer",
          transition: "transform 0.3s ease",
        }}
        onClick={speak}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span style={{ fontSize: "2rem", fontWeight: "bold", marginRight: "15px" }}>
          {item.title_en}
        </span>
        <BsVolumeUp size={32} color="#0073e6" />
      </div>

      {/* Emoji/image circle */}
      <div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          border: "5px dashed #173067",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.title_en}
            style={{ 
              width: "80%",
              height: "80%",
              objectFit: "contain",
              borderRadius: "50%"
            }}
          />
        ) : (
          <span style={{ fontSize: "6rem" }}>{item.emoji || "🃏"}</span>
        )}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button
          className="color1"
          onClick={() => setShowLevels(true)}
          style={{
            backgroundColor: "#173067",
            color: "#fff",
            border: "none",
            padding: "0.8rem 2rem",
            borderRadius: "40px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0073e6")}
        >
          Go to Test
        </button>

        <button
          onClick={() => navigate(`/how-to-use/cards/?category=${categoryId || ''}`)}
          style={{
            backgroundColor: "#A1A8B0",
            color: "#fff",
            border: "none",
            padding: "0.8rem 2rem",
            borderRadius: "40px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          ← Back to Cards
        </button>
      </div>

      {/* Level selection */}
      {showLevels && (
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Choose Test Level:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button 
              onClick={() => navigate(`/how-to-use/card/test?level=1&card=${item.id}`)}
              style={levelBtnStyle}
            >
              Beginner
            </button>
            <button 
              onClick={() => navigate(`/how-to-use/card/test?level=2&card=${item.id}`)}
              style={levelBtnStyle}
            >
              Intermediate
            </button>
            <button 
              onClick={() => navigate(`/how-to-use/card/test?level=3&card=${item.id}`)}
              style={levelBtnStyle}
            >
              Advanced
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCard;
