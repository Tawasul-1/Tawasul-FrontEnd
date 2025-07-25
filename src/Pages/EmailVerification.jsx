import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Spinner, Button } from "react-bootstrap";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { authService } from "../api/services/AuthenticationService";
import { extractTokenFromUrl, decodeJWT, isTokenExpired } from "../utils/tokenExtractor";
import { useLanguage } from "../context/LanguageContext";
import "../Style-pages/EmailVerification.css";

function EmailVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const { currentLanguage, isRTL } = useLanguage();

  // Translations object
  const translations = {
    en: {
      titles: {
        loading: "Verifying Email",
        success: "Email Verified",
        error: "Verification Failed"
      },
      messages: {
        invalidLink: "Invalid verification link. Please check your email and try again.",
        invalidToken: "Invalid verification token format.",
        expiredToken: "Verification link has expired. Please request a new verification email.",
        success: "Email verified successfully! Redirecting to login...",
        genericError: "An error occurred during email verification. Please try again.",
        emailNotFound: "Email address not found. Please try signing up again.",
        resendSuccess: "Verification email sent successfully! Please check your inbox.",
        resendError: "Failed to send verification email. Please try again.",
        redirecting: "Redirecting to login in {countdown} seconds..."
      },
      buttons: {
        goToLogin: "Go to Login Now",
        resendEmail: "Resend Verification Email",
        sending: "Sending...",
        goToLoginAlt: "Go to Login"
      }
    },
    ar: {
      titles: {
        loading: "جارٍ التحقق من البريد الإلكتروني",
        success: "تم التحقق من البريد الإلكتروني",
        error: "فشل التحقق"
      },
      messages: {
        invalidLink: "رابط التحقق غير صالح. يرجى التحقق من بريدك الإلكتروني والمحاولة مرة أخرى.",
        invalidToken: "صيغة رمز التحقق غير صالحة.",
        expiredToken: "انتهت صلاحية رابط التحقق. يرجى طلب بريد تحقق جديد.",
        success: "تم التحقق من البريد الإلكتروني بنجاح! جارٍ التوجيه إلى صفحة تسجيل الدخول...",
        genericError: "حدث خطأ أثناء التحقق من البريد الإلكتروني. يرجى المحاولة مرة أخرى.",
        emailNotFound: "لم يتم العثور على عنوان البريد الإلكتروني. يرجى محاولة التسجيل مرة أخرى.",
        resendSuccess: "تم إرسال بريد التحقق بنجاح! يرجى التحقق من صندوق الوارد.",
        resendError: "فشل إرسال بريد التحقق. يرجى المحاولة مرة أخرى.",
        redirecting: "جارٍ التوجيه إلى تسجيل الدخول خلال {countdown} ثوانٍ..."
      },
      buttons: {
        goToLogin: "الذهاب لتسجيل الدخول الآن",
        resendEmail: "إعادة إرسال بريد التحقق",
        sending: "جارٍ الإرسال...",
        goToLoginAlt: "الذهاب لتسجيل الدخول"
      }
    }
  };

  const t = translations[currentLanguage];

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const verificationToken = token || searchParams.get("token");
        const uid = searchParams.get("uid");

        if (!verificationToken) {
          setStatus("error");
          setMessage(t.messages.invalidLink);
          return;
        }

        if (verificationToken.split(".").length === 3) {
          const decoded = decodeJWT(verificationToken);
          if (!decoded) {
            setStatus("error");
            setMessage(t.messages.invalidToken);
            return;
          }

          if (isTokenExpired(verificationToken)) {
            setStatus("error");
            setMessage(t.messages.expiredToken);
            return;
          }
        }

        await authService.verifyEmail(verificationToken, uid || null);

        setStatus("success");
        setMessage(t.messages.success);

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
          setMessage(t.messages.expiredToken);
        } else {
          setMessage(t.messages.genericError);
        }
      }
    };

    verifyEmail();
  }, [searchParams, navigate, token, currentLanguage]);

  const handleResendVerification = async () => {
    try {
      setStatus("loading");
      setMessage(t.messages.sending);

      const email = searchParams.get("email");
      if (!email) {
        setStatus("error");
        setMessage(t.messages.emailNotFound);
        return;
      }

      await authService.resendVerification(email);
      setStatus("success");
      setMessage(t.messages.resendSuccess);
    } catch (error) {
      console.error("Resend verification error:", error);
      setStatus("error");
      setMessage(t.messages.resendError);
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Container fluid className="verification-container" dir={isRTL ? "rtl" : "ltr"}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="verification-card shadow-lg">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="verification-title mb-3">
                  {t.titles[status]}
                </h2>

                {status === "loading" && (
                  <div className="d-flex justify-content-center mb-3 verification-loading">
                    <Spinner 
                      animation="border" 
                      role="status" 
                      className="verification-spinner"
                      style={{ width: "3rem", height: "3rem" }}
                    >
                      <span className="visually-hidden">{t.titles.loading}</span>
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
                variant={status === "success" ? "success" : status === "error" ? "danger" : "info"}
                className={`verification-alert text-center ${status}-alert`}
              >
                {message}
                {status === "success" && countdown > 0 && (
                  <div className="verification-countdown mt-2">
                    {t.messages.redirecting.replace("{countdown}", countdown)}
                  </div>
                )}
              </Alert>

              <div className="verification-buttons mt-4">
                {status === "success" && (
                  <Button 
                    variant="primary" 
                    className="w-100 py-2"
                    onClick={handleGoToLogin}
                    style={{ borderRadius: "25px", fontWeight: "600" }}
                  >
                    {t.buttons.goToLogin}
                  </Button>
                )}

                {status === "error" && (
                  <>
                    <Button
                      variant="primary"
                      className="w-100 mb-3 py-2"
                      onClick={handleResendVerification}
                      disabled={status === "loading"}
                      style={{ borderRadius: "25px", fontWeight: "600" }}
                    >
                      {status === "loading" ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          {t.buttons.sending}
                        </>
                      ) : (
                        t.buttons.resendEmail
                      )}
                    </Button>

                    <Button 
                      variant="outline-primary" 
                      className="w-100 py-2"
                      onClick={handleGoToLogin}
                      style={{ borderRadius: "25px", fontWeight: "600" }}
                    >
                      {t.buttons.goToLoginAlt}
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
