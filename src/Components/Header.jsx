import React , { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";
import LanguageSwitcher from "./LanguageSwitcher";

function Header() {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { logout, isAuthenticated, user } = useAuth();
  const { currentLanguage, changeLanguage } = useLanguage();

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
    <Navbar className="header-custom" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-bold text-decoration-none text-dark">
            {getTranslation("nav.brand", currentLanguage)}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex gap-3">
            <Nav.Item>
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                {getTranslation("nav.home", currentLanguage)}
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/board"
                className={`nav-link ${location.pathname === "/board" ? "active" : ""}`}
              >
                {getTranslation("nav.board", currentLanguage)}
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/how-to-use"
                className={`nav-link ${location.pathname === "/how-to-use" ? "active" : ""}`}
              >
                {getTranslation("nav.howuse", currentLanguage)}
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/about"
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              >
                {getTranslation("nav.about", currentLanguage)}
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/contact"
                className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
              >
                {getTranslation("nav.contact", currentLanguage)}
              </Link>
            </Nav.Item>
          </Nav>
          
          <div className="d-flex align-items-center gap-3 position-relative">
            {/* Auth Links/Profile Dropdown */}
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-outline-primary rounded-pill me-2"style={{ width:"120px" ,height:"50px"}}>
                  {getTranslation("nav.login", currentLanguage)}
                </Link>
                <Link to="/signup" className="btn btn-primary rounded-pill " style={{ color: "#fff",width:"140px" ,height:"50px"}}>
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
                    className={`position-absolute mt-2 bg-white border rounded shadow-sm ${
                      currentLanguage === "ar" ? "start-0" : "end-0"
                    }`}
                    dir={currentLanguage === "ar" ? "rtl" : "ltr"}
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

                      {/* Language Preferences */}
                      <li className="border-top">
                        <div className="px-3 py-2">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="small text-muted">
                              {getTranslation("profile.language", currentLanguage)}
                            </span>
                            <div className="position-relative">
                              <div
                                className="bg-light rounded-pill d-flex align-items-center position-relative"
                                style={{
                                  width: "80px",
                                  height: "28px",
                                  cursor: "pointer",
                                  padding: "0 5px",
                                  transition: "all 0.3s ease",
                                }}
                                onClick={handleLanguageChange}
                              >
                                <span
                                  className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    top: "4px",
                                    left: currentLanguage === "en" ? "5px" : "55px",
                                    backgroundColor:
                                      currentLanguage === "en" ? "#173067" : "#173067",
                                    color: currentLanguage === "en" ? "#fff" : "#fffff",
                                    transition:
                                      "left 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                                  }}
                                >
                                  {currentLanguage === "en" ? "EN" : "ع"}
                                </span>
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
