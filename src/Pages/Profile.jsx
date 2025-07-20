import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import "../Style-pages/Profile.css";
import { BsBellFill, BsList } from "react-icons/bs";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import EditProfileModal from "../Pages/EditProfile";
import CategoryService from "../api/services/CategoryService";
import CardService from "../api/services/CardService";
import useApi from "../api/hooks/useApi";
import { userService } from "../api/services/UserService";
import { getUserLanguage, getCategoryName } from "../utils/languageUtils";

const Profile = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(false);

  const {
    data: userProfile,
    error,
    loading,
    request: fetchUserProfile,
  } = useApi(userService.getProfile);
  const {
    data: categories,
    error: categoriesError,
    loading: categoriesLoading,
    request: fetchCategories,
  } = useApi(CategoryService.getAllCategories);

  useEffect(() => {
    console.log("Profile component mounted");
    const authToken = localStorage.getItem("authToken");
    console.log("Auth token in localStorage:", authToken ? "Token exists" : "No token");
    console.log("Full localStorage contents:", Object.keys(localStorage));
    console.log("localStorage authToken value:", authToken);
    fetchUserProfile();
    fetchCategories();
    fetchUserCards();
  }, []);

  // Refresh data when navigating back to the profile page
  useEffect(() => {
    console.log("Location changed, refreshing profile data");
    fetchUserProfile();
    fetchCategories();
    fetchUserCards();
  }, [location.pathname]);

  // Refresh cards when component becomes visible (e.g., returning from AddNewCard)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Profile page became visible, refreshing cards");
        fetchUserCards();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (categoriesError) {
      console.log("categoriesError", categoriesError);
    }
    if (categoriesLoading) {
      console.log("categoriesLoading", categoriesLoading);
    }
    // Updated to work with cards_category table structure
    if (Array.isArray(categories?.results) && categories.results.length > 0) {
      const firstCategory = categories.results[0];
      console.log("Setting initial active category:", firstCategory);
      const categoryCards = getCardsForCategory(firstCategory.id);
      setActiveCategory({
        ...firstCategory,
        cards: categoryCards,
      });
    }
  }, [categories, categoriesError, categoriesLoading, userCards]);

  // Fetch user cards
  const fetchUserCards = async () => {
    try {
      setLoadingCards(true);
      const response = await CardService.getUserCards();
      console.log("User cards response:", response);

      // Handle different possible response structures
      let cardsData = [];
      if (response && response.data) {
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          cardsData = response.data;
        }
        // Check if response.data has a results property (common in paginated APIs)
        else if (response.data.results && Array.isArray(response.data.results)) {
          cardsData = response.data.results;
        }
        // Check if response.data has a data property
        else if (response.data.data && Array.isArray(response.data.data)) {
          cardsData = response.data.data;
        }
        // If none of the above, try to use response.data directly
        else {
          console.warn("Unexpected user cards response structure:", response.data);
          cardsData = [];
        }
      }

      console.log("Processed user cards data:", cardsData);
      setUserCards(cardsData);
    } catch (error) {
      console.error("Error fetching user cards:", error);
      setUserCards([]); // Ensure userCards is always an array
    } finally {
      setLoadingCards(false);
    }
  };

  // Get cards for a specific category
  const getCardsForCategory = (categoryId) => {
    if (!Array.isArray(userCards)) {
      console.warn("userCards is not an array:", userCards);
      return [];
    }
    const filteredCards = userCards.filter((card) => card.category.id === categoryId);
    console.log(`Filtering cards for category ${categoryId}:`, filteredCards);
    return filteredCards;
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await CardService.deleteCard(cardId);

      // Remove the card from userCards state
      setUserCards((prevCards) => {
        if (Array.isArray(prevCards)) {
          return prevCards.filter((card) => card.id !== cardId);
        }
        return [];
      });

      // Update active category with updated cards
      if (activeCategory) {
        const updatedCards = getCardsForCategory(activeCategory.id);
        setActiveCategory({
          ...activeCategory,
          cards: updatedCards,
        });
      }

      console.log("Card deleted successfully");
    } catch (error) {
      console.error("Error deleting card:", error);
      // You might want to show an error message to the user here
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    const categoryCards = getCardsForCategory(category.id);
    setActiveCategory({
      ...category,
      cards: categoryCards,
    });
  };

  // Handle profile update
  const handleProfileUpdate = () => {
    fetchUserProfile();
    fetchUserCards(); // Also refresh user cards after profile update
  };

  if (loading || categoriesLoading) {
    return (
      <div className="profile-container bg-light min-vh-100">
        <Navbar
          onMenuClick={() => setShowSidebar(true)}
          onEditProfile={() => setShowEditModal(true)}
        />
        {showSidebar && (
          <Menu setShowSidebar={setShowSidebar} onEditProfile={() => setShowEditModal(true)} />
        )}
        <div className="main-content container py-4">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || categoriesError) {
    return (
      <div className="profile-container bg-light min-vh-100">
        <Navbar
          onMenuClick={() => setShowSidebar(true)}
          onEditProfile={() => setShowEditModal(true)}
        />
        {showSidebar && (
          <Menu setShowSidebar={setShowSidebar} onEditProfile={() => setShowEditModal(true)} />
        )}
        <div className="main-content container py-4">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="text-center">
              <div className="alert alert-danger" role="alert">
                <h5>Error Loading Profile</h5>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={fetchUserProfile}>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container bg-light min-vh-100" id="root">
      {/* Header */}
      <Navbar
        onMenuClick={() => setShowSidebar(true)}
        onEditProfile={() => setShowEditModal(true)}
      />

      {showSidebar && (
        <Menu setShowSidebar={setShowSidebar} onEditProfile={() => setShowEditModal(true)} />
      )}

      {/* Main Content */}
      <div className="main-content container py-4">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-12 col-md-4">
            <div className="profile-card bg-white rounded-4 p-4 text-center shadow-sm">
              <img
                src={userProfile?.profile_picture || "/image-2.png"}
                alt="User"
                className="profile-img mb-3 rounded-circle border"
                width="100"
                height="100"
                onError={(e) => {
                  e.target.src = "/image-2.png";
                }}
              />
              <h5 className="fw-bold mb-1" style={{ color: "#173067" }}>
                {userProfile?.first_name?.toUpperCase() +
                  " " +
                  userProfile?.last_name?.toUpperCase() || "User"}
              </h5>
              <p className="mb-1 text-muted">{userProfile?.phone || "No phone number"}</p>
              <p className="mb-1 text-muted">
                Age:{" "}
                {userProfile?.birth_date
                  ? new Date().getFullYear() - new Date(userProfile.birth_date).getFullYear()
                  : "Not specified"}
              </p>
              <a href={`mailto:${userProfile?.email}`} className="text-decoration-none text-muted">
                {userProfile?.email || "No email"}
              </a>

              <div className="mt-3">
                <Button
                  className="px-4 me-2"
                  style={{ backgroundColor: "#173067", borderColor: "#173067" }}
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="col-12 col-md-8">
            <h4 className="section-title d-flex align-items-center gap-2 mb-3">
              <img src="/Categorize.png" alt="" width="24" height="24" />
              <span style={{ color: "#173067" }} className="fw-semibold">
                My Categories
              </span>
            </h4>

            {/* Categories */}
            <div className="row g-3 mb-4">
              {Array.isArray(categories?.results) &&
                categories.results.map((cat, index) => (
                  <div className="col-4" key={index}>
                    <div
                      className={`category-box ${
                        cat.bg || "bg-light"
                      } shadow-sm p-3 rounded text-center ${
                        activeCategory?.id === cat.id ? "border-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCategorySelect(cat)}
                    >
                      <img
                        src={cat.image}
                        alt={getCategoryName(cat)}
                        className="mb-2"
                        style={{ width: "40px", height: "40px", objectFit: "contain" }}
                        onError={(e) => {
                          e.target.src = "/Categorize.png";
                        }}
                      />
                      <p className="m-0 fw-medium" style={{ color: "#173067" }}>
                        {getCategoryName(cat)}
                      </p>
                      <small className="text-muted">
                        {getCardsForCategory(cat.id).length} cards
                      </small>
                    </div>
                  </div>
                ))}
            </div>

            {/* Cards of Active Category */}
            {activeCategory && (
              <>
                <h5 className="mt-4 d-flex align-items-center gap-2">
                  <img
                    src={activeCategory.image}
                    alt={getCategoryName(activeCategory)}
                    width="24"
                    height="24"
                    onError={(e) => {
                      e.target.src = "/Categorize.png";
                    }}
                  />
                  <span style={{ color: "#173067" }}>{getCategoryName(activeCategory)}</span>
                </h5>

                {console.log("Active category for display:", activeCategory)}
                {console.log("Active category cards:", activeCategory.cards)}

                {loadingCards ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading cards...</span>
                    </div>
                  </div>
                ) : activeCategory.cards && activeCategory.cards.length > 0 ? (
                  <div className="row g-3">
                    {activeCategory.cards.map((card, index) => (
                      <div className="col-6 col-sm-4 col-md-3" key={card.id || index}>
                        <div className="food-card bg-white p-3 rounded text-center shadow-sm">
                          {card.image ? (
                            <img
                              src={card.image}
                              alt={card.title_en || card.title_ar}
                              className="mb-2"
                              style={{ width: "60px", height: "60px", objectFit: "contain" }}
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div style={{ fontSize: "2rem" }}>📄</div>
                          )}
                          <p className="m-0 fw-medium" style={{ color: "#173067" }}>
                            {getUserLanguage() === "ar" && card.title_ar
                              ? card.title_ar
                              : card.title_en}
                          </p>
                          <button
                            className="btn btn-outline-danger btn-sm mt-2 rounded-pill"
                            onClick={() => handleDeleteCard(card.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">No cards in this category yet.</p>
                    <Link to="/addnewcard">
                      <button className="btn btn-primary rounded-pill">Add New Card</button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        userProfile={userProfile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default Profile;
