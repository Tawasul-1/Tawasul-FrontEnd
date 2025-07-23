import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsVolumeUp } from "react-icons/bs";
import "../Style-pages/Board.css";

const items = {
  apple: { emoji: "🍎", label: "Apple" },
  banana: { emoji: "🍌", label: "Banana" },
  grapes: { emoji: "🍇", label: "Grapes" },
  strawberry: { emoji: "🍓", label: "Strawberry" },
  pineapple: { emoji: "🍍", label: "Pineapple" },
  mango: { emoji: "🥭", label: "Mango" },
  watermelon: { emoji: "🍉", label: "Watermelon" },
  cherry: { emoji: "🍒", label: "Cherry" },
  kiwi: { emoji: "🥝", label: "Kiwi" },
  peach: { emoji: "🍑", label: "Peach" },
  lemon: { emoji: "🍋", label: "Lemon" },
  orange: { emoji: "🍊", label: "Orange" },
  coconut: { emoji: "🥥", label: "Coconut" },
  blueberry: { emoji: "🫐", label: "Blueberry" },
  pear: { emoji: "🍐", label: "Pear" },
  corn: { emoji: "🌽", label: "Corn" },
  carrot: { emoji: "🥕", label: "Carrot" },
  tomato: { emoji: "🍅", label: "Tomato" },
};

const Item = () => {
  const { itemName } = useParams();
  const navigate = useNavigate();
  const itemKey = itemName?.toLowerCase();
  const item = items[itemKey];
  const [showLevels, setShowLevels] = useState(false);

  const speak = () => {
    if ("speechSynthesis" in window && item) {
      const utterance = new SpeechSynthesisUtterance(item.label);
      speechSynthesis.speak(utterance);
    }
  };

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
      {/* زر الكلمة والصوت */}
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
          {item.label}
        </span>
        <BsVolumeUp size={32} color="#0073e6" />
      </div>

      {/* دائرة الإيموجي */}
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
        <span style={{ fontSize: "6rem" }}>{item.emoji}</span>
      </div>

      {/* الأزرار */}
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
          onClick={() => navigate("/cat")}
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
          ← Back to Categories
        </button>
      </div>

      {/* اختيار المستوى */}
      {showLevels && (
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Choose Test Level:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button className="color1" onClick={() => navigate("/test?level=beginner")} style={levelBtnStyle}>
              Beginner
            </button>
            <button className="color1" onClick={() => navigate("/test2?level=intermediate")} style={levelBtnStyle}>
              Intermediate
            </button>
            <button className="color1" onClick={() => navigate("/test3?level=advanced")} style={levelBtnStyle}>
              Advanced
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
