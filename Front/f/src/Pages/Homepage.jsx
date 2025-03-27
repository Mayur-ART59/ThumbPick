import { useState, useEffect } from 'react';
import { Container, Nav, Row, Col, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Footer from '../Components/Footer';
import Allthumbs from '../Components/Allthumbs';




function Homepage() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || '');
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className="main-content bg-light pb-3">

        <section className="hero-section py-5">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="text-center text-md-start">
                <h1 className="fw-bold text-white">Find the Best Thumbnail</h1>
                <p className="lead text-white">
                  Upload multiple thumbnails, gather likes, and choose the most engaging one!
                </p>
                {!userId && <NavLink to='/Signup'><Button variant="light" size="lg">Get Started</Button></NavLink>}
                {userId && ''}
              </Col>
              <Col md={6} className="text-center">
                <img src="/thumbnail.jpg" alt="Thumbnail Showcase" className="img-fluid rounded shadow" />
              </Col>
            </Row>
          </Container>
        </section>

        {!userId && <Container className="text-center my-5">
          <h2 className="section-title">Why Use Our Platform?</h2>
          <div className="section-divider"></div>
          <Row className="mt-4">
            <Col md={4}>
              <div className="sub-section">
                <h4>Easy Upload</h4>
                <p>Quickly upload 4-5 thumbnails for comparison.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="sub-section">
                <h4>Community Feedback</h4>
                <p>Gather real user interactions to make informed decisions.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="sub-section">
                <h4>Optimize Engagement</h4>
                <p>Choose the best-performing thumbnail for your content.</p>
              </div>
            </Col>
          </Row>
        </Container>
        }
        {userId && ''}
        <Allthumbs limit={6} />
        <div className="text-center mt-3">
          <NavLink to="/Allthumbs">
            <Button variant="outline-primary">See More Thumbnails</Button>
          </NavLink>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Homepage;
