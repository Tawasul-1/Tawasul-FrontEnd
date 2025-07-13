import React, { useState } from "react";
import { BsBellFill, BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "You have a new message",
    "New card added",
    "Profile updated",
  ];

  return (
    <div className="navbar-container position-relative d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg">
      {/* Logo */}
      <Link to="/" className="text-decoration-none">
        <h3 className="fw-bold m-0" style={{ color: "#173067" }}>Tawasul</h3>
      </Link>

      {/* Right Side Icons */}
      <div className="d-flex align-items-center gap-3 position-relative">
        {/* Notification Icon */}
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
                    <li
                      key={i}
                      className="px-3 py-2 border-bottom text-muted small"
                    >
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

        {/* Profile Image with Link */}
        <Link to="/profile">
          <img
            src="/image-2.png"
            alt="Profile"
            className="rounded-circle border"
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
          />
        </Link>

        {/* Menu Icon */}
        <BsList
          size={24}
          style={{ color: "#173067", cursor: "pointer" }}
          onClick={onMenuClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
