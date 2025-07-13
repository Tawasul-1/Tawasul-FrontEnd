import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-custom mt-5 pt-4 pb-3">
      <Container>
        <Row className="mb-4 justify-content-between align-items-start">
          {/* Logo & Social */}
          <Col
            xs={12}
            md={4}
            className="mb-4 mb-md-0 d-flex flex-column align-items-center"
          >
            <h1 className="mb-3">Tawasul</h1>
            <ul className="list-unstyled d-flex gap-3">
              <li>
                <a href="#">
                  <i className="bi bi-facebook footer-social-icon"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-twitter-x footer-social-icon"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-instagram footer-social-icon"></i>
                </a>
              </li>
            </ul>
          </Col>
          {/* Left Links */}
          <Col xs={6} md={2} className="mb-4 mb-md-0">
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/addnewcard" className="text-decoration-none text-dark">
                  <i className="bi bi-plus-square-fill me-2"></i>Add New Card
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none text-dark">
                  <i className="bi bi-telephone-fill me-2"></i>Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-dark">
                  <i className="bi bi-info-circle-fill me-2"></i>About Us
                </Link>
              </li>
            </ul>
          </Col>
          {/* Right Links */}
          <Col xs={6} md={2} className="mb-4 mb-md-0">
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/profile" className="text-decoration-none text-dark">
                  <i className="bi bi-person-circle me-2"></i>Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/edit-profile"
                  className="text-decoration-none text-dark"
                >
                  <i className="bi bi-pencil-square me-2"></i>Edit Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/board" className="text-decoration-none text-dark">
                  <i className="bi bi-kanban-fill me-2"></i>Board
                </Link>
              </li>
            </ul>
          </Col>
          {/* Newsletter */}
          <Col
            xs={10}
            md={3}
            className="mb-4 mb-md-0 d-flex flex-column align-items-center newsletter-section px-4 py-3"
          >
            <h5 className="mb-3 text-white">News Letters</h5>
            <Form className="d-flex w-100 gap-2">
              <Form.Group controlId="formEmail" className="flex-grow-1 mb-0">
                <Form.Control
                  type="email"
                  placeholder="Your Email"
                  className="px-3"
                  style={{ height: "45px"  ,borderRadius:"20px"}}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ height: "45px" }}
              >
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row>
          <Col className="text-center text-muted">
            <p className="mb-0">© 2025 Tawasul. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
