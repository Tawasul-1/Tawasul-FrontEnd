import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import "../Style-pages/Login.css";
import { authService } from "../api/services/AuthenticationService";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Debug: Log errors whenever they change
  console.log("Current errors state:", errors);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Clear general error when user starts typing
    if (generalError) {
      setGeneralError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const credentials = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      console.log("Sending login request:", credentials);

      const response = await authService.login(credentials);

      console.log("Login successful:", response.data);

      // Store the token in localStorage
      if (response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }

      // Redirect to home page
      navigate("/board");
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response?.data) {
        const serverErrors = error.response.data;
        console.error("Server errors:", serverErrors);

        // Handle different types of server errors
        if (typeof serverErrors === "object") {
          // Check for 'detail' field (common in Django REST framework)
          if (serverErrors.detail) {
            setGeneralError(serverErrors.detail);
          } else {
            // Handle field-specific errors (arrays of error messages)
            const processedErrors = {};
            Object.keys(serverErrors).forEach((key) => {
              if (Array.isArray(serverErrors[key])) {
                processedErrors[key] = serverErrors[key][0]; // Take first error message
              } else {
                processedErrors[key] = serverErrors[key];
              }
            });
            console.log("Processed errors:", processedErrors);
            setErrors(processedErrors);
          }
        } else if (typeof serverErrors === "string") {
          setGeneralError(serverErrors);
        } else {
          setGeneralError("Login failed. Please try again.");
        }
      } else if (error.message) {
        setGeneralError(error.message);
      } else {
        setGeneralError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center background"
      style={{ height: "100vh", background: "#D4E2F6" }}
    >
      <Row className="w-100 justify-content-center align-items-center">
        <Col xs={12} lg={6} className="d-flex justify-content-center">
          <img
            src="/image-1.png"
            alt="Login Illustration"
            className="img-fluid ms-auto mb-4 d-none d-lg-block"
            style={{ maxWidth: "600px", height: "auto" }}
          />
        </Col>

        <Col xs={12} lg={6} className="d-flex flex-column justify-content-center">
          <Card style={{ width: "100%", maxWidth: "550px", borderRadius: "2rem", padding: "2rem" }}>
            <Row className="mb-4">
              <Col>
                <h2 className="text-center">Login to your account</h2>
              </Col>
            </Row>
            {generalError && (
              <Alert variant="danger" className="text-center">
                {generalError}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              <Row className="mb-3">
                <Col md={12} className="mb-3 mb-md-0">
                  <Form.Group controlId="formEmail">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-envelope-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        required
                      />
                    </InputGroup>
                    {errors.email && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12} className="mb-3 mb-md-0">
                  <Form.Group controlId="formPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        required
                      />
                      <InputGroup.Text
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.password && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col className="text-center">
                  <Button type="submit" className="w-75" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        Logging In...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row>
              <Col className="text-center">
                <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
