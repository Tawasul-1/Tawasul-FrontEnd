import React, { useState, useEffect } from "react";
import { Card, Form, Button, InputGroup, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Style-pages/AddNewCard.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import CategoryService from "../api/services/CategoryService";
import CardService from "../api/services/CardService";
import { getCategoryName } from "../utils/languageUtils";
import { userService } from "../api/services/UserService";
import { useAuth } from "../context/AuthContext";

const AddNewCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [formData, setFormData] = useState({
    title_en: "",
    title_ar: "",
    category_id: "",
    image: null,
  });

  // Check premium status on component mount
  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        console.log(user);
        if (user?.is_premium) {
          setIsPremium(true);
          return;
        }

        const response = await userService.getProfile();
        setIsPremium(response.data?.is_premium || false);
      } catch (error) {
        console.error("Error checking premium status:", error);
        setIsPremium(false);
      }
    };

    checkPremiumStatus();
  }, [user]);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await CategoryService.getAllCategories();

        let categoriesData = [];
        if (response && response.data) {
          if (Array.isArray(response.data)) {
            categoriesData = response.data;
          } else if (response.data.results && Array.isArray(response.data.results)) {
            categoriesData = response.data.results;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            categoriesData = response.data.data;
          } else {
            console.warn("Unexpected categories response structure:", response.data);
            categoriesData = [];
          }
        }

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading categories:", error);
        setError("Failed to load categories. Please try again.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPremium) {
      setError("Premium subscription required to add cards");
      return;
    }

    if (!formData.title_en || !formData.title_ar || !formData.category_id || !formData.image) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const submitFormData = new FormData();
      submitFormData.append("title_en", formData.title_en);
      submitFormData.append("title_ar", formData.title_ar);
      submitFormData.append("category_id", formData.category_id);
      submitFormData.append("image", formData.image);

      await CardService.addNewCard(submitFormData);
      navigate("/profile");
    } catch (error) {
      console.error("Error adding card:", error);
      setError("Failed to add card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column" id="root">
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <Container
        fluid
        className="main-content flex-grow-1 d-flex align-items-center justify-content-center bg-light-blue py-5 mb-4"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={11} sm={10} md={8} lg={6} xl={5}>
            <Card className="p-4 rounded-4 shadow-sm" style={{ backgroundColor: "#fff" }}>
              <div className="text-center mb-3">
                <i className="bi bi-puzzle" style={{ fontSize: "2rem", color: "#23305e" }}></i>
                <h4 className="fw-bold mt-2" style={{ color: "#23305e" }}>
                  Add New Card
                </h4>
                {!isPremium && (
                  <Alert variant="warning" className="mt-2">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Premium feature - upgrade to add cards
                  </Alert>
                )}
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* English Title Input */}
                <InputGroup className="mb-3 rounded-pill">
                  <InputGroup.Text>
                    <i className="bi bi-card-heading text-primary"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="English Title"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleInputChange}
                    required
                    disabled={!isPremium}
                  />
                </InputGroup>

                {/* Arabic Title Input */}
                <InputGroup className="mb-3 rounded-pill">
                  <InputGroup.Text>
                    <i className="bi bi-card-heading text-primary"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Arabic Title"
                    name="title_ar"
                    value={formData.title_ar}
                    onChange={handleInputChange}
                    required
                    disabled={!isPremium}
                  />
                </InputGroup>

                {/* Category Select */}
                <InputGroup className="mb-3 rounded-pill">
                  <InputGroup.Text>
                    <i className="bi bi-diagram-3 text-primary"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                    disabled={loading || !isPremium}
                  >
                    <option value="">Select Category</option>
                    {Array.isArray(categories) &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {getCategoryName(category)}
                        </option>
                      ))}
                  </Form.Select>
                </InputGroup>

                {/* Picture Upload */}
                <div className="mb-3 d-flex align-items-center">
                  <InputGroup className="flex-grow-1 me-2 rounded-pill">
                    <InputGroup.Text>
                      <i className="bi bi-image text-primary"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      accept="image/*"
                      required
                      disabled={!isPremium}
                    />
                  </InputGroup>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <Button
                    variant={"primary"}
                    type="submit"
                    className="rounded-pill w-100 py-2"
                    disabled={loading || !isPremium}
                  >
                    {loading ? "Adding..." : isPremium ? "Add Card" : "Premium Required"}
                  </Button>
                </div>

                {!isPremium && (
                  <div className="d-grid mt-3">
                    <Button
                      variant={"primary"}
                      className="rounded-pill w-100 py-2"
                      onClick={() => navigate("/profile")}
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddNewCard;
