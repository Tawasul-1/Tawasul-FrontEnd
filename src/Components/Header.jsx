import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/AuthContext";

function Header() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleSignout = () => {
    logout();
    // navigate is already called in logout, so no need to call it here
  };

  return (
    <Navbar className="header-custom" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-bold text-decoration-none text-dark">
            Tawasul
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex gap-3">
            <Nav.Item>
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/about"
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/contact"
                className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
              >
                Contact
              </Link>
            </Nav.Item>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Item>
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={handleSignout}
                  title="Sign Out"
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
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/signup"
                    className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`}
                  >
                    Sign Up
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
