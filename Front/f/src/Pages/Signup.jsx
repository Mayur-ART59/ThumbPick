import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


function Signup() {
    const[form,setForm]=useState({
        name:'',
        email:'',
        password:'',
    })
    const navigate=useNavigate();
    const handleForm=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    } 
    const handleSubmit=(e)=>{
      e.preventDefault();
      
      axios.post('https://thumbpick.onrender.com/Signup',form)
      .then((res)=>{
        res.data
        toast.success('SignUp Successfull')
        navigate('/Login');
      })
      .catch((err)=>{
        if (err.response && err.response.status === 400) {
          toast.error("Email Already Exists");
        }
        console.log(err);
        res.stauts(500).json({message:'Server Error'})
      })
    }



  return (
    <>
    
   <section id='login'>
  <div className="form-box">
    <div className="form-value">
      <form onSubmit={handleSubmit}>
        <h2 id='l'>Sign Up</h2>
        <div className="inputbox">
        <ion-icon name="person-outline"></ion-icon>
          <input type="text" name="name" value={form.name} placeholder="" autoComplete='off' onChange={handleForm} required/>
          <label>Name</label>
        </div>
        <div className="inputbox">
          <ion-icon name="mail-outline" />
          <input type="email" name="email" value={form.email}  placeholder="" autoComplete='new-email' onChange={handleForm} required/>
          <label>Email</label>
        </div>
        <div className="inputbox">
          <ion-icon name="lock-closed-outline" />
          <input type="password" name='password' value={form.password} placeholder="" onChange={handleForm} required />
          <label>Password</label>
        </div>
      
        <button id='sbtn' type='submit'>Sign Up</button>
        <div className="register">
          <p>Already have an account ?   <NavLink to='/Login'>Sign In</NavLink></p>
        </div>
      </form>
    </div>
  </div>
</section>

    </>
  ) 
}
export default Signup;