import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUpload, FaThumbsUp, FaChartLine, FaGlobe, FaSearch } from "react-icons/fa";
import Footer from "../Components/Footer";

function Services() {
  return (
    <>
      <Container className="my-5 services-container">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold mb-3">Our <span className="highlight">Services</span></h2>
            <p className="lead text-muted">
              At ThumbPick, we offer intuitive tools that help content creators choose the best thumbnail using real user interaction and engagement data.
            </p>
          </Col>
        </Row>

        <Row className="text-center services-features">
          <Col md={4} className="mb-4">
            <div className="feature-box">
              <FaUpload className="feature-icon" />
              <h4>Upload Thumbnails</h4>
              <p>Submit 4-5 thumbnail options and start testing instantly. Simple, quick, and effective.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-box">
              <FaThumbsUp className="feature-icon" />
              <h4>Real-Time Likes</h4>
              <p>Track user engagement in real-time through a like-based system. No votes—just pure preference.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-box">
              <FaChartLine className="feature-icon" />
              <h4>Performance Insights</h4>
              <p>Discover which thumbnails outperform the rest with detailed analytics and engagement metrics.</p>
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <div className="feature-box">
              <FaGlobe className="feature-icon" />
              <h4>Use Anywhere</h4>
              <p>Browser-based and mobile-friendly. Access your thumbnail tests from anywhere, anytime.</p>
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <div className="feature-box">
              <FaSearch className="feature-icon" />
              <h4>Smart Decision-Making</h4>
              <p>Leverage real user behavior to pick the thumbnail most likely to boost views and engagement.</p>
            </div>
          </Col>
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <NavLink to="/signup">
              <Button className="cta-btn" size="lg">🚀 Try It Out Now</Button>
            </NavLink>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Services;
