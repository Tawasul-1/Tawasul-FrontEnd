import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const options = [
  { emoji: "🍅", label: "Tomato", isCorrect: false },
  { emoji: "🍒", label: "Cherry", isCorrect: false },
  { emoji: "🍎", label: "Apple", isCorrect: true },
  { emoji: "🍓", label: "Strawberry", isCorrect: false },
];

const Test3 = () => {
  const [lampColor, setLampColor] = useState("#ccc");
  const navigate = useNavigate();

  const handleClick = (option) => {
    if (option.isCorrect) {
      setLampColor("green");
      setTimeout(() => {
        navigate("/learn");
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
      {/* عنوان السؤال مع زر الصوت */}
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
        <span style={{ fontSize: "1.5rem", fontWeight: "bold", marginRight: "10px" }}>
          Where Apple?
        </span>
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
            onClick={() => handleClick(option)}
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "25px",
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
            <span style={{ fontSize: "3rem" }}>{option.emoji}</span>
            <span style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "0.5rem" }}>
              {option.label}
            </span>
          </div>
        ))}
      </div>

      {/* دائرة اللمبة */}
      <div
        style={{
          width: "50px",
          height: "50px",
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

export default Test3;
