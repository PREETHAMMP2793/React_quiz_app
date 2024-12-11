/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useGlobalDispatch } from "../contexts/GlobalStateProvider";

import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import '../styles/register.css';

const RegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    contact: "",
    registrationDate: "",
    source: "",
    collegeName: "",
    employeeId: "",
    qualification: "",
    stream: "",
    yearOfPassing: "",
    jobApplied: "",
    payment: "",
    paymentConfirmed: false,
  });

  const dispatch = useGlobalDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false); // Track successful submission
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, registrationDate: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.email.match(/\S+@\S+\.\S+/)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!formData.contact.match(/^\d{10}$/)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
    }
    
    if (!formData.paymentConfirmed) {
      alert("Please confirm that the payment is done.");
      return;
    }

    dispatch({ type: "ADD_CANDIDATE", payload: formData });
    // Save user data to localStorage
  localStorage.setItem('userEmail', formData.email);
  localStorage.setItem('userContact', formData.contact);

    // On successful registration, show the success modal
    onRegister(formData);
    setIsSubmitted(true);
    setShowModal(true); // Show the modal
    
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="bg-light register-bg nunito-nun">
      <Navbar className="navbar-reg" />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="card-reg shadow-lg border-0"
          style={{
            width: "80%",
            maxWidth: "1000px",
            borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <div className="card-header text-white py-3">
            <h2 className="mb-0">Registration Form</h2>
          </div>
          <div className="card-body px-4 py-2">
            {isSubmitted ? (
              // Show this after successful submission
              <div className="text-center">
                <h3>User successfully registered!</h3>
                <h3>Your Phone number will be the password for Log-in</h3>
                <p>You can now log in.</p>
                <button
                  className="btn btn-success"
                  onClick={handleModalClose}
                  style={{ borderRadius: "50px", padding: "10px" }}
                >
                  Go to Login
                </button>
              </div>
            ) : (
              // Form rendering
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    {/* Candidate Name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        <i className="bi bi-person-fill me-2 text-dark"></i> Candidate Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Gender */}
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">
                        <i className="bi bi-gender-ambiguous me-2 text-dark"></i> Gender
                      </label><br/>
                      <label className="pe-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        required
                      />{' '}
                      Male
                    </label>
                    <label className="pe-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                      />{' '}
                      Female
                    </label>
                    <label className="pe-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        onChange={handleChange}
                      />{' '}
                      Other
                    </label>
                    </div>

                    {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope-fill me-2 text-dark"></i> Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Registration Date */}
                  <div className="mb-3">
                    <label htmlFor="registrationDate" className="form-label">
                      <i className="bi bi-calendar-event-fill me-2 text-dark"></i> Registration
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="registrationDate"
                      name="registrationDate"
                      value={formData.registrationDate}
                      readOnly
                    />
                  </div>

                  {/* Qualification */}
                  <div className="mb-3">
                    <label htmlFor="qualification" className="form-label">
                      <i className="bi bi-capslock me-2 text-dark"></i> Qualification
                    </label>
                    <select
                      id="qualification"
                      name="qualification"
                      className="form-select"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Qualification</option>
                      <option value="BE">BE</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="MBA">MBA</option>
                    </select>
                  </div>

                  {/* Job Applied For */}
                  <div className="mb-3">
                    <label htmlFor="jobApplied" className="form-label">
                      <i className="bi bi-briefcase-fill me-2 text-dark"></i> Job Applied For
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="jobApplied"
                      name="jobApplied"
                      value={formData.jobApplied}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                  {/* Contact Number */}
                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">
                      <i className="bi bi-telephone-fill me-2 text-dark"></i> Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setFormData((prev) => ({ ...prev, contact: value }));
                        }
                      }}
                      placeholder="Enter your 10-digit phone number"
                      pattern="\d{10}"
                      maxLength="10"
                      title="Please enter exactly 10 digits."
                      required
                    />
                  </div>

                  {/* Source */}
                  <div className="mb-3">
                    <label htmlFor="source" className="form-label">
                      <i className="bi bi-geo-alt-fill me-2 text-dark"></i> Source
                    </label>
                    <select
                      id="source"
                      name="source"
                      className="form-select"
                      value={formData.source}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Source</option>
                      <option value="College">College</option>
                      <option value="Walk-in">Walk-in</option>
                      <option value="Reference">Reference</option>
                    </select>
                  </div>

                  {formData.source === "College" && (
                    <div className="mb-3">
                      <label htmlFor="collegeName" className="form-label">
                        <i className="bi bi-building me-2 text-dark"></i> College Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="collegeName"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  {formData.source === "Reference" && (
                    <div className="mb-3">
                      <label htmlFor="employeeId" className="form-label">
                        <i className="bi bi-person-badge me-2 text-dark"></i> Employee ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  {/* Stream */}
                  <div className="mb-3">
                    <label htmlFor="stream" className="form-label">
                      <i className="bi bi-bookmark-fill me-2 text-dark"></i> Stream
                    </label>
                    <select
                      id="stream"
                      name="stream"
                      className="form-select"
                      value={formData.stream}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Stream</option>
                      <option value="ISE">ISE</option>
                      <option value="CSE">CSE</option>
                      <option value="ME">ME</option>
                      <option value="CV">CV</option>
                      <option value="AIDS">AIDS</option>
                      <option value="EEE">EEE</option>
                      <option value="ECE">ECE</option>
                    </select>
                  </div>

                  {/* Year of Passing */}
                  <div className="mb-3">
                    <label htmlFor="yearOfPassing" className="form-label">
                      <i className="bi bi-calendar-check-fill me-2 text-dark"></i> Year of Passing
                    </label>
                    <select
                      id="yearOfPassing"
                      name="yearOfPassing"
                      className="form-select"
                      value={formData.yearOfPassing}
                      onChange={handleChange}
                      required
                    >
                      {[2023, 2024, 2025].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment */}
                  <div className="mb-3">
                    <label htmlFor="payment" className="form-label">
                      <i className="bi bi-credit-card-fill me-2 text-dark"></i> Payment Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="payment"
                      name="payment"
                      value={formData.payment}
                      onChange={handleChange}
                      required
                      min="100"
                      placeholder="Enter payment amount"
                    />
                  </div>

                  {/* Payment Confirmation */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="paymentConfirmed"
                      name="paymentConfirmed"
                      checked={formData.paymentConfirmed}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="paymentConfirmed">
                      Confirm Payment Done
                    </label>
                  </div>
                </div>
                  
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-50"
                    style={{ borderRadius: "50px", padding: "10px" }}
                  >
                    Submit
                  </button>
                </div>

                {/* Already Registered? Login Link */}
                <div className="mt-3 text-center">
                  <p>
                    Already registered?{" "}
                    <Link to="/" className="text-decoration-none">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            )}

            {/* Success Modal */}
            {/* {showModal && (
              <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Registration Successful</h5>
                      <button type="button" className="close" onClick={handleModalClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>You have successfully registered! You can now log in.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" onClick={handleModalClose}>
                        Go to Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
