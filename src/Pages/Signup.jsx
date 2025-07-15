import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import signupImage from "/Vector.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import "../Style-pages/Login.css";
import { authService } from "../api/services/AuthenticationService";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Debug: Log errors whenever they change
  console.log("Current errors state:", errors);
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_picture" && files) {
      console.log("File selected:", files[0]);
      console.log("File name:", files[0].name);
      console.log("File size:", files[0].size);
      console.log("File type:", files[0].type);
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
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone number must be 11 digits";
    }

    // Birthdate validation
    if (!formData.birthdate) {
      newErrors.birthdate = "Birthdate is required";
    } else {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      if (calculatedAge < 1 || calculatedAge > 120) {
        newErrors.birthdate = "Age must be between 1 and 120 years";
      }
    }

    // Image validation
    if (!formData.profile_picture) {
      newErrors.profile_picture = "Profile image is required";
    } else if (formData.profile_picture.size > 5 * 1024 * 1024) {
      // 5MB limit
      newErrors.profile_picture = "Image size must be less than 5MB";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Password confirmation validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
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

      if (formData.profile_picture) {
        console.log("Appending file to FormData:", formData.profile_picture);
        console.log("File object:", formData.profile_picture);
        console.log("File instanceof File:", formData.profile_picture instanceof File);
        formDataToSend.append(
          "profile_picture",
          formData.profile_picture,
          formData.profile_picture.name
        );
      }

      // Debug: Log the FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(
          `${key}:`,
          value instanceof File
            ? `File: ${value.name} (${value.size} bytes, type: ${value.type})`
            : value
        );
      }

      // Debug: Check if profile_picture is actually a File object
      const profilePictureEntry = formDataToSend.get("profile_picture");
      console.log("Profile picture entry:", profilePictureEntry);
      console.log("Is File object:", profilePictureEntry instanceof File);
      console.log("File name:", profilePictureEntry?.name);
      console.log("File size:", profilePictureEntry?.size);
      console.log("File type:", profilePictureEntry?.type);

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
          setGeneralError("Registration failed. Please try again.");
        }
      } else if (error.message) {
        setGeneralError(error.message);
      } else {
        setGeneralError("Registration failed. Please try again.");
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
        <Col md={5} xl={4} className="d-flex justify-content-center align-items-center">
          <img
            src={signupImage}
            alt="Burger"
            className="img-fluid burger-image d-none d-md-block"
            style={{ maxWidth: "90%", height: "auto", borderRadius: "1rem" }}
          />
        </Col>

        <Col md={7}  xl={4}>
          <Card style={{ width: "100%", maxWidth: "550px", borderRadius: "2rem", padding: "2rem" }}>
            <h2 className="text-center mb-4 px-3">Welcome to Tawasul</h2>
            {generalError && <div className="alert alert-danger text-center">{generalError}</div>}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-md-3">
                <Col className="mb-3 mb-md-0">
                  <Form.Group controlId="formImageUpload">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-image"></i>
                      </InputGroup.Text>
                      <Form.Control
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
                        type="text"
                        placeholder="Enter first name"
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
                        type="text"
                        placeholder="Enter last name"
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

              <Row className="mb-md-3">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="formBirthdate">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-calendar-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        placeholder="Enter birthdate"
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

              <Row className="mb-md-3">
                <Col md={6} className="mb-3 mb-md-0">
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

                <Col md={6} className="mb-3 mb-md-0">
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

              <Row className="mb-md-3">
                <Col className="text-center">
                  <Button type="submit" className="w-75" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        Signing Up...
                      </>
                    ) : (
                      "Sign Up"
                    )}
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
