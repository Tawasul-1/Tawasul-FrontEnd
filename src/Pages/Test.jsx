import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsVolumeUp, BsLightbulbFill } from "react-icons/bs";

const options = [
  { emoji: "🍎", label: "Apple", isCorrect: true },
  { emoji: "🍌", label: "Banana", isCorrect: false },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
};

const Test = () => {
  const [lampColor, setLampColor] = useState("#ccc");
  const navigate = useNavigate();

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setLampColor("green");
      setTimeout(() => {
        navigate("/test2");
      }, 2000);
    } else {
      setLampColor("red");
    }
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
      {/* السؤال */}
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
        onClick={() => speak("Apple")}
      >
        <span style={{ fontSize: "1.7rem", fontWeight: "bold", marginRight: "10px" }}>
          Where Apple?
        </span>
        <BsVolumeUp size={24} />
      </div>

      {/* الكروت */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleClick(option.isCorrect)}
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
              transition: "transform 0.2s",
            }}
          >
            <span style={{ fontSize: "4rem" }}>{option.emoji}</span>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "0.5rem" }}>
              {option.label}
            </span>
          </div>
        ))}
      </div>

      {/* اللمبة */}
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: lampColor,
          boxShadow:
            lampColor === "#ccc" ? "inset 0 0 10px rgba(0,0,0,0.1)" : `0 0 20px ${lampColor}`,
          transition: "background-color 0.3s, box-shadow 0.3s",
        }}
      ></div>
    </div>
  );
};

export default Test;
