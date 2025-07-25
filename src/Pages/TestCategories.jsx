import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../Style-pages/CategorieTest.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import CategoryService from "../api/services/CategoryService";
import { useLanguage } from "../context/LanguageContext";

const CategoriesTest = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentLanguage, isRTL } = useLanguage();

  // Translations object
  const translations = {
    en: {
      title: "Categories",
      loading: "Loading...",
      error: "Failed to load categories",
    },
    ar: {
      title: "الفئات",
      loading: "جار التحميل...",
      error: "فشل تحميل الفئات",
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CategoryService.getAllCategories();
        const data = response.data;
        
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && Array.isArray(data.results)) {
          setCategories(data.results);
        } else if (data && typeof data === 'object') {
          setCategories([data]);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError(err.message || translations[currentLanguage].error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [currentLanguage]);

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <div id="root">
        {/* Header Section */}
        <Navbar onMenuClick={() => setShowSidebar(true)} />
        {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

        <div className="main-content">
          <div className="container-fluid text-center py-5">
            <h2
              className="fw-bold text-white"
              style={{
                backgroundColor: "#162b67",
                color: "white",
                borderRadius: "1rem",
                display: "inline-block",
                padding: "0.5rem 2rem",
              }}
            >
              {translations[currentLanguage].title}
            </h2>

            {loading ? (
              <div>{translations[currentLanguage].loading}</div>
            ) : error ? (
              <div style={{ color: "red" }}>{error}</div>
            ) : (
              <div className="container">
                <div className="row justify-content-center mt-5 g-4">
                  {categories.map((cat) => (
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={cat.id}>
                      <Link to={`/how-to-use/cards/?category=${cat.id}`} style={{ textDecoration: "none" }}>
                        <div className="category-box bg-light shadow-sm p-3 rounded text-center">
                          <img
                            src={cat.image}
                            alt={currentLanguage === 'ar' ? cat.name_ar : cat.name_en}
                            style={{ width: "80px", height: "80px", objectFit: "contain", marginBottom: "8px" }}
                            onError={e => { e.target.src = "/Categorize.png"; }}
                          />
                          <p className="m-0 fw-medium" style={{ color: "#173067" }}>
                            {currentLanguage === 'ar' ? cat.name_ar : cat.name_en}
                          </p>
                          <small className="text-muted">
                            {currentLanguage === 'ar' ? cat.name_en : cat.name_ar}
                          </small>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default CategoriesTest;
