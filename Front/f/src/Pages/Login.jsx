import React from 'react'
import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../Store/auth';


function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
      });
      const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
      }
      let {Token,setToken}=useContext(AuthContext);
     
      const navigate = useNavigate();
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:5000/Signin', form)
          .then((res) => {   
            const {username,userId,profileImage,Admin}=res.data  
           setToken(res.data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('Token', res.data.token);
            localStorage.setItem('userId', userId);       
            localStorage.setItem('profileImage', profileImage); 
            localStorage.setItem('Admin', JSON.stringify(Admin));
            toast.success("Logged In Successfully!", {position: 'bottom-right'});
            // navigate('/Homepage',{state:{username, userId}});
            window.location.reload()
          })
          .catch((err) => {
            console.log(err);
            toast.error('Wrong Credentials')
          })
      }
  return (
    <>
<section id='login'>
  <div className="form-box">
    <div className="form-value">
      <form onSubmit={handleSubmit}>
        <h2 id='l'>Login</h2>
        <div className="inputbox">
          <ion-icon name="mail-outline" />
          <input type="email" name="email" value={form.email} placeholder="" autoComplete='off' onChange={handleForm} required/>
          <label>Email</label>
        </div>
        <div className="inputbox">
          <ion-icon name="lock-closed-outline" />
          <input type="password" name='password' value={form.password} placeholder="" onChange={handleForm}  required />
          <label>Password</label>
        </div>
        <div className="forget">
          <label>
           <NavLink to='#'>Forgot password?</NavLink>
          </label>
        </div>
        <button id='sbtn' type='submit'>Log in</button>
        <div className="register">
          <p>Don't have a account ? <NavLink to='/Signup'>Register</NavLink></p>
        </div>
      </form>
    </div>
  </div>
</section>

    </>
  )
}

export default Login