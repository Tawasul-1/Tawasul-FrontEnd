import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style-pages/Selection.css";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import Footer from "../Components/Footer";
import CardService from "../api/services/CardService";
import { getTranslation } from "../utils/translations";
import { getUserLanguage } from "../utils/languageUtils";

const Selection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [boardCards, setBoardCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cardsByCategory, setCardsByCategory] = useState({});
  const [dataReady, setDataReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentLanguage, setCurrentLanguage] = useState(getUserLanguage());

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(getUserLanguage());
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CardService.getAllCards();
        const cards = response?.data?.results || [];

        const lang = localStorage.getItem("lang") || "en";

        const categoryMap = {};
        cards.forEach((card) => {
          const category = card.category;
          if (category && category.id) {
            categoryMap[category.id] = category;
          } else {
            categoryMap["other"] = { id: "other", name_en: "Other", name_ar: "أخرى" };
          }
        });

        const cats = Object.values(categoryMap);
        setCategories(cats);

        if (cats.length > 0) setSelectedCategory(cats[0].id);

        setCategories(cats);
        if (cats.length > 0) setSelectedCategory(cats[0].id);

        const grouped = {};
        cards.forEach((card) => {
          const categoryId = card.category?.id || "other";
          if (!grouped[categoryId]) grouped[categoryId] = [];
          grouped[categoryId].push(card);
        });

        setCardsByCategory(grouped);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load categories or cards");
      }
    };

    const fetchBoardCards = async () => {
      try {
        const response = await CardService.getBoardCards();
        const cards = response?.data?.cards || [];
        setBoardCards(cards);
      } catch {
        setMessage("Failed to load board cards");
      }
    };

    const loadAll = async () => {
      await Promise.all([fetchData(), fetchBoardCards()]);
      setDataReady(true);
    };

    loadAll();
  }, []);

  const isCardOnBoard = (card) => {
    if (!card?.id) return false;
    return boardCards.some((boardCard) => String(boardCard?.id) === String(card.id));
  };

  const handleToggleCard = async (card) => {
    const onBoard = isCardOnBoard(card);
    const label = card.id || card.id || "Card";
    setLoading(true);

    try {
      if (onBoard) {
        await CardService.removeCardFromBoard(card.id);
        setMessage(`Card removed from board!`);
        setBoardCards((prev) => prev.filter((c) => c.id !== card.id));
      } else {
        await CardService.addCardToBoard(card.id);
        setMessage(`Card added to board!`);
        setBoardCards((prev) => [...prev, card]);
      }
    } catch (error) {
      setMessage(`Failed to ${onBoard ? "remove" : "add"} card: ${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100" id="root">
      <Navbar
        onMenuClick={() => setShowSidebar(true)}
        onEditProfile={() => setShowEditModal(true)}
      />

      {showSidebar && (
        <Menu setShowSidebar={setShowSidebar} onEditProfile={() => setShowEditModal(true)} />
      )}

      {/* Hero */}
      <section
        className="hero-section text-center text-white py-5"
        style={{
          backgroundImage: "url('/bg3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="fw-bold display-4" style={{ color: "#1d2b59" }}>
          {getTranslation("welcomeTo")}
        </h1>

        <div className="container mt-4" style={{ maxWidth: "520px" }} ir="ltr">
          <div className="d-flex" dir="ltr">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir={currentLanguage === "ar" ? "rtl" : "ltr"}
              className="form-control rounded-start-pill"
              placeholder={getTranslation("findYourCard")}
              style={{
                textAlign: currentLanguage === "ar" ? "right" : "left",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                height: "45px",
                padding: "20px",
              }}
            />

            <button
              className="btn rounded-end-pill"
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                height: "45px",
                width: "60px",
                background: "#173067",
              }}
            >
              <i className="bi bi-search text-white"></i>
            </button>
          </div>
        </div>
      </section>

      <div className="container text-center my-4">
        <div className="row justify-content-center">
          {categories.map((cat, idx) => (
            <div className="col-auto px-2 mb-2" key={cat.id || idx}>
              <button
                className={`btn px-4 py-2 fw-semibold rounded-pill shadow-sm ${
                  selectedCategory === cat.id ? "btn btn2 text-white" : "btn-outline-bg"
                }`}
                style={{ minWidth: "120px", border: "1px solid #173067" }}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {currentLanguage === "ar" ? cat.name_ar : cat.name_en}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="container marg pb-5">
        {message && (
          <div className="alert alert-info text-center" role="alert">
            {message}
          </div>
        )}

        {!dataReady ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {(cardsByCategory[selectedCategory] || [])
              .filter((item) => {
                const title =
                  currentLanguage === "ar"
                    ? item.title_ar || item.title_en
                    : item.title_en || item.title_ar;
                return title.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((item, idx) => {
                const title =
                  currentLanguage === "ar"
                    ? item.title_ar || item.title_en
                    : item.title_en || item.title_ar;

                const image = item.image;
                const isOnBoard = isCardOnBoard(item);

                return (
                  <div key={item.id || idx} className="col-6 col-md-3 col-lg-2 mb-4">
                    <div
                      className="card card-emoji text-center p-3 shadow-sm h-100 border-0 d-flex flex-column justify-content-between align-items-center"
                      style={{
                        backgroundColor: "#eaf1ff",
                        borderRadius: "20px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center bg-white rounded-3 shadow-sm mb-2"
                        style={{
                          width: "120px",
                          height: "100px",
                          overflow: "hidden",
                        }}
                      >
                        {image ? (
                          <img
                            src={
                              image.startsWith("http") ? image : `http://localhost:8000/${image}`
                            }
                            alt={title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: "2.5rem" }}>📄</span>
                        )}
                      </div>

                      <p className="fw-semibold mb-2" style={{ fontSize: "0.95rem" }}>
                        {title}
                      </p>

                      <button
                        className={`btn btn-sm rounded-pill px-4 w-100 ${
                          isOnBoard ? "btn-danger" : "btn-success text-white"
                        }`}
                        onClick={() => handleToggleCard(item)}
                        disabled={loading}
                      >
                        {loading
                          ? isOnBoard
                            ? getTranslation("removing")
                            : getTranslation("adding")
                          : isOnBoard
                          ? getTranslation("remove")
                          : getTranslation("add")}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Selection;
