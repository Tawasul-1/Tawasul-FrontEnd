import "../Style-pages/ResetPassword.css";
import { FaEnvelope } from "react-icons/fa";

function ResetPassword() {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center background min-vh-100">
      <div className="container px-3 px-md-5">
        <div className="row align-items-center justify-content-center">
          {/* Left Side - Login Box */}
          <div className="col-12 col-md-8">
            <div className="login-box-wrapper text-center text-md-start">
              <h1 className="welcome-text mb-4">
                Welcome to Tawasul
              </h1>

              <div className="login-box2 shadow-sm mx-auto mx-md-0">
                <div className="text-center mb-4">
                  <p className="text-center text">Reset Your Password</p>
                  <img
                    src="/image-2.png"
                    alt="Logo"
                    style={{ width: "100px" }}
                  />
                </div>

                {/* Email Field */}
                <div className="input-group mb-4 custom-input-group">
                  <span className="input-group-text">
                    <FaEnvelope style={{ color: "#173067" }} />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                {/* Login Button */}
                <button className="btn btn-primary w-100 mb-3 custom-login-btn">
                  Send Email
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="col-md-4 d-none d-md-flex justify-content-center">
            <img
              src="/image-3.png"
              alt="Character"
              className="character-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
