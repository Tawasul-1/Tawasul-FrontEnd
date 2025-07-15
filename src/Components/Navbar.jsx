import React, { useState } from "react";
import { BsBellFill, BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { logout, isAuthenticated, user } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  const notifications = ["You have a new message", "New card added", "Profile updated"];

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  const hasProfileImage = !!(user && user.profile_picture);

  return (
    <div className="navbar-container position-relative d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg">
      {/* Logo */}
      <Link to="/" className="text-decoration-none">
        <h3 className="fw-bold m-0" style={{ color: "#173067" }}>
          Tawasul
        </h3>
      </Link>

      {/* Right Side Icons */}
      <div className="d-flex align-items-center gap-3 position-relative">
        {/* Notification Icon */}
        {isAuthenticated && (
          <div className="position-relative">
            <BsBellFill
              size={20}
              style={{ color: "#173067", cursor: "pointer" }}
              onClick={() => setShowNotifications((prev) => !prev)}
            />

            {/* Notification Box */}
            {showNotifications && (
              <div
                className="position-absolute end-0 mt-2 bg-white border rounded shadow-sm"
                style={{ width: "250px", zIndex: 9999 }}
              >
                <div className="p-2 fw-bold border-bottom" style={{ color: "#173067" }}>
                  Notifications
                </div>
                <ul className="list-unstyled m-0">
                  {notifications.length > 0 ? (
                    notifications.map((note, i) => (
                      <li key={i} className="px-3 py-2 border-bottom text-muted small">
                        {note}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-muted small">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Auth Links/Profile Dropdown */}
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="btn btn-outline-primary rounded-pill px-3 me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary rounded-pill px-3">
              Signup
            </Link>
          </>
        ) : (
          <div className="position-relative">
            <img
              src={hasProfileImage ? user.profile_picture : "/image-2.png"}
              alt="Profile"
              className="rounded-circle border"
              width="40"
              height="40"
              onError={(e) => {
                e.target.src = "/image-2.png";
              }}
              style={{ cursor: "pointer" }}
              onClick={() => setShowProfileMenu((prev) => !prev)}
            />

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div
                className="position-absolute end-0 mt-2 bg-white border rounded shadow-sm"
                style={{ width: "200px", zIndex: 9999 }}
              >
                <div className="p-2 fw-bold border-bottom" style={{ color: "#173067" }}>
                  Profile
                </div>
                <ul className="list-unstyled m-0">
                  <li>
                    <Link
                      to="/profile"
                      className="px-3 py-2 d-block text-decoration-none text-muted"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/edit-Profile"
                      className="px-3 py-2 d-block text-decoration-none text-muted"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Edit Profile
                    </Link>
                  </li>
                  <li className="border-top">
                    <button
                      className="px-3 py-2 d-block w-100 text-start border-0 bg-transparent text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Menu Icon */}
        <BsList size={70} style={{ color: "#173067", cursor: "pointer" }} onClick={onMenuClick} />
      </div>
    </div>
  );
};

export default Navbar;
