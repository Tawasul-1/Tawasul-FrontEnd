import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar from "../assets/newpassword.svg";
import "bootstrap-icons/font/bootstrap-icons.css";

function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!formData.password) {
      setErrors({ password: "Password is required" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    // Handle password reset logic here
    console.log("Password reset submitted:", formData);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ Height: "100vh"  }}
    >
      <Row className="w-100 justify-content-center align-items-center">
        {/* Image Column - Hidden on small screens */}
        <Col xs={12} lg={6} className="d-none d-lg-flex justify-content-center align-items-center">
          <img
            src={avatar}
            alt="Password Reset Illustration"
            style={{ maxWidth: "350px", height: "auto" }}
          />
        </Col>

        {/* Form Column */}
        <Col xs={12} md={10} lg={6} xl={5}>
          <Row className="mb-4">
            <Col>
              <h2 className="mb-3">
                Welcome <br /> to Tawasul
              </h2>
            </Col>
          </Row>
          <Card
            className="shadow-sm"
            style={{
              width: "100%",
              maxWidth: "550px",
              borderRadius: "1.5rem",
              padding: "2rem",
            }}
          >
            <Row className="mb-4">
              <Col className="text-center">
                <h3 className="mb-3">New Password</h3>
                <p className="text-muted">Please enter your new password below.</p>
              </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
              {/* New Password Field */}
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <InputGroup.Text
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              {/* Confirm Password Field */}
              <Row className="mb-4">
                <Col>
                  <Form.Group controlId="formConfirmPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <InputGroup.Text
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              {/* Submit Button */}
              <Row className="mb-3">
                <Col className="text-center">
                  <Button type="submit" className="w-100 py-2">
                    Reset Password
                  </Button>
                </Col>
              </Row>
            </Form>

            {/* Back to Login Link */}
            <Row>
              <Col className="text-center">
                <Link to="/login" className="text-decoration-none">
                  Back To Login
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NewPassword;
