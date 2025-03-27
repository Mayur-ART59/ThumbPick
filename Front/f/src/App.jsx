import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './Store/auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import "aos/dist/aos.css";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Homepage from './Pages/Homepage';
import Cards from './Components/Cards';
import { ToastContainer } from 'react-toastify';
import Footer from './Components/Footer';
import Upload from './Pages/Upload';
import Myuploads from './Pages/Myuploads';
import Setting from './Pages/Setting';
import UpdateUser  from './Pages/UpdateUser';
import About from './Pages/About';
import Navbargg from './Components/Navbargg';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import Allthumbs from './Components/Allthumbs';
import Manageusers from './Admin/Manageusers';
import { isAuthenticated, IsAdmin } from './Uti/Auth';
function App() {
  let {Token}=useContext(AuthContext);
  console.log(Token);
  return (
    <>
    <Navbargg/>
     <Routes>
     <Route path='/Admin/ManageUsers' element={Token ? <Manageusers/> : <Navigate to={"/Login"}/>}></Route>
      <Route path='/' element={<Homepage></Homepage>}></Route>
      <Route path='/Signup' element={Token?<Homepage/>:<Signup/>}></Route>
      <Route path='/Login' element={Token?<Homepage/>:<Login/>}></Route>
      <Route path='/Dashboard' element={Token?<Dashboard/>:<Navigate to={'/Login'}/>}/>
      <Route path='/Homepage' element={<Homepage></Homepage>}></Route>
      <Route path='/Cards' element={Token?<Cards/>:<Navigate to={'/Login'}/>}/>
      <Route path='/About' element={<About></About>}/>
      <Route path='/Navbar' element={<Navbargg></Navbargg>}/>
      <Route path='/Footer' element={<Footer></Footer>}></Route>
      <Route path='/Upload' element={Token?<Upload/>:<Navigate to={'/Login'}/>}/>
      <Route path='/Myuploads' element={Token?<Myuploads/>:<Navigate to={'/Login'}/>}/>
      <Route path='/Setting' element={Token?<Setting/>:<Navigate to={'/Login'}/>}/>
      <Route path="/UpdateUser" element={Token?<UpdateUser />:<Login/>} />
      <Route path='/Contact' element={<Contact></Contact>}></Route>
      <Route path='/Services' element={<Services></Services>}></Route>
      <Route path='/Allthumbs' element={<Allthumbs></Allthumbs>}></Route>

     </Routes>
     <ToastContainer autoClose={3000}/>
    </>
  )
}
export default App;
