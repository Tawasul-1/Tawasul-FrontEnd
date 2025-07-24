import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style-pages/Selection.css";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import Footer from "../Components/Footer";
import CardService from "../api/services/CardService";
import { getTranslation } from "../utils/translations";
import CategoryService from "../api/services/CategoryService";

const Selection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [boardCards, setBoardCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cardsByCategory, setCardsByCategory] = useState({});

  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch board with categories in a single call
        const response = await CardService.getBoardWithCategories();
        console.log("response", response);
        let data = {};
        if (response && response.data) {
          if (Array.isArray(response.data)) {
            data = response.data;
          } else if (response.data.results && Array.isArray(response.data.results)) {
            data = response.data.results;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            data = response.data.data;
          } else {
            data = response.data;
          }
        }

        // Extract categories and cards from the response
        const cats = data.categories || data.cats || [];
        const cards = data.cards || [];

        setCategories(cats);
        // Set default selected category
        if (cats.length > 0)
          setSelectedCategory(cats[0].name || cats[0].title || cats[0].label || cats[0].id);

        // Group cards by category name
        const grouped = {};
        cards.forEach((card) => {
          const catName =
            card.category?.name ||
            card.category?.title ||
            card.category?.label ||
            card.category?.id ||
            "Other";
          if (!grouped[catName]) grouped[catName] = [];
          grouped[catName].push(card);
        });
        setCardsByCategory(grouped);
      } catch {
        setMessage("Failed to load categories or cards");
      }
    };
    fetchData();

    const fetchBoardCards = async () => {
      try {
        const response = await CardService.getBoardCards();
        let cards = [];
        if (response && response.data) {
          if (Array.isArray(response.data)) {
            cards = response.data;
          } else if (response.data.results && Array.isArray(response.data.results)) {
            cards = response.data.results;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            cards = response.data.data;
          }
        }
        setBoardCards(cards);
      } catch {
        setMessage("Failed to load board cards");
      }
    };
    fetchBoardCards();
  }, []);

  const isCardOnBoard = (label) => {
    return boardCards.some(
      (card) => card.title === label || card.title_en === label || card.title_ar === label
    );
  };

  const handleAddCard = async (title) => {
    setLoading(true);
    setMessage("");
    try {
      await CardService.addCardToBoard(title);
      setMessage(`Card '${title}' added to board!`);
      setBoardCards((prev) => [...prev, { title }]);
    } catch (error) {
      setMessage(`Failed to add card: ${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCard = async (title) => {
    setLoading(true);
    setMessage("");
    try {
      await CardService.removeCardFromBoard(title);
      setMessage(`Card '${title}' removed from board!`);
      setBoardCards((prev) =>
        prev.filter(
          (card) => card.title !== title && card.title_en !== title && card.title_ar !== title
        )
      );
    } catch (error) {
      setMessage(`Failed to remove card: ${error?.message || error}`);
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
          Welcome To <span style={{ color: "#1d2b59" }}>TAWASUL</span>
        </h1>

        <div className="container mt-4" style={{ maxWidth: "520px" }} ir="ltr">
          <div className="d-flex" dir="ltr">
            <input
              type="text"
              dir={getTranslation("direction")}
              className="form-control rounded-start-pill"
              placeholder={getTranslation("find Your Card")}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                height: "45px",
                padding: "20px",
                textAlign: getTranslation("direction") === "rtl" ? "right" : "left",
              }}
            />
            <button
              className="btn  rounded-end-pill"
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

      {/* Category Buttons */}
      <div className="container text-center my-4">
        <div className="row justify-content-center">
          {categories.map((cat, idx) => (
            <div className="col-auto px-2 mb-2" key={cat.id || cat.name || cat.title || idx}>
              <button
                className={`btn px-4 py-2 fw-semibold rounded-pill shadow-sm ${
                  selectedCategory === (cat.name || cat.title || cat.label || cat.id)
                    ? "btn btn2 text-white"
                    : "btn-outline-bg"
                }`}
                style={{ minWidth: "120px", border: "1px solid #173067" }}
                onClick={() => setSelectedCategory(cat.name || cat.title || cat.label || cat.id)}
              >
                {cat.name || cat.title || cat.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="container marg pb-5">
        {/* Show message if exists */}
        {message && (
          <div className="alert alert-info text-center" role="alert">
            {message}
          </div>
        )}
        <div className="row g-4 justify-content-center">
          {(cardsByCategory[selectedCategory] || []).map((item, idx) => (
            <div key={item.id || idx} className="col-6 col-md-3 col-lg-2">
              <div
                className="card card-emoji text-center p-3 shadow-sm h-100 border-0 d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#eaf1ff",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="emoji" style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
                  {item.emoji || "🃏"}
                </div>
                <h5 className="fw-semibold">
                  {item.title || item.label || item.title_en || item.title_ar}
                </h5>
                {isCardOnBoard(item.title || item.label || item.title_en || item.title_ar) ? (
                  <button
                    className="btn btn-danger btn-sm rounded-pill mt-2 px-4"
                    onClick={() =>
                      handleRemoveCard(item.title || item.label || item.title_en || item.title_ar)
                    }
                    disabled={loading}
                  >
                    {loading ? "Removing..." : "Remove"}
                  </button>
                ) : (
                  <button
                    className="btn btn-success text-white btn-sm rounded-pill mt-2 px-4"
                    onClick={() =>
                      handleAddCard(item.title || item.label || item.title_en || item.title_ar)
                    }
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Selection;
