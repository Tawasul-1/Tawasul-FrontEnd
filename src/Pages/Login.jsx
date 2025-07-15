import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Style-pages/Login.css";
import { authService } from "../api/services/AuthenticationService";
import { useAuth } from "../context/AuthContext";
import { decodeJWT } from "../utils/tokenExtractor";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
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

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/board";

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
      console.log("Response data structure:", Object.keys(response.data));

      // Use the AuthContext login function
      if (response.data?.access) {
        const userData = decodeJWT(response.data.access);
        login(userData || null, response.data.access, response.data.refresh);
        console.log("Access token stored successfully:", response.data.access);

        // Also store refresh token if available
        if (response.data?.refresh) {
          console.log("Refresh token stored successfully");
        }

        if (response.data.user) {
          console.log("User data stored:", response.data.user);
        }
      } else if (response.data?.token) {
        login(response.data.user || null, response.data.token);
        console.log("Token stored successfully:", response.data.token);
        if (response.data.user) {
          console.log("User data stored:", response.data.user);
        }
      } else if (response.data?.access_token) {
        login(response.data.user || null, response.data.access_token);
        console.log("Access token stored successfully:", response.data.access_token);
        if (response.data.user) {
          console.log("User data stored:", response.data.user);
        }
      } else {
        console.warn("No token found in response:", response.data);
        console.log("Available keys in response:", Object.keys(response.data));
      }

      // Redirect to the intended page or default to board
      navigate(from, { replace: true });
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
        <Col md={7} xl={4}>
          <Card style={{ width: "100%", borderRadius: "2rem", padding: "2rem" }}>
            <Row className="mb-4">
              <Col>
                <h2 className="text-center">Welcom To TAWASUL</h2>
              </Col>
            </Row>
            {generalError && (
              <Alert variant="danger" className="text-center">
                {generalError}
              </Alert>
            )}

            {location.state?.from && (
              <Alert variant="info" className="text-center">
                Please log in to access the requested page.
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
        <Col md={5} xl={4} className="d-flex justify-content-center align-items-center">
          <img
            src="/image-1.png"
            alt="Burger"
            className="img-fluid burger-image d-none d-md-block"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "1rem" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
