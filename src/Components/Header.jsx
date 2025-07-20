import React from "react";
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
  const { isAuthenticated, logout } = useAuth();
  const { currentLanguage } = useLanguage();

  const handleSignout = () => {
    logout();
    // navigate is already called in logout, so no need to call it here
  };

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
          <Nav className="d-flex align-items-center gap-2">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Nav.Item>
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={handleSignout}
                  title={getTranslation("nav.logout", currentLanguage)}
                >
                  <i className="bi bi-box-arrow-right" style={{ fontSize: "1.5rem" }}></i>
                </span>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Link
                    to="/login"
                    className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                  >
                    {getTranslation("nav.login", currentLanguage)}
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/signup"
                    className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`}
                  >
                    {getTranslation("nav.signup", currentLanguage)}
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
