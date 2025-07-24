import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

const Menu = ({ setShowSidebar, onEditProfile }) => {
  const { logout } = useAuth();
  const { currentLanguage } = useLanguage();

  const handleLogout = () => {
    setShowSidebar(false);
    logout();
  };

  const handleEditProfile = () => {
    setShowSidebar(false);
    if (onEditProfile) {
      onEditProfile();
    }
  };

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
            {getTranslation("nav.brand", currentLanguage)}
          </h4>
        </div>

        <div className="px-4 py-3 d-flex flex-column gap-3">
          <Link to="/" style={{ color: "#173067", textDecoration: "none" }}>
            🏠 {getTranslation("nav.home", currentLanguage)}
          </Link>
          <Link to="/board" style={{ color: "#173067", textDecoration: "none" }}>
            🎯 {getTranslation("nav.board", currentLanguage)}
          </Link>
          <Link to="/addnewcard" style={{ color: "#173067", textDecoration: "none" }}>
            ➕ {getTranslation("cards.addNewCard", currentLanguage)}
          </Link>
          <Link to="/about" style={{ color: "#173067", textDecoration: "none" }}>
            ℹ️ {getTranslation("nav.about", currentLanguage)}
          </Link>
          <Link to="/profile" style={{ color: "#173067", textDecoration: "none" }}>
            👤 {getTranslation("nav.profile", currentLanguage)}
          </Link>
          <div
            style={{ color: "#173067", textDecoration: "none", cursor: "pointer" }}
            onClick={handleEditProfile}
          >
            ✏️ {getTranslation("profile.editProfile", currentLanguage)}
          </div>
          <Link to="/selection" style={{ color: "#173067", textDecoration: "none" }}>
            ✅ {getTranslation("nav.selection", currentLanguage)}
          </Link>
          <Link to="/contact" style={{ color: "#173067", textDecoration: "none" }}>
            📞 {getTranslation("nav.contact", currentLanguage)}
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
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right fs-5 me-2 text-white"></i>{" "}
          {getTranslation("nav.logout", currentLanguage)}
        </div>
      </div>
    </div>
  );
};

export default Menu;
