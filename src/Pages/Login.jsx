import "../Style-pages/Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center background min-vh-100">
      <div className="container px-3 px-md-5">
        <div className="row align-items-center justify-content-center">
          {/* Left Side - Login Box */}
          <div className="col-12 col-md-6">
            <div className="login-box-wrapper text-center text-md-start">
              <h1 className="welcome-text mb-4">
                Welcome <br /> to Tawasul
              </h1>

              <div className="login-box1 shadow-sm mx-auto mx-md-0">
                <div className="text-center mb-4">
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

                {/* Password Field */}
                <div className="input-group mb-4 custom-input-group">
                  <span className="input-group-text">
                    <FaLock style={{ color: "#173067" }} />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <span className="input-group-text">
                    <IoEyeSharp style={{ color: "#173067" }} />
                  </span>
                </div>

                <p className="text-center mb-0">
                  <Link to="/reset">Forget Password? </Link>
                </p>
                {/* Login Button */}
                <button className="btn btn-primary w-100 mb-3 custom-login-btn">
                  Login
                </button>

                <p className="text-center mb-0">
                  Don’t have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="col-md-6 d-none d-md-flex justify-content-center">
            <img
              src="/image-1.png"
              alt="Character"
              className="character-img-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
