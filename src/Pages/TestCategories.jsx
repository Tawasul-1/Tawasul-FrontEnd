import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Style-pages/CategorieTest.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import CategoryService from "../api/services/CategoryService";

const CategoriesTest = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CategoryService.getAllCategories();
        const data = response.data;
        console.log('Fetched categories response:', data); // Debug log
        // Handle both array and object-with-categories-field
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && Array.isArray(data.results)) {
          setCategories(data.results);
        } else if (data && typeof data === 'object') {
          setCategories([data]); // Wrap single object in array
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
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
              Categories
            </h2>

            {loading ? (
              <div>Loading...</div>
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
                            alt={cat.name_en}
                            style={{ width: "80px", height: "80px", objectFit: "contain", marginBottom: "8px" }}
                            onError={e => { e.target.src = "/Categorize.png"; }}
                          />
                          <p className="m-0 fw-medium" style={{ color: "#173067" }}>{cat.name_en}</p>
                          <small className="text-muted">{cat.name_ar}</small>
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
    </>
  );
};

export default CategoriesTest;
