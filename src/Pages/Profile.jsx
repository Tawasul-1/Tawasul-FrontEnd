import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../Style-pages/Profile.css";
import { BsBellFill, BsList } from "react-icons/bs";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import EditProfileModal from "../Pages/EditProfile";
import CategoryService from "../api/services/CategoryService";
import CardService from "../api/services/CardService";
import useApi from "../api/hooks/useApi";
import { userService } from "../api/services/UserService";
import { getCategoryName } from "../utils/languageUtils";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";
import SubscriptionService from "../api/services/SubscriptionService";
import { FaCrown, FaLock, FaRegCalendarCheck } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import PlanModal from "./Plan";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

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
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
    fetchCategories();
    fetchUserCards();
    fetchSubscription();
  }, []);

  useEffect(() => {
    if (userProfile) {
      console.log("user profile", userProfile);
    }
  }, [userProfile]);

  // Refresh data when navigating back to the profile page
  useEffect(() => {
    fetchUserProfile();
    fetchCategories();
    fetchUserCards();
  }, [location.pathname]);

  // Refresh cards when component becomes visible (e.g., returning from AddNewCard)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchUserCards();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Updated to work with cards_category table structure
    if (Array.isArray(categories?.results) && categories.results.length > 0) {
      const firstCategory = categories.results[0];
      setActiveCategory(firstCategory);
    }
  }, [categories, categoriesError, categoriesLoading, userCards]);

  // Fetch user cards
  const fetchUserCards = async () => {
    try {
      setLoadingCards(true);
      const response = await CardService.getUserCards();
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

      setUserCards(cardsData);
    } catch (error) {
      console.error("Error fetching user cards:", error);
      setUserCards([]); // Ensure userCards is always an array
    } finally {
      setLoadingCards(false);
    }
  };

  // Fetch subscription status
  const fetchSubscription = async () => {
    setSubscriptionLoading(true);
    setSubscriptionError(null);
    try {
      const response = await SubscriptionService.getSubscription();
      console.log("Full subscription response:", response);
      setSubscription(response.data);
    } catch (error) {
      if (error.message === "Resource not found") {
        // No subscription exists for this user, treat as not premium
        setSubscription(null);
        setSubscriptionError(null); // Don't show error
      } else {
        setSubscriptionError(error.message || "Error fetching subscription");
        setSubscription(null);
      }
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // Get cards for a specific category
  const getCardsForCategory = (categoryId) => {
    if (!Array.isArray(userCards)) {
      console.warn("userCards is not an array:", userCards);
      return [];
    }
    const filteredCards = userCards.filter(
      (card) => card.category && card.category.id === categoryId
    );
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

  // Handle cancel subscription
  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    setCancelError(null);
    setCancelSuccess(false);
    try {
      const response = await SubscriptionService.cancelSubscription();
      console.log("Cancel subscription response:", response);
      setCancelSuccess(true);
      fetchSubscription();
    } catch (error) {
      setCancelError(error.message || "Error cancelling subscription");
    } finally {
      setCancelLoading(false);
    }
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
              <p className="mt-3 text-muted">
                {getTranslation("actions.loading", currentLanguage)}
              </p>
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
                <h5>{getTranslation("errors.general", currentLanguage)}</h5>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={fetchUserProfile}>
                  {getTranslation("actions.tryAgain", currentLanguage)}
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
            <div className="profile-card bg-white rounded-4 p-4 text-center shadow-sm position-relative">
              <button
                className="btn btn-link position-absolute top-0 m-2 p-1"
                style={{ zIndex: 2, left: "-120px" }}
                onClick={() => setShowEditModal(true)}
                aria-label="Edit Profile"
              >
                <FiSettings size={22} className="text-secondary" />
              </button>
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
                  userProfile?.last_name?.toUpperCase() ||
                  getTranslation("profile.user", currentLanguage)}
              </h5>
              <hr className="my-2" style={{ borderTop: "1.5px solid #173067" }} />
              <div className="d-flex justify-content-center mt-3">
                <div className="mb-2 small w-100" style={{ maxWidth: 320 }}>
                  <div className="row g-2">
                    <div className="col-3 text-start fw-semibold">
                      {getTranslation("profile.phone", currentLanguage)}:
                    </div>
                    <div className="col-9 text-start">
                      {userProfile?.phone || getTranslation("profile.noPhone", currentLanguage)}
                    </div>
                    <div className="col-3 text-start fw-semibold">
                      {getTranslation("profile.age", currentLanguage)}:
                    </div>
                    <div className="col-9 text-start">
                      {userProfile?.birth_date
                        ? new Date().getFullYear() - new Date(userProfile.birth_date).getFullYear()
                        : getTranslation("profile.notSpecified", currentLanguage)}
                    </div>
                    <div className="col-3 text-start fw-semibold">
                      {getTranslation("profile.email", currentLanguage)}:
                    </div>
                    <div className="col-9 text-start">
                      <a
                        href={`mailto:${userProfile?.email}`}
                        className="text-decoration-none text-muted"
                      >
                        {userProfile?.email || getTranslation("profile.noEmail", currentLanguage)}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Subscription Section - now below the profile card */}
            <div className="mt-3">
              {subscriptionLoading ? (
                <div className="alert alert-info d-flex align-items-center gap-2 py-2">
                  <span className="spinner-border spinner-border-sm" />
                  {getTranslation("actions.loading", currentLanguage)}
                </div>
              ) : subscriptionError ? (
                <div className="alert alert-danger p-2 small">{subscriptionError}</div>
              ) : userProfile?.is_premium ? (
                <div className="card border-success mb-2 shadow-sm rounded-4">
                  <div className="card-body p-3">
                    <div className="d-flex mb-2">
                      <FaCrown className="text-warning me-2" size={22} />
                      <span className="fw-bold text-success">
                        {getTranslation("profile.subscribed", currentLanguage)}
                      </span>
                    </div>
                    {subscription && (
                      <div className=" mb-3 small">
                        <div className="row g-2">
                          <div className="col-6 text-start fw-semibold">Account Type:</div>
                          <div className="col-6 text-start">{subscription.account_type}</div>
                          <div className="col-6 text-start fw-semibold">Status:</div>
                          <div className="col-6 text-start">
                            {subscription.is_subscription_cancelled ? "Cancelled" : "Active"}
                          </div>
                          <div className="col-6 text-start fw-semibold">Premium Start:</div>
                          <div className="col-6 text-start">
                            <FaRegCalendarCheck className="me-1" /> {subscription.premium_start}
                          </div>
                          <div className="col-6 text-start fw-semibold">Premium Expiry:</div>
                          <div className="col-6 text-start">
                            <FaRegCalendarCheck className="me-1" /> {subscription.premium_expiry}
                          </div>
                          <div className="col-6 text-start fw-semibold">Is Premium:</div>
                          <div className="col-6 text-start">
                            {subscription.is_premium ? "Yes" : "No"}
                          </div>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="outline-danger"
                      className="w-100"
                      onClick={handleCancelSubscription}
                      disabled={cancelLoading}
                    >
                      {cancelLoading
                        ? getTranslation("actions.loading", currentLanguage)
                        : getTranslation("profile.cancelSubscription", currentLanguage)}
                    </Button>
                    {cancelError && (
                      <div className="alert alert-danger p-2 small mt-2">{cancelError}</div>
                    )}
                    {cancelSuccess && (
                      <div className="alert alert-success p-2 small mt-2">
                        {getTranslation("profile.cancelSuccess", currentLanguage)}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card border-warning mb-2 shadow-sm rounded-4">
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center mb-2">
                      <FaLock className="text-warning me-2" size={20} />
                      <span className="fw-bold text-warning">
                        {getTranslation("profile.notSubscribed", currentLanguage)}
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() => setShowPlanModal(true)}
                    >
                      {getTranslation("profile.upgrade", currentLanguage)}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Area */}
          <div className="col-12 col-md-8">
            <h4 className="section-title d-flex align-items-center gap-2 mb-3">
              <img src="/Categorize.png" alt="" width="24" height="24" />
              <span style={{ color: "#173067" }} className="fw-semibold">
                {getTranslation("profile.myCategories", currentLanguage)}
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
                        {getCardsForCategory(cat.id).length}{" "}
                        {getTranslation("profile.cards", currentLanguage)}
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

                {loadingCards ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">
                        {getTranslation("profile.loadingCards", currentLanguage)}
                      </span>
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
                            {currentLanguage === "ar" && card.title_ar
                              ? card.title_ar
                              : card.title_en}
                          </p>
                          <button
                            className="btn btn-outline-danger btn-sm mt-2 rounded-pill"
                            onClick={() => handleDeleteCard(card.id)}
                          >
                            {getTranslation("actions.delete", currentLanguage)}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">
                      {getTranslation("profile.noCardsInCategory", currentLanguage)}
                    </p>
                    <Link to="/addnewcard">
                      <button className="btn btn-primary rounded-pill">
                        {getTranslation("cards.addNewCard", currentLanguage)}
                      </button>
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
      {/* Plan Modal */}
      <PlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        onSelectPlan={async (planKey) => {
          if (planKey === "premium") {
            setSubscriptionLoading(true);
            try {
              // Initiate payment for premium plan
              const response = await SubscriptionService.initiatePayment();
              console.log("Payment response:", response.data);

              if (response.data && response.data.payment_url) {
                // Redirect to payment gateway
                console.log("Redirecting to:", response.data.payment_url);
                window.location.href = response.data.payment_url;
              } else if (response.data && response.data.iframe_url) {
                // Handle iframe URL if provided
                console.log("Iframe URL:", response.data.iframe_url);
                window.location.href = response.data.iframe_url;
              } else {
                // If no payment URL, just refresh subscription info
                console.log("No payment URL found, refreshing subscription");
                fetchSubscription();
                setShowPlanModal(false);
              }
            } catch (error) {
              console.error("Payment error:", error);
              setSubscriptionError(error.message || "Error initiating payment");
            } finally {
              setSubscriptionLoading(false);
            }
          } else {
            setShowPlanModal(false);
          }
        }}
      />
    </div>
  );
};

export default Profile;
