import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { signup } from "../services/authService";
import singupImage from "../assets/signup.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [formData, setFormData] = useState({
    image: null,
    fullName: "",
    email: "",
    age: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    try {
      const result = await signup(formData);
      console.log("Signup successful:", result);
      // Redirect or show success message
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          setGeneralError(data.message);
        } else {
          setGeneralError("Something went wrong. Please try again.");
        }
      } else {
        setGeneralError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6} className="d-flex justify-content-center">
          <img
            src={singupImage}
            alt="Tawasul Logo"
            className="img-fluid mb-4"
            style={{ width: "100%", height: "auto" }}
          />
        </Col>

        <Col xs={12} md={4} lg={6} className="d-flex justify-content-center align-items-center">
          <Card style={{ width: "100%", maxWidth: "600px", borderRadius: "2rem", padding: "2rem" }}>
            <Row className="text-center mb-4">
              <Col>
                <h2>Welcome to Tawasul</h2>
              </Col>
            </Row>

            {generalError && <div className="alert alert-danger text-center">{generalError}</div>}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formImageUpload">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-image"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.image && <div className="text-danger mt-1">{errors.image}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formFullName">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-person-circle"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        name="fullName"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.fullName && <div className="text-danger mt-1">{errors.fullName}</div>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-envelope-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formAge">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-calendar-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Enter age"
                        name="age"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.age && <div className="text-danger mt-1">{errors.age}</div>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formPhone">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-telephone-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        name="phone"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.phone && <div className="text-danger mt-1">{errors.phone}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        onChange={handleChange}
                      />
                      <InputGroup.Text
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formConfirmPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        name="confirmPassword"
                        onChange={handleChange}
                      />
                      <InputGroup.Text
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.confirmPassword && (
                      <div className="text-danger mt-1">{errors.confirmPassword}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col className="text-center">
                  <Button type="submit" className="w-75">
                    Sign Up
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row>
              <Col className="text-center">
                <p>
                  Have an account already? <Link to="/login">Log In</Link>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
