import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";

const STEPS = ["Personal", "Contact", "Academic", "Review"];

function StudentApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", dob: "", gender: "", address: "",
    email: "", phone: "", guardianName: "", guardianPhone: "",
    program: "", institution: "", grade: "", activities: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    if (!formData.agree) {
      alert("Please accept the declaration to submit.");
      return;
    }
    setSubmitted(true);
  };

  // ── Submitted screen ──
  if (submitted) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)" }}>
        <div className="text-center text-white px-4">
          <div className="display-1 mb-3">🎓</div>
          <h2 className="fw-bold mb-2">Application Submitted!</h2>
          <p className="text-white-50 mb-4">
            Thank you, <strong className="text-white">{formData.firstName}</strong>!
            We'll reach out at <strong className="text-white">{formData.email}</strong>.
          </p>
          <button className="btn btn-light btn-lg px-5 rounded-pill fw-semibold"
            onClick={() => { setSubmitted(false); setStep(0); }}>
            Start New Application
          </button>
        </div>
      </div>
    );
  }

  // ── Progress Bar ──
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-vh-100 py-5"
      style={{ background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)" }}>
      <div className="container" style={{ maxWidth: 680 }}>

        {/* Title */}
        <div className="text-center text-white mb-4">
          <h2 className="fw-bold mb-1">🎓 Student Application</h2>
          <p className="text-white-50 mb-0">Academic Year 2025 – 26</p>
        </div>

        {/* Step Pills */}
        <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
          {STEPS.map((label, i) => (
            <span key={i}
              className={`badge rounded-pill px-3 py-2 fs-6 ${
                i === step
                  ? "bg-warning text-dark"
                  : i < step
                  ? "bg-success text-white"
                  : "bg-secondary text-white"
              }`}>
              {i < step ? "✓ " : `${i + 1}. `}{label}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="progress mb-4 rounded-pill" style={{ height: 6 }}>
          <div className="progress-bar bg-warning" style={{ width: `${progress}%`, transition: "width .4s" }} />
        </div>

        {/* Card */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

          {/* Card header */}
          <div className="card-header text-white fw-semibold fs-5 py-3 px-4"
            style={{ background: "linear-gradient(90deg,#1a1a2e,#16213e)" }}>
            Step {step + 1} — {STEPS[step]} Information
          </div>

          <div className="card-body p-4">

            {/* ── STEP 0: Personal ── */}
            {step === 0 && (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control rounded-3"
                    name="firstName" value={formData.firstName}
                    onChange={handleChange} placeholder="e.g. Ali" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control rounded-3"
                    name="lastName" value={formData.lastName}
                    onChange={handleChange} placeholder="e.g. Khan" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Date of Birth <span className="text-danger">*</span></label>
                  <input type="date" className="form-control rounded-3"
                    name="dob" value={formData.dob} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Gender <span className="text-danger">*</span></label>
                  <select className="form-select rounded-3"
                    name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Permanent Address <span className="text-danger">*</span></label>
                  <textarea className="form-control rounded-3" rows={2}
                    name="address" value={formData.address}
                    onChange={handleChange} placeholder="House no., Street, City, Country" />
                </div>
              </div>
            )}

            {/* ── STEP 1: Contact ── */}
            {step === 1 && (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email Address <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text rounded-start-3">📧</span>
                    <input type="email" className="form-control rounded-end-3"
                      name="email" value={formData.email}
                      onChange={handleChange} placeholder="student@example.com" />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone Number <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text rounded-start-3">📞</span>
                    <input type="tel" className="form-control rounded-end-3"
                      name="phone" value={formData.phone}
                      onChange={handleChange} placeholder="+92 300 0000000" />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Guardian's Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control rounded-3"
                    name="guardianName" value={formData.guardianName}
                    onChange={handleChange} placeholder="Father / Mother / Guardian" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Guardian's Phone <span className="text-danger">*</span></label>
                  <input type="tel" className="form-control rounded-3"
                    name="guardianPhone" value={formData.guardianPhone}
                    onChange={handleChange} placeholder="+92 300 0000000" />
                </div>
              </div>
            )}

            {/* ── STEP 2: Academic ── */}
            {step === 2 && (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Program <span className="text-danger">*</span></label>
                  <select className="form-select rounded-3"
                    name="program" value={formData.program} onChange={handleChange}>
                    <option value="">Choose program</option>
                    <optgroup label="Undergraduate">
                      <option>BS Computer Science</option>
                      <option>BS Software Engineering</option>
                      <option>BBA Business Administration</option>
                      <option>BS Mathematics</option>
                    </optgroup>
                    <optgroup label="Graduate">
                      <option>MS Computer Science</option>
                      <option>MS Data Science</option>
                      <option>MBA</option>
                    </optgroup>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Institution <span className="text-danger">*</span></label>
                  <input type="text" className="form-control rounded-3"
                    name="institution" value={formData.institution}
                    onChange={handleChange} placeholder="School / College name" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">GPA / Percentage <span className="text-danger">*</span></label>
                  <input type="text" className="form-control rounded-3"
                    name="grade" value={formData.grade}
                    onChange={handleChange} placeholder="e.g. 3.8 or 85%" />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Extracurricular Activities</label>
                  <textarea className="form-control rounded-3" rows={2}
                    name="activities" value={formData.activities}
                    onChange={handleChange} placeholder="Clubs, sports, awards, etc." />
                </div>
              </div>
            )}

            {/* ── STEP 3: Review ── */}
            {step === 3 && (
              <div>
                <p className="text-muted small mb-3">Please review your information before submitting.</p>

                {/* Summary Table */}
                {[
                  ["Full Name", `${formData.firstName} ${formData.lastName}`],
                  ["Date of Birth", formData.dob],
                  ["Gender", formData.gender],
                  ["Address", formData.address],
                  ["Email", formData.email],
                  ["Phone", formData.phone],
                  ["Guardian", `${formData.guardianName} (${formData.guardianPhone})`],
                  ["Program", formData.program],
                  ["Institution", formData.institution],
                  ["GPA / %", formData.grade],
                ].map(([label, val]) => (
                  <div key={label}
                    className="d-flex justify-content-between align-items-start py-2"
                    style={{ borderBottom: "1px dashed #dee2e6" }}>
                    <span className="text-muted small fw-semibold" style={{ minWidth: 140 }}>{label}</span>
                    <span className="text-end small">{val || <span className="text-danger">Not filled</span>}</span>
                  </div>
                ))}

                {/* Declaration */}
                <div className="form-check mt-4 p-3 rounded-3"
                  style={{ background: "#fff3cd" }}>
                  <input className="form-check-input" type="checkbox"
                    id="agree" name="agree"
                    checked={formData.agree} onChange={handleChange} />
                  <label className="form-check-label fw-semibold small" htmlFor="agree">
                    I declare that all information is true and accurate.{" "}
                    <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Card Footer – Navigation Buttons */}
          <div className="card-footer bg-light d-flex justify-content-between align-items-center px-4 py-3">
            <button
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={back}
              disabled={step === 0}>
              ← Back
            </button>

            <span className="text-muted small">{step + 1} / {STEPS.length}</span>

            {step < STEPS.length - 1 ? (
              <button
                className="btn btn-warning rounded-pill px-4 fw-semibold text-dark"
                onClick={next}>
                Next →
              </button>
            ) : (
              <button
                className="btn btn-success rounded-pill px-4 fw-semibold"
                onClick={handleSubmit}>
                ✅ Submit
              </button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-white-50 small mt-4">
          All fields marked <strong className="text-white">*</strong> are required.
        </p>

      </div>
    </div>
  );
}

export default StudentApplicationForm;