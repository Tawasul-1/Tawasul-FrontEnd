import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../Style-pages/EditProfile.css";
import { userService } from "../api/services/UserService";
import useApi from "../api/hooks/useApi";

function EditProfileModal({ isOpen, onClose, userProfile, onProfileUpdate }) {
  const [profileImage, setProfileImage] = useState("/image-2.png");
  // --- CHANGE 1: Add state to store the actual image file ---
  const [imageFile, setImageFile] = useState(null); 
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
  });

  const {
    data: updateResponse,
    error: updateError,
    loading: updateLoading,
    request: updateProfile,
  } = useApi(userService.updateProfile);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        first_name: userProfile.first_name || "",
        last_name: userProfile.last_name || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        birth_date: userProfile.birth_date ? userProfile.birth_date.split("T")[0] : "",
      });
      setProfileImage(userProfile.profile_picture || "/image-2.png");
      // Reset image file on modal open
      setImageFile(null);
    }
  }, [userProfile, isOpen]); // Rerun effect when isOpen changes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for preview
      setProfileImage(URL.createObjectURL(file));
      // --- CHANGE 2: Store the file object itself for submission ---
      setImageFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- CHANGE 3: Modify handleSubmit to send multipart/form-data ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();

    // Append text data
    submissionData.append('first_name', formData.first_name);
    submissionData.append('last_name', formData.last_name);
    submissionData.append('email', formData.email);
    submissionData.append('phone', formData.phone);
    submissionData.append('birth_date', formData.birth_date);

    // Append the new image file only if one was selected
    if (imageFile) {
      submissionData.append('profile_picture', imageFile);
    }

    try {
      // The updateProfile service must be able to handle FormData
      await updateProfile(submissionData);
      if (onProfileUpdate) {
        onProfileUpdate();
      }
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      <div
        className="edit-card bg-white p-4 shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#666",
            zIndex: 1,
          }}
        >
          ×
        </button>

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
              border: "2px solid white",
            }}
            title="Change Photo"
          >
            📷
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* ... your form inputs remain the same ... */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <img className="icon" src="/Profile.png" alt="" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <img className="icon" src="/Profile.png" alt="" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <img className="icon" src="/Email.png" alt="" />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <img className="icon" src="/Phone.png" alt="" />
            </span>
            <input
              type="tel"
              className="form-control"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 input-group">
            <span className="input-group-text">
              <img className="icon" src="/Age.png" alt="" />
            </span>
            <input
              type="date"
              className="form-control"
              placeholder="Birth Date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleInputChange}
            />
          </div>

          {updateError && <div className="alert alert-danger mb-3">{updateError}</div>}

          <div className="d-flex gap-2">
            <Button
              type="button"
              className="flex-fill"
              variant="outline-secondary"
              style={{
                backgroundColor: "white",
                borderColor: "#dee2e6",
                color: "#6c757d",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-fill"
              style={{ backgroundColor: "#173067", borderColor: "#173067" }}
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;