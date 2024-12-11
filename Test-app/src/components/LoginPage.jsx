import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginPage.css"; // Custom styles for animations
import logo from "../assets/logo-removebg-preview.png";
import adminlg from "../assets/login/personnel-ezgif.com-gif-maker.gif";
import userlg from "../assets/login/add-user-ezgif.com-gif-maker.gif";

const LoginPage = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [adminErrorMessage, setAdminErrorMessage] = useState("");
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setIsAdminLoading(true);
    setTimeout(() => {
      if (adminUsername === "admin" && adminPassword === "admin123") {
        setAdminErrorMessage("");
        navigate("/admin");
      } else {
        setAdminErrorMessage("Invalid admin credentials. Please try again.");
      }
      setIsAdminLoading(false);
    }, 1500); // Simulate a delay
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    setIsUserLoading(true);
    setTimeout(() => {
      const storedEmail = localStorage.getItem("userEmail");
      const storedContact = localStorage.getItem("userContact");

      if (userEmail === storedEmail && userPassword === storedContact) {
        setUserErrorMessage("");
        navigate("/instructions"); // Redirect to instructions page
      } else {
        setUserErrorMessage("Invalid email or password. Please try again.");
      }
      setIsUserLoading(false);
    }, 1500); // Simulate a delay
  };

  const handleRegisterClick = () => {
    setIsRegisterLoading(true);
    setTimeout(() => {
      navigate("/register");
      setIsRegisterLoading(false);
    }, 1500);
  };

  return (
    <div
      className="login-page loginbg text-white d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card main-card shadow-lg p-4">
        {/* Card Header */}
        <div className="card-header d-flex align-items-center text-white">
          <img
            src={logo}
            alt="Logo"
            className="logo me-3"
            style={{ width: "50px", height: "50px" }}
          />
          <h1 className="mb-0 faculty-glyphic-regular">
            Welcome to Quest Informatics
          </h1>
        </div>
        {/* Card Body */}
        <div className="card-body nunito-nun">
          <div className="row">
            {/* Admin Login Card */}
            <div className="col-md-6 mb-4">
              <div className="card login-card admin-card text-white shadow-sm">
                <img
                  src={adminlg}
                  className="card-img-top ps-5 pe-5 ms-5"
                  alt="Admin Login GIF"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Admin Login</h5>
                  <form onSubmit={handleAdminLogin}>
                    <div className="mb-3 input-group">
                      <span className="input-group-text text-black">
                        <i className="bi bi-person-fill"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control input-animate"
                        placeholder="admin"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 input-group">
                      <span className="input-group-text text-black">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control input-animate"
                        placeholder="admin123"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                    </div>
                    {adminErrorMessage && (
                      <div className="text-danger mb-3">{adminErrorMessage}</div>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                      {isAdminLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* User Login Card */}
            <div className="col-md-6 mb-4">
              <div className="card login-card user-card text-white shadow-sm">
                <img
                  src={userlg}
                  className="card-img-top ps-5 pe-5 ms-5"
                  alt="User Login GIF"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">User Login</h5>
                  <form onSubmit={handleUserLogin}>
                    <div className="mb-3 input-group">
                      <span className="input-group-text text-black">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control input-animate"
                        placeholder="Enter your email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 input-group">
                      <span className="input-group-text text-black">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control input-animate"
                        placeholder="Enter your password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required
                      />
                    </div>
                    {userErrorMessage && (
                      <div className="text-danger mb-3">{userErrorMessage}</div>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                      {isUserLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-3">
                    <span> Don&apos;t have an account? </span>
                    <button
                      onClick={handleRegisterClick}
                      className="btn btn-link text-light text-decoration-underline"
                    >
                      {isRegisterLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Register here"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
