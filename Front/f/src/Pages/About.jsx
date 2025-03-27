import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUpload, FaThumbsUp, FaChartLine } from "react-icons/fa";
import Footer from "../Components/Footer";


function About() {
  return (
    <>
      <Container className="my-5 about-container">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold mb-3">About <span className="highlight">ThumbPick</span></h2>
            <p className="lead text-muted">
              ThumbPick is a powerful platform for YouTubers, content creators & marketers to compare thumbnails and find the best performer through real user engagement.
            </p>
          </Col>
        </Row>

        <Row className="text-center about-features">
          <Col md={4} className="mb-4">
            <div className="feature-box">
              <FaUpload className="feature-icon" />
              <h4>Upload Thumbnails</h4>
              <p>Upload 4-5 thumbnails and let your audience vote on what grabs attention the most.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-box">
              <FaThumbsUp className="feature-icon" />
              <h4>Gather Likes</h4>
              <p>See which thumbnails people like most in real-time, with instant visual feedback.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-box">
              <FaChartLine className="feature-icon" />
              <h4>Optimize Engagement</h4>
              <p>Pick the thumbnail with the best data so you can boost views, clicks, and reach like a pro.</p>
            </div>
          </Col>
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <NavLink to="/signup">
              <Button className="cta-btn" size="lg">🚀 Get Started</Button>
            </NavLink>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default About;
