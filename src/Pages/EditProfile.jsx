import Footer from "../Components/Footer";
import { BsBellFill, BsList } from "react-icons/bs";
import "../Style-pages/EditProfile.css";

function EditProfile() {
  return (
    <>
      {/* Header */}
      <div className="profile-header d-flex justify-content-between align-items-center px-4">
        <h2 className="title">Tawassul</h2>
        <div className="header-icons d-flex align-items-center gap-3">
          <BsBellFill size={20} />
          <img src="/image-2.png" alt="Profile" className="rounded-circle" />
          <BsList size={24} />
        </div>
      </div>

      {/* Main Content */}
      <div className="puzzle-bg d-flex justify-content-center align-items-center">
        <div className="edit-card-wrapper container">
          <div className="edit-card p-4 shadow rounded mx-auto">
            <div className="text-center mb-4">
              <img
                src="/image-2.png"
                alt="avatar"
                className="rounded-circle avatar-img"
              />
            </div>

            <form>
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <img className="icon" src="/Profile.png" alt="" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Merna Ahmad"
                />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <img className="icon" src="/Email.png" alt="" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="merna0@gmail.com"
                />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <img className="icon" src="/Phone.png" alt="" />
                </span>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="010000000000"
                />
              </div>

              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <img className="icon" src="/Age.png" alt="" />
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="8"
                />
              </div>

              <button type="submit" className="btn save-btn w-100">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default EditProfile