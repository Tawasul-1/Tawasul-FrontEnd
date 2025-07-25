import React from "react";
import { NavLink, Link } from "react-router-dom"; // Use NavLink
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";
import "./Menu.css";

const Menu = ({ setShowSidebar }) => {
  const { logout } = useAuth();
  const { currentLanguage } = useLanguage();

  const handleLogout = () => {
    setShowSidebar(false);
    logout();
  };

  // Define menu links as an array for cleaner code
  const menuLinks = [
    { to: "/", text: getTranslation("nav.home", currentLanguage), icon: "🏠" },
    { to: "/board", text: getTranslation("nav.board", currentLanguage), icon: "🎯" },
    { to: "/selection", text: getTranslation("nav.selection", currentLanguage), icon: "🧩" },
    { to: "/addnewcard", text: getTranslation("cards.addNewCard", currentLanguage), icon: "➕" },
    { to: "/profile", text: getTranslation("nav.profile", currentLanguage), icon: "👤" },
    { to: "/about", text: getTranslation("nav.about", currentLanguage), icon: "ℹ️" },
    { to: "/contact", text: getTranslation("nav.contact", currentLanguage), icon: "📞" },
  ];

  return (
    // Overlay that covers the page
    <div className="menu-overlay" onClick={() => setShowSidebar(false)}>
      {/* The actual sidebar menu */}
      <div className="menu-sidebar" onClick={(e) => e.stopPropagation()}>
        {/* Header/Brand Section */}
        <div className="menu-header">
          <Link to="/" className="menu-brand" onClick={() => setShowSidebar(false)}>
            {getTranslation("nav.brand", currentLanguage)}
          </Link>
        </div>      

        {/* Navigation Links */}
        <nav className="menu-nav">
          {menuLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className="menu-link"
              onClick={() => setShowSidebar(false)}
            >
              <span className="menu-icon">{link.icon}</span>
              {link.text}
            </NavLink>
          ))}
        </nav>

        {/* Footer/Logout Section */}
        <div className="menu-footer">
          <div className="menu-link logout-btn" onClick={handleLogout}>
            <span className="menu-icon">
              <i className="bi bi-box-arrow-right"></i>
            </span>
            {getTranslation("nav.logout", currentLanguage)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;