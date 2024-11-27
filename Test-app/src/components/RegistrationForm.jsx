import React, { useState, useEffect } from 'react';

const RegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    contact: '',
    registrationDate: '',
    source: '',
    collegeName: '',
    employeeId: '',
    qualification: '',
    stream: '',
    yearOfPassing: '',
    jobApplied: '',
    payment: '',
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, registrationDate: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    if (!formData.email.match(/\S+@\S+\.\S+/)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!formData.contact.match(/^\d{10}$/)) {
      alert('Please enter a valid 10-digit contact number.');
      return;
    }
    onRegister(formData);
  };

  return (
    <div className='d-flex justify-content-center align-items-center '>
      <div className="card shadow  col-sm-3 col-lg-12" style={{ width: '140%', maxWidth: '40rem' }}>
        <div className="card-header bg-primary text-white">
          <h3 className="card-title">Registration Form</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Candidate Name */}
            <div className="mb-3 row">
              <label htmlFor="name" className="col-sm-3 col-form-label col-lg-4">Candidate Name:</label>
              <div className="col-sm-9 col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div className="mb-3 row">
              <label htmlFor="gender" className="col-sm-3 col-form-label col-lg-4">Gender:</label>
              <div className="col-sm-9 col-lg-5">
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-3 col-form-label col-lg-4">Email:</label>
              <div className="col-sm-9 col-lg-5">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Contact */}
            <div className="mb-3 row">
              <label htmlFor="contact" className="col-sm-3 col-form-label col-lg-4">Contact Number:</label>
              <div className="col-sm-9 col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  maxLength="10"
                />
              </div>
            </div>

            {/* Registration Date */}
            <div className="mb-3 row">
              <label htmlFor="registrationDate" className="col-sm-3 col-form-label col-lg-4">Registration Date:</label>
              <div className="col-sm-9 col-lg-5">
                <input
                  type="date"
                  className="form-control"
                  id="registrationDate"
                  name="registrationDate"
                  value={formData.registrationDate}
                  readOnly
                />
              </div>
            </div>

            {/* Source */}
            <div className="mb-3 row">
              <label htmlFor="source" className="col-sm-3 col-form-label col-lg-4">Source:</label>
              <div className="col-sm-9 col-lg-5">
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
            </div>

            {formData.source === 'College' && (
              <div className="mb-3 row">
                <label htmlFor="collegeName" className="col-sm-3 col-form-label col-lg-4">College Name:</label>
                <div className="col-sm-9 col-lg-5">
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
              </div>
            )}

            {formData.source === 'Reference' && (
              <div className="mb-3 row">
                <label htmlFor="employeeId" className="col-sm-3 col-form-label col-lg-4">Employee ID:</label>
                <div className="col-sm-9 col-lg-5">
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
              </div>
            )}

            {/* Qualification */}
            <div className="mb-3 row">
              <label htmlFor="qualification" className="col-sm-3 col-form-label col-lg-4">Qualification:</label>
              <div className="col-sm-9 col-lg-5">
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
            </div>

            {/* Stream */}
            <div className="mb-3 row">
              <label htmlFor="stream" className="col-sm-3 col-form-label col-lg-4">Stream:</label>
              <div className="col-sm-9 col-lg-5">
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
            </div>

            {/* Year of Passing */}
            <div className="mb-3 row">
              <label htmlFor="yearOfPassing" className="col-sm-3 col-form-label col-lg-4">Year of Passing:</label>
              <div className="col-sm-9 col-lg-5">
                <select
                  id="yearOfPassing"
                  name="yearOfPassing"
                  className="form-select"
                  value={formData.yearOfPassing}
                  onChange={handleChange}
                  required
                >
                  {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Applied For */}
            <div className="mb-3 row">
              <label htmlFor="jobApplied" className="col-sm-3 col-form-label col-lg-4">Job Applied For:</label>
              <div className="col-sm-9 col-lg-5">
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

            {/* Payment */}
            <div className="mb-3 row">
              <label htmlFor="payment" className="col-sm-3 col-form-label col-lg-4">Payment:</label>
              <div className="col-sm-9 col-lg-7">
                <input
                  type="number"
                  className="form-control"
                  id="payment"
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
