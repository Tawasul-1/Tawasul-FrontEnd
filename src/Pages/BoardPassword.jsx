import "../Style-pages/BoardPassword.css";
import { FaLock } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function BoardPassword() {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center background min-vh-100">
      <div className="container px-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="login-box-wrapper text-center">
              <div className="login-box1 shadow-sm p-4 rounded">
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
                <button className="btn btn-primary w-100 custom-login-btn">
                  Un Lock
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardPassword;
