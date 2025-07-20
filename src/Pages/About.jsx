import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

function About() {
  const { currentLanguage } = useLanguage();

  return (
    <>
      <Header />
      <div className="main-content">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-4">
                  {getTranslation("about.title", currentLanguage)}
                </h1>
              </div>

              <Row className="g-5">
                <Col md={6}>
                  <div className="p-4 border rounded-4 shadow-sm h-100">
                    <h3 className="fw-bold mb-3">
                      {getTranslation("about.mission", currentLanguage)}
                    </h3>
                    <p className="text-muted">
                      {getTranslation("about.missionText", currentLanguage)}
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-4 border rounded-4 shadow-sm h-100">
                    <h3 className="fw-bold mb-3">
                      {getTranslation("about.vision", currentLanguage)}
                    </h3>
                    <p className="text-muted">
                      {getTranslation("about.visionText", currentLanguage)}
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-5">
                <Col>
                  <h2 className="text-center mb-4">
                    {getTranslation("about.values", currentLanguage)}
                  </h2>
                </Col>
              </Row>

              <Row className="g-4">
                <Col md={4}>
                  <div className="p-4 border rounded-4 shadow-sm h-100 text-center">
                    <div className="mb-3">
                      <i className="bi bi-heart-fill text-danger" style={{ fontSize: "3rem" }}></i>
                    </div>
                    <h4 className="fw-bold mb-3">
                      {getTranslation("about.inclusivity", currentLanguage)}
                    </h4>
                    <p className="text-muted">
                      {getTranslation("about.inclusivityText", currentLanguage)}
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-4 border rounded-4 shadow-sm h-100 text-center">
                    <div className="mb-3">
                      <i className="bi bi-lightbulb-fill text-warning" style={{ fontSize: "3rem" }}></i>
                    </div>
                    <h4 className="fw-bold mb-3">
                      {getTranslation("about.innovation", currentLanguage)}
                    </h4>
                    <p className="text-muted">
                      {getTranslation("about.innovationText", currentLanguage)}
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-4 border rounded-4 shadow-sm h-100 text-center">
                    <div className="mb-3">
                      <i className="bi bi-emoji-heart-eyes-fill text-success" style={{ fontSize: "3rem" }}></i>
                    </div>
                    <h4 className="fw-bold mb-3">
                      {getTranslation("about.compassion", currentLanguage)}
                    </h4>
                    <p className="text-muted">
                      {getTranslation("about.compassionText", currentLanguage)}
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-5">
                <Col>
                  <div className="p-4 border rounded-4 shadow-sm">
                    <h3 className="fw-bold mb-3">
                      {getTranslation("about.team", currentLanguage)}
                    </h3>
                    <p className="text-muted">
                      {getTranslation("about.teamText", currentLanguage)}
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default About;
