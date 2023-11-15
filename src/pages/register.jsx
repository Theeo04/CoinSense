import React from "react";

function Register() {
  const validateAge = (event) => {
    const age = parseInt(event.target.value);
    if (age < 18) {
      event.target.setCustomValidity("Age must be higher than 18.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  return (
    <div className="gradient-bg">
      <div className="register-container">
        <h2 className="register-heading">Register</h2>
        <form>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-input"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-input"
              placeholder="Enter your age"
              required
              min="0"
              pattern="\d+"
              onChange={validateAge}
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
