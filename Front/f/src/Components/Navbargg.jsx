import React, { useState, useEffect, useContext } from "react";
import { Container, Nav, Navbar, Dropdown, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Store/auth";
import { isAuthenticated, IsAdmin } from '../Uti/Auth';

function Navbargg() {
  const navigate = useNavigate();
  const { Token, setToken } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [loggedOut, setLoggedOut] = useState(false);
  const [expanded, setExpanded] = useState(false); // 🔥 added

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUsername("");
    setProfileImage("");
    setAdmin("");
    setLoggedOut(true);
    navigate("/login");
    setExpanded(false); // 🔥 close navbar on logout
  };

  useEffect(() => {
    const storedAdmin = localStorage.getItem("Admin");
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        setAdmin(parsedAdmin === true); // ensures it's strictly boolean true
      } catch (err) {
        console.error("Failed to parse Admin flag:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (loggedOut) {
      setLoggedOut(false);
    }
  }, [loggedOut]);

  return (
    <Navbar expand="lg" sticky="top" expanded={expanded} onToggle={() => setExpanded(!expanded)} className="frosted-navbar pe-lg-4">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/Homepage" className="fw-bold fs-4 text-primary" onClick={() => setExpanded(false)}>
          ThumbPick
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/Homepage" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/Allthumbs" onClick={() => setExpanded(false)}>Gallery</Nav.Link>
            {username && <NavDropdown title="My Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/Dashboard" onClick={() => setExpanded(false)}>Dashboard</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Myuploads" onClick={() => setExpanded(false)}>My Uploads</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Upload" onClick={() => setExpanded(false)}>Upload</NavDropdown.Item>
            </NavDropdown>}
            <Nav.Link as={NavLink} to="/About" onClick={() => setExpanded(false)}>About</Nav.Link>
            <Nav.Link as={NavLink} to="/Contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
            <Nav.Link as={NavLink} to="/Services" onClick={() => setExpanded(false)}>Services</Nav.Link>
            {admin && <Nav.Link as={NavLink} to="/Admin/ManageUsers" onClick={() => setExpanded(false)}>Admin Panel</Nav.Link>}
          </Nav>

          <div className="d-flex align-items-center">
            {username ? (
              <Dropdown>
                <Dropdown.Toggle className="user-dropdown px-3">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: 30, height: 30, objectFit: "cover", marginRight: 8 }}
                    />
                  ) : (
                    <i className="bi bi-person-circle fs-5" />
                  )}&nbsp;
                  {username}
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow auth-dropdown-menu">
                  <Dropdown.Item as={NavLink} to="/UpdateUser" onClick={() => setExpanded(false)}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle className="auth-dropdown px-3 py-2 ">
                  <i className="bi bi-person-circle fs-5"></i>&nbsp;
                  <span className="fw-semibold">Sign In/Up</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow auth-dropdown-menu rounded-4 mt-2 p-2">
                  <Dropdown.Item as={NavLink} to="/login" className="rounded-3 px-3 py-2" onClick={() => setExpanded(false)}>Log In</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/signup" className="rounded-3 px-3 py-2" onClick={() => setExpanded(false)}>Sign Up</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbargg;
