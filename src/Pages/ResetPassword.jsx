import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../Style-pages/ResetPassword.css";
import { authService } from "../api/services/AuthenticationService";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

function ResetPassword() {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authService.requestPasswordReset(email.trim().toLowerCase());
      setSuccess(getTranslation("success.passwordResetSuccess", currentLanguage));

      // Navigate to new password page after 5 seconds
      setTimeout(() => {
        navigate("/new-password"); // Redirect to the new password page
      }, 5000); // 5 seconds delay
    } catch (error) {
      if (error.response?.data) {
        const serverErrors = error.response.data;
        if (typeof serverErrors === "object") {
          if (serverErrors.detail) {
            setError(serverErrors.detail);
          } else if (serverErrors.email) {
            setError(
              Array.isArray(serverErrors.email) ? serverErrors.email[0] : serverErrors.email
            );
          } else {
            setError(getTranslation("errors.passwordResetFailed", currentLanguage));
          }
        } else if (typeof serverErrors === "string") {
          setError(serverErrors);
        } else {
          setError(getTranslation("errors.passwordResetFailed", currentLanguage));
        }
      } else if (error.message) {
        setError(error.message);
      } else {
        setError(getTranslation("errors.passwordResetFailed", currentLanguage));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center background min-vh-100">
      <div className="container px-3 px-md-5">
        <div className="row align-items-center justify-content-center">
          {/* Left Side - Login Box */}
          <div className="col-12 col-md-8">
            <div className="login-box-wrapper text-center text-md-start">
              <div className="login-box2 shadow-sm mx-auto mx-md-0">
                <div className="text-center mb-4">
                  <p className="text-center text">
                    {getTranslation("auth.resetPassword", currentLanguage)}
                  </p>
                  <img src="/image-2.png" alt="Logo" style={{ width: "100px" }} />
                </div>

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
                  {/* Email Field */}
                  <div className="input-group mb-4 custom-input-group">
                    <span className="input-group-text">
                      <FaEnvelope style={{ color: "#173067" }} />
                    </span>
                    <input
                      type="email"
                      className="form-control p-2"
                      placeholder={getTranslation("auth.email", currentLanguage)}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="btn btn-primary w-100 mb-3 custom-login-btn text-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        {getTranslation("auth.sending", currentLanguage)}
                      </>
                    ) : (
                      getTranslation("auth.sendResetEmail", currentLanguage)
                    )}
                  </Button>
                </Form>

                {/* Back to Login Link */}
                <div className="text-center">
                  <Link to="/login" className="text-decoration-none">
                    {getTranslation("auth.backToLogin", currentLanguage)}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="col-md-4 d-none d-md-flex justify-content-center">
            <img src="/image-3.png" alt="Character" className="character-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
