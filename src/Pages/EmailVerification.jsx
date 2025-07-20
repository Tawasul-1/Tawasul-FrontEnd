import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Spinner, Button } from "react-bootstrap";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { authService } from "../api/services/AuthenticationService";
import { extractTokenFromUrl, decodeJWT, isTokenExpired } from "../utils/tokenExtractor";
import "../Style-pages/EmailVerification.css";

function EmailVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useParams(); // Extract token from URL path
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Extract token from URL path (format: /verify-email/{token})
        const verificationToken = token || searchParams.get("token");
        const uid = searchParams.get("uid");

        if (!verificationToken) {
          setStatus("error");
          setMessage("Invalid verification link. Please check your email and try again.");
          return;
        }

        // Validate JWT token if it looks like one
        if (verificationToken.split(".").length === 3) {
          const decoded = decodeJWT(verificationToken);
          if (!decoded) {
            setStatus("error");
            setMessage("Invalid verification token format.");
            return;
          }

          if (isTokenExpired(verificationToken)) {
            setStatus("error");
            setMessage("Verification link has expired. Please request a new verification email.");
            return;
          }
        }

        // Call the verification API
        // If uid is not provided, only pass the token (for JWT-based verification)
        await authService.verifyEmail(verificationToken, uid || null);

        setStatus("success");
        setMessage("Email verified successfully! Redirecting to login...");

        // Start countdown for automatic redirect
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate("/login");
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        console.error("Email verification error:", error);
        setStatus("error");

        if (error.response?.data?.detail) {
          setMessage(error.response.data.detail);
        } else if (error.response?.status === 400) {
          setMessage(
            "Invalid or expired verification link. Please request a new verification email."
          );
        } else {
          setMessage("An error occurred during email verification. Please try again.");
        }
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const handleResendVerification = async () => {
    try {
      setStatus("loading");
      setMessage("Sending verification email...");

      const email = searchParams.get("email");
      if (!email) {
        setStatus("error");
        setMessage("Email address not found. Please try signing up again.");
        return;
      }

      await authService.resendVerification(email);
      setStatus("success");
      setMessage("Verification email sent successfully! Please check your inbox.");
    } catch (error) {
      console.error("Resend verification error:", error);
      setStatus("error");
      setMessage("Failed to send verification email. Please try again.");
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Container fluid className="verification-container">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="verification-card">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="verification-title">
                  {status === "loading" && "Verifying Email"}
                  {status === "success" && "Email Verified"}
                  {status === "error" && "Verification Failed"}
                </h2>

                {status === "loading" && (
                  <div className="d-flex justify-content-center mb-3 verification-loading">
                    <Spinner animation="border" role="status" className="verification-spinner">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}

                {status === "success" && (
                  <div className="mb-3 verification-success-animation">
                    <i className="bi bi-check-circle-fill verification-success verification-icon"></i>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-3 verification-error-animation">
                    <i className="bi bi-exclamation-triangle-fill verification-error verification-icon"></i>
                  </div>
                )}
              </div>

              <Alert
                className={`verification-alert ${
                  status === "success"
                    ? "verification-alert-success"
                    : status === "error"
                    ? "verification-alert-error"
                    : "verification-alert-info"
                }`}
              >
                {message}
                {status === "success" && countdown > 0 && (
                  <div className="verification-countdown">
                    Redirecting to login in {countdown} seconds...
                  </div>
                )}
              </Alert>

              <div className="verification-buttons">
                {status === "success" && (
                  <Button className="w-75" onClick={handleGoToLogin}>
                    Go to Login Now
                  </Button>
                )}

                {status === "error" && (
                  <>
                    <Button
                      className="w-75 mb-3"
                      onClick={handleResendVerification}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Sending...
                        </>
                      ) : (
                        "Resend Verification Email"
                      )}
                    </Button>

                    <Button variant="outline-primary" className="w-75" onClick={handleGoToLogin}>
                      Go to Login
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EmailVerification;
