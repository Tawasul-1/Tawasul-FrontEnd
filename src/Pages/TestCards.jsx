import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../Style-pages/Items.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import CardService from "../api/services/CardService";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const TestCards = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { currentLanguage, isRTL } = useLanguage();
  const navigate = useNavigate();

  // Translations object
  const translations = {
    en: {
      loadingAuth: "Checking authentication...",
      loadingCards: "Loading cards...",
      noCards: "No cards found for this category.",
      cardsTitle: "Cards",
      cardDefault: "Card",
      error: "Failed to load cards. Please try again later.",
      authRequired: "Authentication required"
    },
    ar: {
      loadingAuth: "جارٍ التحقق من المصادقة...",
      loadingCards: "جارٍ تحميل البطاقات...",
      noCards: "لا توجد بطاقات في هذه الفئة.",
      cardsTitle: "البطاقات",
      cardDefault: "بطاقة",
      error: "فشل تحميل البطاقات. يرجى المحاولة مرة أخرى لاحقًا.",
      authRequired: "مطلوب مصادقة"
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!isAuthenticated) {
          throw new Error(translations[currentLanguage].authRequired);
        }

        const response = await CardService.getAllCardsWithPagination({
          category: categoryId,
        });

        setCards(response.data?.results || []);
      } catch (err) {
        console.error("Error fetching cards:", err);
        if (err.message === translations[currentLanguage].authRequired || err.response?.status === 401) {
          navigate("/login", { state: { from: location.pathname } });
        } else {
          setError(translations[currentLanguage].error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (isAuthenticated) {
        fetchCards();
      } else {
        navigate("/login", { state: { from: location.pathname } });
      }
    }
  }, [categoryId, isAuthenticated, authLoading, navigate, currentLanguage]);

  if (authLoading) {
    return (
      <div id="root" dir={isRTL ? "rtl" : "ltr"}>
        <Navbar onMenuClick={() => setShowSidebar(true)} />
        <div className="main-content">
          <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{translations[currentLanguage].loadingAuth}</span>
            </Spinner>
            <p>{translations[currentLanguage].loadingAuth}</p>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div id="root" dir={isRTL ? "rtl" : "ltr"}>
        <Navbar onMenuClick={() => setShowSidebar(true)} />
        {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

        <div className="main-content">
          <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{translations[currentLanguage].loadingCards}</span>
            </Spinner>
            <p>{translations[currentLanguage].loadingCards}</p>
          </Container>
        </div>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div id="root" dir={isRTL ? "rtl" : "ltr"}>
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
    <div id="root" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar onMenuClick={() => setShowSidebar(true)} />
      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

      <div className="main-content">
        <section className="items-section mb-5 mt-5">
          <Container>
            <div className="items-header text-center">
              <h2 className="category-title">
                {cards.length} {translations[currentLanguage].cardsTitle}
              </h2>
            </div>

            {cards.length === 0 ? (
              <div className="text-center mt-5">
                <p>{translations[currentLanguage].noCards}</p>
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
                          {<img className="w-100" src={card.image} alt={currentLanguage === 'ar' ? card.title_ar : card.title_en} /> || "🃏"}
                        </div>
                        <div className="item-label">
                          <div className="text-white">
                            {currentLanguage === 'ar' ? card.title_ar || translations[currentLanguage].cardDefault : card.title_en || translations[currentLanguage].cardDefault}
                          </div>
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

      <Footer />
    </div>
  );
};

export default TestCards;
