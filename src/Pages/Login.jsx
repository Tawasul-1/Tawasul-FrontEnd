import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Card, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Style-pages/Login.css";
import { authService } from "../api/services/AuthenticationService";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  const { isAuthenticated, loading: authLoading, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/board";

  // Redirect if user is already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, from]);

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
      newErrors.email = getTranslation("validation.emailRequired", currentLanguage);
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = getTranslation("validation.invalidEmail", currentLanguage);
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = getTranslation("validation.passwordRequired", currentLanguage);
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

      const response = await authService.login(credentials);

      // Extract token from response
      let token = null;
      if (response.data?.access) {
        token = response.data.access;
      } else if (response.data?.refresh) {
        token = response.data.refresh;
      } else if (response.data?.user) {
        token = response.data.user.token;
      } else if (response.data?.token) {
        token = response.data.token;
      } else if (response.data?.access_token) {
        token = response.data.access_token;
      }

      if (token) {
        // Use AuthContext login function
        login(response.data?.user || response.data, token, response.data?.refresh);
        // Redirect to the intended page or default to board
        navigate(from, { replace: true });
      } else {
        setGeneralError(getTranslation("errors.loginFailed", currentLanguage));
      }
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
            setErrors(processedErrors);
          }
        } else if (typeof serverErrors === "string") {
          setGeneralError(serverErrors);
        } else {
          setGeneralError(getTranslation("errors.loginFailed", currentLanguage));
        }
      } else if (error.message) {
        setGeneralError(error.message);
      } else {
        setGeneralError(getTranslation("errors.loginFailed", currentLanguage));
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <Container
        fluid
        className="d-flex px-5 justify-content-center align-items-center background"
        style={{ height: "100vh", background: "#D4E2F6" }}
      >
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  // Don't render the form if user is already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <Container
      fluid
      className="d-flex px-5 justify-content-center align-items-center background"
      style={{ height: "100vh", background: "#D4E2F6" }}
    >
      <Row className="w-100 justify-content-center align-items-center">
        <Col md={7} xl={4}>
          <Card style={{ width: "100%", maxWidth: "550px", borderRadius: "2rem", padding: "2rem" }}>
            <Row className="mb-4">
              <Col>
                <h2 className="text-center">
                  {getTranslation("auth.loginTitle", currentLanguage)}
                </h2>
              </Col>
            </Row>
            {generalError && (
              <Alert variant="danger" className="text-center">
                {generalError}
              </Alert>
            )}

            {location.state?.from && (
              <Alert variant="info" className="text-center">
                {getTranslation("auth.pleaseLogin", currentLanguage)}
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
                        className="p-2"
                        type="email"
                        placeholder={getTranslation("auth.email", currentLanguage)}
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
                        className="p-2"
                        type={showPassword ? "text" : "password"}
                        placeholder={getTranslation("auth.password", currentLanguage)}
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

              {/* Forgot Password Link */}
              <Row className="mb-3">
                <Col className="text-end">
                  <Link
                    to="/reset-password"
                    className="text-decoration-none"
                    style={{ color: "#173067", fontSize: "0.9rem" }}
                  >
                    {getTranslation("auth.forgotPassword", currentLanguage)}
                  </Link>
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
                        {getTranslation("auth.loggingIn", currentLanguage)}
                      </>
                    ) : (
                      getTranslation("auth.login", currentLanguage)
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row>
              <Col className="text-center">
                <p>
                  {getTranslation("auth.noAccount", currentLanguage)}{" "}
                  <Link to="/signup">{getTranslation("auth.signUp", currentLanguage)}</Link>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={5} xl={3} className="d-flex justify-content-center">
          <img
            src="/image-1.png"
            alt="Login Illustration"
            className="img-fluid ms-auto mb-4 d-none d-md-block"
            style={{ width: "100%", maxWidth: "600px", height: "auto" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
