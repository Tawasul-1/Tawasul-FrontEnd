import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import signupImage from "/Vector.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import "../Style-pages/Login.css";
import { authService } from "../api/services/AuthenticationService";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Debug: Log errors whenever they change
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthdate: "",
    profile_picture: null,
    password: "",
    confirmPassword: "",
  });

  // Redirect if user is already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/board", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_picture" && files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

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

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = getTranslation("validation.firstNameRequired", currentLanguage);
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = getTranslation("validation.firstNameTooShort", currentLanguage);
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = getTranslation("validation.lastNameRequired", currentLanguage);
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = getTranslation("validation.lastNameTooShort", currentLanguage);
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = getTranslation("validation.emailRequired", currentLanguage);
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = getTranslation("validation.invalidEmail", currentLanguage);
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = getTranslation("validation.phoneRequired", currentLanguage);
    } else if (!/^[0-9]{11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = getTranslation("validation.invalidPhone", currentLanguage);
    }

    // Birthdate validation
    if (!formData.birthdate) {
      newErrors.birthdate = getTranslation("validation.birthdateRequired", currentLanguage);
    } else {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      if (calculatedAge < 1 || calculatedAge > 120) {
        newErrors.birthdate = getTranslation("validation.invalidAge", currentLanguage);
      }
    }

    // Image validation
    if (!formData.profile_picture) {
      newErrors.profile_picture = getTranslation(
        "validation.profileImageRequired",
        currentLanguage
      );
    } else if (formData.profile_picture.size > 5 * 1024 * 1024) {
      // 5MB limit
      newErrors.profile_picture = getTranslation("validation.imageSizeTooLarge", currentLanguage);
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = getTranslation("validation.passwordRequired", currentLanguage);
    } else if (formData.password.length < 6) {
      newErrors.password = getTranslation("validation.passwordTooShort", currentLanguage);
    }

    // Password confirmation validation
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
    setGeneralError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const cleanPhone = formData.phone.replace(/\s|-/g, "");

      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.firstName.trim());
      formDataToSend.append("last_name", formData.lastName.trim());
      formDataToSend.append("username", formData.email.trim().split("@")[0].toLowerCase());
      formDataToSend.append("email", formData.email.trim().toLowerCase());
      formDataToSend.append("phone", cleanPhone);
      formDataToSend.append("birth_date", formData.birthdate);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("password2", formData.confirmPassword);

      console.log(
        "profile_picture value:",
        formData.profile_picture,
        "Is File:",
        formData.profile_picture instanceof File
      );
      if (formData.profile_picture) {
        formDataToSend.append(
          "profile_picture",
          formData.profile_picture,
          formData.profile_picture.name
        );
      }
      for (let [key, value] of formDataToSend.entries()) {
        console.log("FormData entry:", key, value, value instanceof File);
      }

      await authService.register(formDataToSend);

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.response?.data) {
        const serverErrors = error.response.data;

        if (typeof serverErrors === "object") {
          if (serverErrors.detail) {
            setGeneralError(serverErrors.detail);
          } else {
            const processedErrors = {};
            Object.keys(serverErrors).forEach((key) => {
              if (Array.isArray(serverErrors[key])) {
                processedErrors[key] = serverErrors[key][0];
              } else {
                processedErrors[key] = serverErrors[key];
              }
            });
            setErrors(processedErrors);
          }
        } else if (typeof serverErrors === "string") {
          setGeneralError(serverErrors);
        } else {
          setGeneralError(getTranslation("errors.signupFailed", currentLanguage));
        }
      } else if (error.message) {
        setGeneralError(error.message);
      } else {
        setGeneralError(getTranslation("errors.signupFailed", currentLanguage));
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
        <Col md={5} xl={4} className="d-flex justify-content-center align-items-center">
          <img
            src={signupImage}
            alt="Burger"
            className="img-fluid burger-image d-none d-md-block"
            style={{ maxWidth: "80%", height: "auto", borderRadius: "1rem" }}
          />
        </Col>

        <Col md={7} xl={4}>
          <Card style={{ width: "100%", maxWidth: "550px", borderRadius: "2rem", padding: "2rem" }}>
            <h2 className="text-center mb-4 px-3">
              {getTranslation("auth.signupTitle", currentLanguage)}
            </h2>
            {generalError && <div className="alert alert-danger text-center">{generalError}</div>}

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row className="mb-md-3">
                <Col className="mb-3 mb-md-0">
                  <Form.Group controlId="formImageUpload">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-image"></i>
                      </InputGroup.Text>
                      <Form.Control
                        className="p-2"
                        type="file"
                        accept="image/*"
                        name="profile_picture"
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                    {errors.profile_picture && (
                      <div className="text-danger mt-1">{errors.profile_picture}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-md-3">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="formFirstName">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-person-circle"></i>
                      </InputGroup.Text>
                      <Form.Control
                        className="p-2"
                        type="text"
                        placeholder={getTranslation("auth.firstName", currentLanguage)}
                        name="firstName"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.firstName && <div className="text-danger mt-1">{errors.firstName}</div>}
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="formLastName">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-person-circle"></i>
                      </InputGroup.Text>
                      <Form.Control
                        className="p-2"
                        type="text"
                        placeholder={getTranslation("auth.lastName", currentLanguage)}
                        name="lastName"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.lastName && <div className="text-danger mt-1">{errors.lastName}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-md-3">
                <Col className="mb-3 mb-md-0">
                  {/* Username field removed: username will be derived from email */}
                </Col>
              </Row>

              <Row className="mb-md-3">
                <Col className="mb-3 mb-md-0">
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
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-md-3">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="formBirthdate">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-calendar-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        className="p-2"
                        type="date"
                        placeholder={getTranslation("auth.birthdate", currentLanguage)}
                        name="birthdate"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.birthdate && <div className="text-danger mt-1">{errors.birthdate}</div>}
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="formPhone">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-telephone-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        className="p-2"
                        type="tel"
                        placeholder={getTranslation("auth.phone", currentLanguage)}
                        name="phone"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.phone && <div className="text-danger mt-1">{errors.phone}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-md-3">
                <Col md={6} className="mb-3 mb-md-0">
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

                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="formConfirmPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        className="p-2"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={getTranslation("auth.confirmPassword", currentLanguage)}
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

              <Row className="mb-md-3">
                <Col className="text-center">
                  <Button type="submit" className="w-75" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        {getTranslation("auth.signingUp", currentLanguage)}
                      </>
                    ) : (
                      getTranslation("auth.signUp", currentLanguage)
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row>
              <Col className="text-center">
                <p>
                  {getTranslation("auth.haveAccount", currentLanguage)}{" "}
                  <Link to="/login">{getTranslation("auth.signIn", currentLanguage)}</Link>
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
