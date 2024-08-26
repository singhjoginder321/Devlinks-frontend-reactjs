import React, { useState } from "react";
import { toast } from "react-toastify";
import uploadImageIcon from "../assets/images/image-icon.png";
import apiService from "../services/apiService";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const name = `${firstName} ${lastName}`;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);

    try {
      await apiService.register(formData); // Use the apiService to make the API call
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error);

      // Extract error message from server response if available
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <div className="profile-upload-container">
        <div className="upload-label">
          <label htmlFor="profile-picture">Profile picture</label>
        </div>
        <div className="upload-area">
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          <label htmlFor="profile-picture" className="upload-button">
            <img
              src={uploadImageIcon}
              alt="Upload Icon"
              className="upload-icon"
            />
            <span>+ Upload Image</span>
          </label>
        </div>
        <div className="upload-info">
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="first-name">First name*</label>
        <input
          type="text"
          id="first-name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last-name">Last name*</label>
        <input
          type="text"
          id="last-name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password*</label>
        <input
          type="password"
          id="confirm-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="submit-button">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default Signup;
