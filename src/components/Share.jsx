import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import "../style/share.css";
import ShareNavbar from "./ShareNavbar";

const Share = () => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Fetch userId first
    const fetchUserId = async () => {
      try {
        const response = await apiService.getCurrentUser();
        const fetchedUserId = response.data._id; // Assuming the userId is stored in _id
        setUserId(fetchedUserId);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch profile data
      const fetchProfile = async () => {
        try {
          const response = await apiService.getCurrentUser();
          setProfile(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      // Fetch links data
      const fetchLinks = async () => {
        try {
          const response = await apiService.getLinksByUserId(userId);
          setLinks(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching links:", error);
        }
      };

      fetchProfile();
      fetchLinks();
    }
  }, [userId]);

  const handleShareLinkClick = async (event) => {
    event.preventDefault();
    const pageUrl = window.location.href;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(pageUrl);
        alert("Page URL has been copied to the clipboard!");
      } catch (err) {
        console.error("Could not copy text: ", err);
      }
    }
  };

  return (
    <>
      <ShareNavbar />
      <div className="left">
        <div className="smartphone">
          <div className="profile-container" id="profile-details">
            {profile && (
              <>
                <div className="profile-details-2">
                  <img
                    src={profile.profilePicture || ""}
                    alt="Profile"
                    id="profile-picture"
                  />
                  <span className="name" id="profile-name">
                    {profile.name} {profile.lastName}
                  </span>
                  <span className="email" id="profile-email">
                    {profile.email}
                  </span>
                </div>
                <div>
                  <ul className="links" id="links-list">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.link}
                          className={link.platform}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <button onClick={handleShareLinkClick} className="share-button">
        Share This Page
      </button>
    </>
  );
};

export default Share;
