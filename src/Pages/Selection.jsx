import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style-pages/Selection.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// Categories and cards data
const categories = ["Feeling", "Toys", "Food", "Things", "Study", "Tool"];

const cardsData = {
  Feeling: [
    { emoji: "😍", label: "Love" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😊", label: "Happy" },
    { emoji: "🤩", label: "Enjoy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😭", label: "Crying" },
  ],
  Toys: [
    { emoji: "🧨", label: "Teddy" },
    { emoji: "🚗", label: "Car" },
    { emoji: "🎲", label: "Dice" },
  ],
  Food: [
    { emoji: "🍕", label: "Pizza" },
    { emoji: "🍎", label: "Apple" },
    { emoji: "🍔", label: "Burger" },
  ],
  Things: [
    { emoji: "📱", label: "Phone" },
    { emoji: "💡", label: "Light" },
  ],
  Study: [
    { emoji: "📚", label: "Books" },
    { emoji: "✏️", label: "Pencil" },
  ],
  Tool: [
    { emoji: "🔧", label: "Wrench" },
    { emoji: "🧰", label: "Toolbox" },
  ],
};

const Selection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Feeling");

  return (
    <div className="bg-light min-vh-100">
      <Header />

      {/* Hero */}
      <section
        className="hero-section text-center text-white py-5"
        style={{
          backgroundImage: "url('/bg3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="fw-bold display-4" style={{ color: "#1d2b59" }}>
          Welcome To <span style={{ color: "#1d2b59" }}>TAWASUL</span>
        </h1>

        <div className="container mt-4" style={{ maxWidth: "520px" }}>
          <div className="d-flex">
            <input
              type="text"
              className="form-control rounded-start-pill"
              placeholder="Find Your Card"
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                height: "45px",
                padding: "20px",
              }}
            />
            <button
              className="btn  rounded-end-pill"
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                height: "45px",
                width: "60px",
                background: "#173067",
              }}
            >
              <i className="bi bi-search text-white"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Category Buttons */}
      <div className="container text-center my-4">
        <div className="row justify-content-center">
          {categories.map((cat, idx) => (
            <div className="col-auto px-2 mb-2" key={idx}>
              <button
                className={`btn px-4 py-2 fw-semibold rounded-pill shadow-sm ${
                  selectedCategory === cat
                    ? "btn btn2 text-white"
                    : "btn-outline-bg"
                }`}
                style={{ minWidth: "120px", border: "1px solid #173067" }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
       <div className="container marg pb-5">
        <div className="row g-4 justify-content-center">
          {(cardsData[selectedCategory] || []).map((item, idx) => (
            <div key={idx} className="col-6 col-md-3 col-lg-2">
              <div
                className="card card-emoji text-center p-3 shadow-sm h-100 border-0 d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#eaf1ff",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="emoji" style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
                  {item.emoji}
                </div>
                <h5 className="fw-semibold">{item.label}</h5>
                <button className="btn btn-success text-white btn-sm rounded-pill mt-2 px-4">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Selection;
