import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style-pages/Cat.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";

const categories = [
  {
    title: "Verbs",
    bg: "#eef1ff",
    icon: "/Books.png",
    character: "/2.png",
    path: "/items",
  },
  {
    title: "Sentence",
    bg: "#fff2f2",
    icon: "/Comma.png",
    character: "/3.png",
    path: "/items",
  },
  {
    title: "Food",
    bg: "#eef1ff",
    icon: "/Foods.png",
    character: "/4.png",
    path: "/items",
  },
  {
    title: "Animals",
    bg: "#fff2f2",
    icon: "/Animals.png",
    character: "/5.png",
    path: "/items",
  },
  {
    title: "Vocabulary",
    bg: "#eef1ff",
    icon: "/Vocabulary.png",
    character: "/6.png",
    path: "/items",
  },
];

const Cat = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setShowSidebar(true)} />
      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

      <div className="container-fluid text-center py-5">
        <h2
          className="fw-bold text-white"
          style={{
            backgroundColor: "#162b67",
            color: "white",
            borderRadius: "1rem",
            display: "inline-block",
            padding: "0.5rem 2rem",
          }}
        >
          Categories
        </h2>

        <div className="row justify-content-center mt-5 g-4">
          {categories.map((cat, i) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={i}>
              <Link to={cat.path} style={{ textDecoration: "none" }}>
                <div className="cat-card" style={{ backgroundColor: cat.bg }}>
                  <div className="cat-icon">
                    <img src={cat.icon} alt={cat.title} />
                  </div>
                  <h5 className="cat-title">{cat.title}</h5>
                  <img
                    src={cat.character}
                    alt={cat.title}
                    className="cat-character"
                    style={{ width: "180px", height: "auto" }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cat;
