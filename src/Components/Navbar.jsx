import React, { useState } from "react";
import { BsBellFill, BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

const Navbar = ({ onMenuClick, onEditProfile }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { logout, isAuthenticated, user } = useAuth();
  const { currentLanguage, changeLanguage } = useLanguage();

  const notifications = [
    getTranslation("notifications.newMessage", currentLanguage),
    getTranslation("notifications.newCardAdded", currentLanguage),
    getTranslation("notifications.profileUpdated", currentLanguage),
  ];

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    changeLanguage(newLanguage);
  };

  const hasProfileImage = !!(user && user.profile_picture);

  return (
    <div className="navbar-container position-relative d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg">
      {/* Logo */}
      <Link to="/" className="text-decoration-none">
        <h3 className="fw-bold m-0" style={{ color: "#173067" }}>
          {getTranslation("nav.brand", currentLanguage)}
        </h3>
      </Link>

      {/* Right Side Icons */}
      <div className="d-flex align-items-center gap-3 position-relative">
        {/* Notification Icon */}
        {isAuthenticated && (
          <div className="position-relative">
            <BsBellFill
              size={20}
              style={{ color: "#173067", cursor: "pointer" }}
              onClick={() => setShowNotifications((prev) => !prev)}
            />

            {/* Notification Box */}
            {showNotifications && (
              <div
                className="position-absolute end-0 mt-2 bg-white border rounded shadow-sm"
                style={{ width: "250px", zIndex: 9999 }}
              >
                <div className="p-2 fw-bold border-bottom" style={{ color: "#173067" }}>
                  {getTranslation("nav.notifications", currentLanguage)}
                </div>
                <ul className="list-unstyled m-0">
                  {notifications.length > 0 ? (
                    notifications.map((note, i) => (
                      <li key={i} className="px-3 py-2 border-bottom text-muted small">
                        {note}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-muted small">
                      {getTranslation("nav.noNotifications", currentLanguage)}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Auth Links/Profile Dropdown */}
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="btn btn-outline-primary rounded-pill px-3 me-2">
              {getTranslation("nav.login", currentLanguage)}
            </Link>
            <Link to="/signup" className="btn btn-primary rounded-pill px-3">
              {getTranslation("nav.signup", currentLanguage)}
            </Link>
          </>
        ) : (
          <div className="position-relative">
            <img
              src={hasProfileImage ? user.profile_picture : "/image-2.png"}
              alt="Profile"
              className="rounded-circle border"
              width="40"
              height="40"
              onError={(e) => {
                e.target.src = "/image-2.png";
              }}
              style={{ cursor: "pointer" }}
              onClick={() => setShowProfileMenu((prev) => !prev)}
            />

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div
                className="position-absolute end-0 mt-2 bg-white border rounded shadow-sm"
                style={{ width: "250px", zIndex: 9999 }}
              >
                <div className="p-2 fw-bold border-bottom" style={{ color: "#173067" }}>
                  {getTranslation("nav.profile", currentLanguage)}
                </div>
                <ul className="list-unstyled m-0">
                  <li>
                    <Link
                      to="/profile"
                      className="px-3 py-2 d-block text-decoration-none text-muted"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      {getTranslation("nav.viewProfile", currentLanguage)}
                    </Link>
                  </li>
                  <li>
                    <button
                      className="px-3 py-2 d-block w-100 text-start border-0 bg-transparent text-muted"
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (onEditProfile) {
                          onEditProfile();
                        }
                      }}
                    >
                      {getTranslation("profile.editProfile", currentLanguage)}
                    </button>
                  </li>

                  {/* Language Preferences */}
                  <li className="border-top">
                    <div className="px-3 py-2">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="small text-muted">
                          {getTranslation("profile.language", currentLanguage)}
                        </span>
                        <div className="position-relative">
                          <div
                            className="bg-light rounded-pill d-flex align-items-center p-1"
                            style={{
                              width: "80px",
                              height: "28px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                            }}
                            onClick={handleLanguageChange}
                          >
                            <div
                              className={`rounded-circle d-flex align-items-center justify-content-center ${
                                currentLanguage === "en"
                                  ? "bg-primary text-white"
                                  : "bg-white text-muted"
                              }`}
                              style={{
                                width: "20px",
                                height: "20px",
                                fontSize: "10px",
                                fontWeight: "bold",
                                transition: "all 0.3s ease",
                                transform:
                                  currentLanguage === "en" ? "translateX(0)" : "translateX(52px)",
                              }}
                            >
                              {currentLanguage === "en" ? "EN" : "ع"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`small ${
                            currentLanguage === "en" ? "text-primary fw-bold" : "text-muted"
                          }`}
                        >
                          {getTranslation("nav.english", currentLanguage)}
                        </span>
                        <span
                          className={`small ${
                            currentLanguage === "ar" ? "text-primary fw-bold" : "text-muted"
                          }`}
                        >
                          {getTranslation("nav.arabic", currentLanguage)}
                        </span>
                      </div>
                    </div>
                  </li>

                  <li className="border-top">
                    <button
                      className="px-3 py-2 d-block w-100 text-start border-0 bg-transparent text-danger"
                      onClick={handleLogout}
                    >
                      {getTranslation("nav.logout", currentLanguage)}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Menu Icon */}
        <BsList size={40} style={{ color: "#173067", cursor: "pointer" }} onClick={onMenuClick} />
      </div>
    </div>
  );
};

export default Navbar;
