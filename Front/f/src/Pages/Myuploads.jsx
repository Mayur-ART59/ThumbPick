
import Sidebar from '../Components/Sidebar';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Cards from '../Components/Cards';
function Myuploads() {

  return (
    <> 
    <div className="dheader">
    <Sidebar />
    <div className='d-flex flex-column align-item-center'>
    <h1 className='text-center'style={{}}>My Uploads</h1>
    </div>
  </div>
 <Cards/>
  </>
  )
}

export default Myuploads