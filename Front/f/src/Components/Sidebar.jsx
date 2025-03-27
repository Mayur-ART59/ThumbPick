import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='position-absolute ps-4 bg-transparent border-0' onClick={handleShow}>
        <img src='https://cdn-icons-png.flaticon.com/128/7710/7710488.png' alt='menu' style={{ maxHeight: '30px', maxWidth: '30px' }} />
      </Button>

      <Offcanvas style={{ maxWidth: '300px' }} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='ps-5 ms-4'>ThumbPick</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="nav">
            <nav>
              <ul>
                <li>
                  <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Myuploads" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    My Uploads
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Upload" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    Upload Thumbnail
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/UpdateUser" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    Settings
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;