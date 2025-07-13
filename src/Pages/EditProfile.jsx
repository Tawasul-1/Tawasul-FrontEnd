import React, { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import "../Style-pages/EditProfile.css";

function EditProfile() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [profileImage, setProfileImage] = useState("/image-2.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar onMenuClick={() => setShowSidebar(true)} />
      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

      {/* Main Section */}
      <div className="puzzle-bg d-flex justify-content-center align-items-center marg">
        <div className="edit-card-wrapper container">
          <div className="edit-card bg-white p-4 rounded-4 shadow-lg mx-auto" style={{ maxWidth: "500px" }}>
            {/* Profile Image */}
            <div className="position-relative text-center mb-4">
              <img
                src={profileImage}
                alt="avatar"
                className="rounded-circle border border-3"
                style={{ width: "130px", height: "130px", objectFit: "cover" }}
              />
              <input
                type="file"
                accept="image/*"
                id="upload-avatar"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label
                htmlFor="upload-avatar"
                className="position-absolute bottom-0 end-50 translate-middle-x"
                style={{
                  backgroundColor: "#173067",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  cursor: "pointer",
                  border: "2px solid white"
                }}
                title="Change Photo"
              >
                📷
              </label>
            </div>

            {/* Form */}
            <form>
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <img className="icon" src="/Profile.png" alt="" />
                </span>
                <input type="text" className="form-control" placeholder="Merna Ahmad" />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <img className="icon" src="/Email.png" alt="" />
                </span>
                <input type="email" className="form-control" placeholder="merna0@gmail.com" />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <img className="icon" src="/Phone.png" alt="" />
                </span>
                <input type="tel" className="form-control" placeholder="010000000000" />
              </div>

              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <img className="icon" src="/Age.png" alt="" />
                </span>
                <input type="number" className="form-control" placeholder="8" />
              </div>

              <button type="submit" className="btn w-100 rounded-pill text-white" style={{ backgroundColor: "#173067" }}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EditProfile;
