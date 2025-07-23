import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const Payment = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query params
  const params = new URLSearchParams(location.search);
  const isSuccess = params.get("success") === "true";
  const email = params.get("email");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/profile");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f8f9fa' }}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ minHeight: '100vh' }}>
        <Card className="p-5 shadow-sm text-center rounded-4">
          {isSuccess ? (
            <h3 className="mb-3 text-success">✅ Payment Successful!</h3>
          ) : (
            <h3 className="mb-3 text-danger">❌ Payment Failed.</h3>
          )}
          {email && (
            <div className="mb-2 text-muted small">{email}</div>
          )}
          <p className="mb-4">
            Redirecting to home in <strong>{countdown}</strong> seconds...
          </p>
          <Spinner animation="border" variant="primary" />
        </Card>
      </Container>
    </div>
  );
};

export default Payment;
