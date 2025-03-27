import React from "react";
import { NavLink } from "react-router-dom";


function Footer() {
  return (
    <>
    <footer className="footer mt-5">
      <div className="footer-container">
        {/* Branding */}
        <div className="footer-section">
          <h2>ThumbPick</h2>
          <p>
            Engage with your audience through powerful thumbnail testing and optimization.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@thumbPick.com</p>
          <p>Phone: +91 6377469206</p>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ThumbPick. All Rights Reserved.
      </div>
    </footer>
    </>
  );
};

export default Footer;
