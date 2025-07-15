import React from "react";
import { Card, Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Style-pages/AddNewCard.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const AddNewCard = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا ممكن تضيفي منطق الحفظ أو التحقق
    navigate("/success");
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <Container fluid className="flex-grow-1 d-flex align-items-center justify-content-center bg-light-blue py-5 mb-4">
        <Row className="w-100 justify-content-center">
          <Col xs={11} sm={10} md={8} lg={6} xl={5}>
            <Card className="p-4 rounded-4 shadow-sm" style={{ backgroundColor: "#fff" }}>
              <div className="text-center mb-3">
                <i className="bi bi-puzzle" style={{ fontSize: "2rem", color: "#23305e" }}></i>
                <h4 className="fw-bold mt-2" style={{ color: "#23305e" }}>
                  Add New Card
                </h4>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Title Input */}
                <InputGroup className="mb-3 rounded-pill">
                  <InputGroup.Text>
                    <i className="bi bi-card-heading text-primary"></i>
                  </InputGroup.Text>
                  <Form.Control placeholder="Title" />
                </InputGroup>

                {/* Category Select */}
                <InputGroup className="mb-3 rounded-pill">
                  <InputGroup.Text>
                    <i className="bi bi-diagram-3 text-primary"></i>
                  </InputGroup.Text>
                  <Form.Select>
                    <option>Category</option>
                    <option>Animals</option>
                    <option>Actions</option>
                    <option>Food</option>
                  </Form.Select>
                </InputGroup>

                {/* Picture Upload */}
                <div className="mb-4 d-flex align-items-center">
                  <InputGroup className="flex-grow-1 me-2 rounded-pill">
                    <InputGroup.Text>
                      <i className="bi bi-image text-primary"></i>
                    </InputGroup.Text>
                    <Form.Control type="file" />
                  </InputGroup>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit" className="rounded-pill w-100">
                    Add
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddNewCard;
