import "../Style-pages/Profile.css";
import { BsBellFill, BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <div className="profile-container">
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
      <div className="main-content container">
        <div className="row mt-4">
          {/* Sidebar */}
          <div className="col-12 col-md-4 mb-4">
            <div className="profile-card text-center">
              <img
                src="/image-2.png"
                alt="User"
                className="profile-img mb-2"
                width="100"
                height="100"
              />
              <h5>Merna Ahmad</h5>
              <p>010000000000</p>
              <p>Age: 8</p>
              <a href="mailto:merna0@gmail.com">merna0@gmail.com</a>
              <Link to="/edit-Profile">
              <button className="btn btn-primary mt-2">Edit Profile</button>
              </Link>
            </div>
          </div>

          {/* Main Area */}
          <div className="col-12 col-md-8">
            <h4 className="section-title d-flex align-items-center gap-2">
              <img src="/Categorize.png" alt="" width="24" height="24" />
              My Categories
            </h4>

            {/* Categories */}
            <div className="row g-3 mb-4">
              <div className="col-6 col-sm-6 ">
                <div className="category-box light-blue">
                  <img src="/Food.png" alt="Food" />
                  <p>Food</p>
                </div>
              </div>
              <div className="col-6 col-sm-6 ">
                <div className="category-box light-red">
                  <img src="/Toys.png" alt="Toys" />
                  <p>Toys</p>
                </div>
              </div>
              <div className="col-6 col-sm-6 ">
                <div className="category-box light-yellow">
                  <img src="/Holding.png" alt="Things" />
                  <p>Things</p>
                </div>
              </div>
              <div className="col-6 col-sm-6">
                <div className="category-box light-green">
                  <img src="/People.png" alt="Feeling" />
                  <p>Feeling</p>
                </div>
              </div>
            </div>

            {/* Food Cards */}
            <h5 className="mt-4">
              <img className="fork-img" src="/fork.png" alt="Food" width="24" height="24" />
              Food
            </h5>
            <div className="row g-3">
              <div className="col-6 col-sm-4 col-md-3">
                <div className="food-card">
                  <img src="/Apple.png" alt="Apple" />
                  <p>Apple</p>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-3">
                <div className="food-card">
                  <img src="/Banana.png" alt="Banana" />
                  <p>Banana</p>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-3">
                <div className="food-card">
                  <img src="/Kiwi.png" alt="Kiwi" />
                  <p>Kiwi</p>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-3">
                <div className="food-card">
                  <img src="/Hamburger.png" alt="Burger" />
                  <p>Burger</p>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
