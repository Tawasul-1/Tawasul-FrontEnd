import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import avatar from "../assets/newpassword.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { authService } from "../api/services/AuthenticationService";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";
import "../Style-pages/Login.css";

function NewPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token: urlToken } = useParams();
  const { currentLanguage } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const queryToken = searchParams.get("token");
  const token = urlToken || queryToken;

  // --- Regex for strong password validation ---
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  useEffect(() => {
    if (!token) {
      setError(getTranslation("errors.invalidResetToken", currentLanguage));
    }
  }, [token, currentLanguage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordValidationMessage = getTranslation("validation.passwordInvalid", currentLanguage);

    if (!formData.password) {
      newErrors.password = getTranslation("validation.passwordRequired", currentLanguage);
    } else if (!passwordRegex.test(formData.password)) {
      // Use a more specific error message for regex failure
      newErrors.password = passwordValidationMessage;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = getTranslation(
        "validation.confirmPasswordRequired",
        currentLanguage
      );
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = getTranslation("validation.passwordsDoNotMatch", currentLanguage);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await authService.resetPassword(token, formData.password, formData.confirmPassword);
      setSuccess(getTranslation("success.passwordResetSuccess", currentLanguage));
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response?.data) {
        const serverErrors = error.response.data;
        if (typeof serverErrors === "object") {
          if (serverErrors.detail) {
            setError(serverErrors.detail);
          } else {
            const processedErrors = {};
            Object.keys(serverErrors).forEach((key) => {
              processedErrors[key] = Array.isArray(serverErrors[key])
                ? serverErrors[key][0]
                : serverErrors[key];
            });
            setErrors(processedErrors);
          }
        } else if (typeof serverErrors === "string") {
          setError(serverErrors);
        } else {
          setError(getTranslation("errors.passwordResetFailed", currentLanguage));
        }
      } else {
        setError(error.message || getTranslation("errors.passwordResetFailed", currentLanguage));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", background: "#D4E2F6" }}
    >
      <Row className="w-100 justify-content-center align-items-center">
        <Col xs={12} lg={6} className="d-none d-lg-flex justify-content-center">
          <img
            src={avatar}
            alt="Password Reset Illustration"
            className="img-fluid mb-4"
            style={{ maxWidth: "300px", height: "auto" }}
          />
        </Col>
        <Col xs={12} md={10} lg={6} xl={5}>
          <Card
            className="shadow-sm"
            style={{ width: "100%", maxWidth: "550px", borderRadius: "1.5rem", padding: "2rem" }}
          >
            <Row className="mb-4">
              <Col className="text-center">
                <h3 className="mb-3">{getTranslation("auth.newPassword", currentLanguage)}</h3>
                <p className="text-muted">
                  {getTranslation("auth.newPasswordDesc", currentLanguage)}
                </p>
              </Col>
            </Row>

            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="mb-3">
                {success}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder={getTranslation("auth.newPassword", currentLanguage)}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        // --- CHANGE: Added pattern and title for HTML5 validation and tooltips ---
                        pattern={passwordRegex.source}
                        title={getTranslation("validation.passwordInvalid", currentLanguage)}
                      />
                      <InputGroup.Text
                        onClick={() => setShowPassword((p) => !p)}
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
              <Row className="mb-4">
                <Col>
                  <Form.Group controlId="formConfirmPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={getTranslation("auth.confirmNewPassword", currentLanguage)}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <InputGroup.Text
                        onClick={() => setShowConfirmPassword((p) => !p)}
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
              <Row className="mb-3">
                <Col className="text-center">
                  <Button
                    type="submit"
                    disabled={loading || !token}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        {getTranslation("auth.resetting", currentLanguage)}
                      </>
                    ) : (
                      getTranslation("auth.resetPassword", currentLanguage)
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
            <Row>
              <Col className="text-center">
                <Link to="/login" className="text-decoration-none">
                  {getTranslation("auth.backToLogin", currentLanguage)}
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
