import React, { useState } from "react";
import "../Style-pages/Contact.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";

const Contact = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      {/* Header Section */}
      <Navbar onMenuClick={() => setShowSidebar(true)} />
      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

      {/* Contact Title */}
      <div className="contact-hero d-flex justify-content-center align-items-center">
        <h2 className="fw-bold color">Contact Us</h2>
      </div>

      {/* Form + Map */}
      <Container className="my-5 marg">
        <Row className="g-5">
          {/* Contact Form */}
          <Col md={6}>
            <div className="bg-light p-4 rounded-4 shadow-sm">
              <h5
                className="text-center fw-bold mb-4"
                style={{ color: "#173067" }}
              >
                Contact Us
              </h5>
              <Form>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i
                        className="bi bi-person-fill"
                        style={{ color: "#173067" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      className="rounded-end-pill custom-input"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i
                        className="bi bi-telephone-fill"
                        style={{ color: "#173067" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      placeholder="Phone"
                      className="rounded-end-pill custom-input"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i
                        className="bi bi-envelope-fill"
                        style={{ color: "#173067" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="rounded-end-pill custom-input"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i
                        className="bi bi-chat-left-text-fill"
                        style={{ color: "#173067" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Your Message"
                      className="rounded-end-4 custom-input"
                    />
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 rounded-pill"
                  style={{ backgroundColor: "#173067", borderColor: "#173067" }}
                >
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>

          {/* Map */}
          <Col md={6}>
            <div
              className="rounded-4 overflow-hidden shadow-sm"
              style={{ height: "100%" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.739040992053!2d-0.12967878403271732!3d51.50721787963571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b33123ef4f9%3A0x8696dc0b77cdbe0b!2sLondon!5e0!3m2!1sen!2seg!4v1710000000000"
                width="100%"
                height="350"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;
