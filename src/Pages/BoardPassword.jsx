import "../Style-pages/BoardPassword.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
function BoardPassword() {
  return (
    <>
      <div className="login-wrapper d-flex align-items-center justify-content-center background">
            <div className="container-fluid px-5">
              <div className="row align-items-center justify-content-center">
                {/* Left Side - Login Box */}
                <div className="col-md-6">
                  <div className="login-box-wrapper text-center">
                   
                    <div className="login-box1 shadow-sm">
                      <div className="text-center mb-4">
                        <img
                          src="/image-2.png"
                          alt="Logo"
                          style={{ width: "100px" }}
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
      
                      {/* Login Button */}
                      <button className="btn btn-primary w-100 mb-3 custom-login-btn">
                        Un Lock
                      </button>
      
                    </div>
                  </div>
                </div>
      
                
              </div>
            </div>
          </div>
    </>
  );
}

export default BoardPassword;
