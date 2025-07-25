import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../Style-pages/Items.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import CardService from "../api/services/CardService";
import { useAuth } from "../context/AuthContext"; // Import your auth context

const TestCards = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, loading: authLoading } = useAuth(); // Get auth state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check authentication first
        if (!isAuthenticated) {
          throw new Error("Authentication required");
        }

        const response = await CardService.getAllCardsWithPagination({
          category: categoryId,
        });

        setCards(response.data?.results || []);
      } catch (err) {
        console.error("Error fetching cards:", err);
        if (err.message === "Authentication required" || err.response?.status === 401) {
          // Redirect to login if unauthorized
          navigate("/login", { state: { from: location.pathname } });
        } else {
          setError("Failed to load cards. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if auth is loaded and authenticated
    if (!authLoading) {
      if (isAuthenticated) {
        fetchCards();
      } else {
        navigate("/login", { state: { from: location.pathname } });
      }
    }
  }, [categoryId, isAuthenticated, authLoading, navigate]);

  if (authLoading) {
    return (
      <div id="root">
        <Navbar onMenuClick={() => setShowSidebar(true)} />
        <div className="main-content">
          <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Checking authentication...</p>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div id="root">
        <Navbar onMenuClick={() => setShowSidebar(true)} />
        {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

        <div className="main-content">
          <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading cards...</p>
          </Container>
        </div>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div id="root">
        <Navbar onMenuClick={() => setShowSidebar(true)} />
        {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

        <div className="main-content">
          <Container className="mt-5">
            <Alert variant="danger">{error}</Alert>
          </Container>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <>
      <div id="root">
        {/* Header Section */}
        <Navbar onMenuClick={() => setShowSidebar(true)} />
        {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

        <div className="main-content">
          <section className="items-section mb-5 mt-5">
            <Container>
              <div className="items-header text-center">
                <h2 className="category-title">{`${cards.length} Cards`}</h2>
              </div>

              {cards.length === 0 ? (
                <div className="text-center mt-5">
                  <p>No cards found for this category.</p>
                </div>
              ) : (
                <Row className="mt-5 justify-content-center">
                  {cards.map((card) => (
                    <Col
                      xs={4}
                      sm={3}
                      md={2}
                      className="d-flex justify-content-center mb-4"
                      key={card.id}
                    >
                      <Link
                        to={`/how-to-use/card/${card.title_en?.toLowerCase()}?category=${categoryId || ""}`}
                        className="text-decoration-none"
                      >
                        <div className="item-card text-center" role="button">
                          <div className="w-75 overflow-hidden">
                            {<img className="w-100" src={card.image} alt={card.title_en} /> || "🃏"}
                          </div>
                          <div className="item-label">
                            <div className="text-white">{card.title_en || "Card"}</div>
                            <div className="text-white">{card.title_ar || "Card"}</div>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default TestCards;
