import { useState } from "react";
import "../Style-pages/Profile.css";
import { BsBellFill, BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";

const categories = [
  {
    name: "Food",
    image: "/Food.png",
    icon: "/fork.png",
    bg: "light-blue",
    cards: [
      { label: "Apple", emoji: "🍎" },
      { label: "Banana", emoji: "🍌" },
      { label: "Kiwi", emoji: "🥝" },
      { label: "Burger", emoji: "🍔" },
    ],
  },
  {
    name: "Toys",
    image: "/Toys.png",
    icon: "/Toys.png",
    bg: "light-red",
    cards: [
      { label: "Ball", emoji: "🏀" },
      { label: "Car", emoji: "🚗" },
      { label: "Blocks", emoji: "🧱" },
      { label: "Doll", emoji: "🪆" },
    ],
  },
  {
    name: "Things",
    image: "/Holding.png",
    icon: "/Holding.png",
    bg: "light-yellow",
    cards: [
      { label: "Chair", emoji: "🪑" },
      { label: "Table", emoji: "🛋️" },
      { label: "Bag", emoji: "🎒" },
    ],
  },
  {
    name: "Feeling",
    image: "/People.png",
    icon: "/People.png",
    bg: "light-green",
    cards: [
      { label: "Happy", emoji: "😊" },
      { label: "Sad", emoji: "😢" },
      { label: "Angry", emoji: "😡" },
    ],
  },
];

const Profile = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleDeleteCard = (label) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.name === activeCategory.name) {
        return {
          ...cat,
          cards: cat.cards.filter((card) => card.label !== label),
        };
      }
      return cat;
    });
    setActiveCategory(
      updatedCategories.find((cat) => cat.name === activeCategory.name)
    );
  };

  return (
    <div className="profile-container bg-light min-vh-100">
      {/* Header */}
      <Navbar onMenuClick={() => setShowSidebar(true)} />

      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

      {/* Main Content */}
      <div className="main-content container py-4">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-12 col-md-4">
            <div className="profile-card bg-white rounded-4 p-4 text-center shadow-sm">
              <img
                src="/image-2.png"
                alt="User"
                className="profile-img mb-3 rounded-circle border"
                width="100"
                height="100"
              />
              <h5 className="fw-bold mb-1" style={{ color: "#173067" }}>
                Merna Ahmad
              </h5>
              <p className="mb-1 text-muted">010000000000</p>
              <p className="mb-1 text-muted">Age: 8</p>
              <a
                href="mailto:merna0@gmail.com"
                className="text-decoration-none text-muted"
              >
                merna0@gmail.com
              </a>
              <Link to="/edit-Profile">
                <button className="btn btn-primary mt-3 rounded-pill px-4">
                  Edit Profile
                </button>
              </Link>
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
              {categories.map((cat, index) => (
                <div className="col-6 col-sm-6" key={index}>
                  <div
                    className={`category-box ${cat.bg} shadow-sm p-3 rounded text-center`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <img src={cat.image} alt={cat.name} className="mb-2" />
                    <p className="m-0 fw-medium" style={{ color: "#173067" }}>
                      {cat.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cards of Active Category */}
            <h5 className="mt-4 d-flex align-items-center gap-2">
              <img
                src={activeCategory.icon}
                alt={activeCategory.name}
                width="24"
                height="24"
              />
              <span style={{ color: "#173067" }}>{activeCategory.name}</span>
            </h5>
            <div className="row g-3">
              {activeCategory.cards.map((item, index) => (
                <div className="col-6 col-sm-4 col-md-3" key={index}>
                  <div className="food-card bg-white p-3 rounded text-center shadow-sm">
                    <div style={{ fontSize: "2rem" }}>{item.emoji}</div>
                    <p className="m-0 fw-medium" style={{ color: "#173067" }}>
                      {item.label}
                    </p>
                    <button
                      className="btn btn-outline-danger btn-sm mt-2 rounded-pill"
                      onClick={() => handleDeleteCard(item.label)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
