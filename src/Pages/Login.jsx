import "../Style-pages/Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function Login() {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center background">
      <div className="container-fluid px-5">
        <div className="row align-items-center justify-content-center">
          {/* Left Side - Login Box */}
          <div className="col-md-6">
            <div className="login-box-wrapper text-center">
              <h1 className="welcome-text mb-4 text-md-start">
                Welcome <br /> to Tawasul
              </h1>

              <div className="login-box1 shadow-sm">
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
                    <FaEnvelope  style={{color:"#173067"}}/>
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
                    <FaLock  style={{color:"#173067"}}/>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <span className="input-group-text">
                    <IoEyeSharp  style={{color:"#173067"}}/>
                  </span>
                </div>

                {/* Login Button */}
                <button className="btn btn-primary w-100 mb-3 custom-login-btn">
                  Login
                </button>

                <p className="text-center mb-0">
                  Don’t have an account? <a href="#">Sign Up</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="col-md-6 text-center d-none d-md-block">
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
