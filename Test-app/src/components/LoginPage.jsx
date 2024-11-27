import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Check admin credentials
    if (adminUsername === "admin" && adminPassword === "admin123") {
      setErrorMessage("");
      navigate("/admin"); // Redirect to admin page
    } else {
      setErrorMessage("Invalid admin credentials. Please try again.");
    }
  };

  return (
    <div className="text-white" style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Logo</span>
          <span className="text-center w-100 h1">Quest Informatics</span>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="row w-100">
          {/* Admin Login */}
          <div className="col-lg-6 mb-3">
            <div className="card bg-secondary text-white shadow-lg">
              <div className="card-body">
                <h4 className="card-title text-center">Welcome Back - Admin Login</h4>
                <form onSubmit={handleAdminLogin}>
                  <div className="mb-3">
                    <label htmlFor="adminUsername" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="adminUsername"
                      placeholder="admin"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="adminPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="adminPassword"
                      placeholder="admin123"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                  {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                  <button type="submit" className="btn btn-primary w-100">Sign In</button>
                </form>
              </div>
            </div>
          </div>

          {/* User Login */}
          <div className="col-lg-6 mb-3">
            <div className="card bg-secondary text-white shadow-lg">
              <div className="card-body">
                <h4 className="card-title text-center">Welcome Back - User Login</h4>
                <form>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="userFirstName" className="form-label">First Name</label>
                      <input type="text" className="form-control" id="userFirstName" required />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="userLastName" className="form-label">Last Name</label>
                      <input type="text" className="form-control" id="userLastName" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">Email or Phone</label>
                    <input type="email" className="form-control" id="userEmail" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="userPassword" required />
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="acceptTerms" required />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      By Signing Up You Accept The <a href="#" className="text-light">Terms Of Service</a> and <a href="#" className="text-light">Privacy Policy</a>.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
