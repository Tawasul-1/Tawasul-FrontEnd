import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ setShowSidebar }) => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
      style={{ zIndex: 9998 }}
      onClick={() => setShowSidebar(false)}
    >
      <div
        className="h-100 shadow d-flex flex-column"
        style={{
          width: "250px",
          backgroundColor: "#fff",
          color: "#173067",
          zIndex: 9999,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-bottom">
          <h4 className="fw-bold" style={{ color: "#173067" }}>
            TAWASUL
          </h4>
        </div>

        <div className="px-4 py-3 d-flex flex-column gap-3">
          <Link to="/" style={{ color: "#173067", textDecoration: "none" }}>
            🏠 Home
          </Link>
          <Link
            to="/addnewcard"
            style={{ color: "#173067", textDecoration: "none" }}
          >
            ➕ Add New Card
          </Link>
          <Link
            to="/about"
            style={{ color: "#173067", textDecoration: "none" }}
          >
            ℹ️ About Us
          </Link>
          <Link
            to="/profile"
            style={{ color: "#173067", textDecoration: "none" }}
          >
            👤 Profile
          </Link>
          <Link
            to="/selection"
            style={{ color: "#173067", textDecoration: "none" }}
          >
            🗂️ Cards
          </Link>
          <Link
            to="/contact"
            style={{ color: "#173067", textDecoration: "none" }}
          >
            📞 Contact Us
          </Link>
        </div>

        <div
          className="text-center d-flex align-items-center justify-content-center text-white"
          style={{
            height: "50px",
            background: "#173067",
            color: "#ffffff",
            cursor: "pointer",
            marginTop: "auto",
          }}
          onClick={() => {
            setShowSidebar(false);
            alert("Logged out");
          }}
        >
          <i className="bi bi-box-arrow-right fs-5 me-2 text-white"></i> Logout
        </div>
      </div>
    </div>
  );
};

export default Menu;