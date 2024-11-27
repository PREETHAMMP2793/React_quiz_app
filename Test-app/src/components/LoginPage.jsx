import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";


const LoginPage = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === "admin" && adminPassword === "admin123") {
      setErrorMessage("");
      navigate("/admin");
    } else {
      setErrorMessage("Invalid admin credentials. Please try again.");
    }
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    // For simplicity, only validation without backend logic
    if (userEmail && userPassword) {
      setErrorMessage("");
      alert("User login successful (backend logic needed here)");
      // Navigate to user dashboard if needed
    } else {
      setErrorMessage("Please provide valid email and password.");
    }
  };

  return (
    <div>
    {/* <Navbar className='navbar-log'/> */}

    <div className=" text-white login" style={{ minHeight: "100vh" }}>
      <Navbar className='navbar-log'/>
      {/* Main Section */}
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="row w-100">
          {/* Admin Login */}
          <div className="col-lg-6 mb-3">
            <div className="card bg-secondary text-white shadow-lg">
              <div className="card-body">
                <h4 className="card-title text-center">Admin Login</h4>
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
                <h4 className="card-title text-center">User Login</h4>
                <form onSubmit={handleUserLogin}>
                  <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="userEmail"
                      placeholder="Enter your email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="userPassword"
                      placeholder="Enter your password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                  </div>
                  {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                  <button type="submit" className="btn btn-primary w-100">Sign In</button>
                </form>
                <div className="text-center mt-3">
                  <span> Don&apos;t have an account? </span>
                  <a href="/register" className="text-light text-decoration-underline">Register here</a>
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
