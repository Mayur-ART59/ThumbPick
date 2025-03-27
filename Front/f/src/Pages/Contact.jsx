import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../Components/Footer";

function Contact() {
  return (
    <>
      <Container className="my-5 contact-container">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold mb-3">
              Contact <span className="highlight">ThumbPick</span>
            </h2>
            <p className="lead text-muted">
              We'd love to hear from you! Reach out with questions, feedback, or collaborations.
            </p>
          </Col>
        </Row>

        <Row className="contact-content text-center text-md-start">
          <Col md={6} className="bg-light p-4 rounded">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Subject" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Type your message..." />
              </Form.Group>

              <div className="text-center text-md-start">
                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={6} className="mb-4">
            <h5 className="mb-3">Get in Touch</h5>
            <p className="text-muted mb-2">
              <FaEnvelope className="me-2" />
              <strong>Email:</strong> support@thumbpick.com
            </p>
            <p className="text-muted mb-2">
              <FaPhoneAlt className="me-2" />
              <strong>Phone:</strong> +91 6377469206
            </p>
            <p className="text-muted mb-4">
              <FaMapMarkerAlt className="me-2" />
              <strong>Location:</strong> Chandigarh, India
            </p>

            <div className="d-flex justify-content-center justify-content-md-start gap-3 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-muted">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>

            <div
              className="map-responsive"
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              <iframe
                title="Chandigarh Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.015889165041!2d76.77941707539367!3d30.733314088659267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed4035335cdb%3A0xe3a8cc328818c3f0!2sChandigarh!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Contact;
