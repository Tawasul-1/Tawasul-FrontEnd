import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const Success = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="p-5 shadow-sm text-center rounded-4">
        <h3 className="mb-3 text-success">✅ Card Added Successfully!</h3>
        <p className="mb-4">
          Redirecting to home in <strong>{countdown}</strong> seconds...
        </p>
        <Spinner animation="border" variant="primary" />
      </Card>
    </Container>
  );
};

export default Success;
