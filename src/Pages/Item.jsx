import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsVolumeUp } from "react-icons/bs";

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

  const speak = () => {
    if ("speechSynthesis" in window && item) {
      const utterance = new SpeechSynthesisUtterance(item.label);
      speechSynthesis.speak(utterance);
    }
  };

  if (!item) {
    return <p className="text-center mt-5 text-danger fw-bold">Item not found</p>;
  }

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
          borderRadius: "50px",
          padding: "0.75rem 1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          cursor: "pointer",
        }}
        onClick={speak}
      >
        <span style={{ fontSize: "1.5rem", fontWeight: "bold", marginRight: "10px" }}>
          {item.label}
        </span>
        <BsVolumeUp size={24} />
      </div>

      {/* دائرة الإيموجي */}
      <div
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "5rem" }}>{item.emoji}</span>
      </div>

      {/* الأزرار */}
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button className="text-white"
          onClick={() => navigate("/test")}
          style={{
            backgroundColor: "#005184",
            color: "#fff",
            border: "none",
            padding: "0.7rem 1.5rem",
            borderRadius: "30px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Go to Test
        </button>

        <button className="text-white"
          onClick={() => navigate("/cat")}
          style={{
            backgroundColor: "#A1A8B0",
            color: "#fff",
            border: "none",
            padding: "0.7rem 1.5rem",
            borderRadius: "30px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          ← Back to Categories
        </button>
      </div>
    </div>
  );
};

export default Item;
