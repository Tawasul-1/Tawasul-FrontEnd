import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LearnDone = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 3000);

    const redirect = setTimeout(() => {
      navigate("/items");
    }, 10000);

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
      }}
    >
      <h1 style={{ color: "#173067", fontSize: "2.5rem", marginBottom: "1rem" }}>
        🎉 Excellent Job!
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#333" }}>
        Now you learned this item, you can use it in the board.
      </p>

      {/* العداد */}
      <p style={{ fontSize: "1.1rem", color: "#555" }}>Redirecting to Items in {count} seconds...</p>
    </div>
  );
};

export default LearnDone;
