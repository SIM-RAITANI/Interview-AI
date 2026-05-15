// import React,{useState} from 'react'
// import { useNavigate, Link } from 'react-router'
// import { useAuth } from '../hooks/useAuth'

// const Register = () => {

//     const navigate = useNavigate()
//     const [ username, setUsername ] = useState("")
//     const [ email, setEmail ] = useState("")
//     const [ password, setPassword ] = useState("")

//     const {loading,handleRegister} = useAuth()

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         await handleRegister({username,email,password})
//         navigate("/")
//     }

//     if(loading){
//         return (<main><h1>Loading.......</h1></main>)
//     }

//     return (
//         <main>
//             <div className="form-container">
//                 <h1>Register</h1>

//                 <form onSubmit={handleSubmit}>

//                     <div className="input-group">
//                         <label htmlFor="username">Username</label>
//                         <input
//                             onChange={(e) => { setUsername(e.target.value) }}
//                             type="text" id="username" name='username' placeholder='Enter username' />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             onChange={(e) => { setEmail(e.target.value) }}
//                             type="email" id="email" name='email' placeholder='Enter email address' />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             onChange={(e) => { setPassword(e.target.value) }}
//                             type="password" id="password" name='password' placeholder='Enter password' />
//                     </div>

//                     <button className='button primary-button' >Register</button>

//                 </form>

//                 <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
//             </div>
//         </main>
//     )
// }

// export default Register

import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import "../auth.form.scss";

// Inline SVG icons (no extra dependency)
const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="11" width="14" height="11" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
        await handleRegister({ username, email, password });
        toast.success("Registration successful! Redirecting...");
        navigate("/");
    } catch (error) {
        toast.error(error.message || "Registration failed. Please try again.");
    }
    
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.......</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <p className="form-eyebrow">Create account</p>
        <h1>
          Get <span>Started</span>
        </h1>
        <div className="form-divider" />

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrap">
              <span className="input-icon">
                <UserIcon />
              </span>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button className="button primary-button">Register</button>
        </form>

        <p className="form-footer">
          Already have an account?&nbsp;<Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
